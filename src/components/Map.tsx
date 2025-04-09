
import { useState, useCallback, useMemo, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Map styles for light and dark mode
const lightMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{"visibility": "off"}]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#616161"}]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#f5f5f5"}]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "poi",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "transit",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#e9e9e9"}]
  }
];

const darkMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [{"color": "#212121"}]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{"visibility": "off"}]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{"color": "#757575"}]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{"color": "#212121"}]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "poi",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"color": "#424242"}]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "transit",
    "stylers": [{"visibility": "off"}]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#000000"}]
  }
];

interface Location {
  lat: number;
  lng: number;
}

interface Vendor {
  id: string;
  name: string;
  location: Location;
}

interface MapProps {
  className?: string;
  height?: string;
  center?: Location;
  zoom?: number;
  vendors?: Vendor[];
  onVendorClick?: (vendorId: string) => void;
}

export function Map({
  className,
  height = "240px",
  center = { lat: 39.9526, lng: -75.1652 }, // Philadelphia default
  zoom = 13,
  vendors = [],
  onVendorClick,
}: MapProps) {
  const { theme } = useTheme();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "DEMO_MAP_KEY" // Replace with your API key when using in production
  });

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
        },
        (error) => {
          console.error("Error getting user location:", error);
          toast.error("Could not access your location. Please enable location services.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const mapOptions = useMemo(() => ({
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    scrollwheel: true,
    styles: theme === "dark" ? darkMapStyle : lightMapStyle,
  }), [theme]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Center the map on the user's location
  const centerOnUser = useCallback(() => {
    if (!map || !userLocation) {
      toast.error("Unable to locate you. Please try again.");
      return;
    }
    
    setIsLocating(true);
    map.panTo(userLocation);
    map.setZoom(15);
    
    // Add a slight delay before turning off the locating animation
    setTimeout(() => setIsLocating(false), 1000);
    
    toast.success("Map centered on your location");
  }, [map, userLocation]);

  // Calculate distance between two points
  const getDistance = (pos1: Location, pos2: Location): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
    const dLon = (pos2.lng - pos1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Find nearby vendors (within 10km)
  const nearbyVendors = useMemo(() => {
    if (!userLocation) return vendors;
    
    return vendors.map(vendor => {
      const distanceKm = getDistance(userLocation, vendor.location);
      const distanceMiles = distanceKm * 0.621371; // Convert km to miles
      return {
        ...vendor,
        distance: `${distanceMiles.toFixed(1)} mi`
      };
    });
  }, [vendors, userLocation]);

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-lg relative", className)} 
      style={{ height }}
    >
      {!isLoaded ? (
        <div className="w-full h-full bg-secondary flex items-center justify-center">
          <div className="animate-pulse-opacity">Loading map...</div>
        </div>
      ) : (
        <>
          <GoogleMap
            mapContainerClassName="map-container h-full w-full"
            center={userLocation || center}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
            onClick={() => setSelectedVendor(null)}
          >
            {/* User Location Marker */}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "#FFFFFF",
                }}
                title="Your Location"
              />
            )}

            {/* Vendor Markers */}
            {nearbyVendors.map((vendor: any) => (
              <Marker
                key={vendor.id}
                position={vendor.location}
                title={vendor.name}
                onClick={() => setSelectedVendor(vendor)}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: theme === "dark" ? "#FFFFFF" : "#000000",
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeColor: theme === "dark" ? "#000000" : "#FFFFFF",
                }}
              />
            ))}

            {/* Info Window for Selected Vendor */}
            {selectedVendor && (
              <InfoWindow
                position={selectedVendor.location}
                onCloseClick={() => setSelectedVendor(null)}
              >
                <div className="p-2 max-w-[200px]">
                  <h3 className="font-medium text-black">{selectedVendor.name}</h3>
                  {selectedVendor.distance && (
                    <p className="text-sm text-gray-600">{selectedVendor.distance}</p>
                  )}
                  <button
                    onClick={() => {
                      setSelectedVendor(null);
                      onVendorClick?.(selectedVendor.id);
                    }}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>

          {/* Location Button */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-2 right-2 shadow-md"
            onClick={centerOnUser}
            disabled={!userLocation || isLocating}
          >
            <Navigation className={cn(
              "h-4 w-4 mr-1", 
              isLocating && "animate-pulse"
            )} />
            {isLocating ? "Locating..." : "My Location"}
          </Button>
        </>
      )}
    </div>
  );
}
