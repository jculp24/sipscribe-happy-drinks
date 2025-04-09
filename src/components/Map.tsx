
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your Mapbox token here (temporary solution)
// In production, this should be stored securely
const MAPBOX_TOKEN = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHl5dHdhYjEyMHFjMmpwNXFqNnJjNWxqIn0.AuLxo2X7rcpBzRGc9KJdvA";

interface Location {
  lat: number;
  lng: number;
}

interface Vendor {
  id: string;
  name: string;
  location: Location;
  distance?: string;
}

interface MapProps {
  className?: string;
  height?: string;
  center?: Location;
  zoom?: number;
  vendors?: Vendor[];
  onVendorClick?: (vendorId: string) => void;
}

// Light and dark mode styles for Mapbox
const LIGHT_STYLE = "mapbox://styles/mapbox/light-v11";
const DARK_STYLE = "mapbox://styles/mapbox/dark-v11";

export function Map({
  className,
  height = "240px",
  center = { lat: 39.9526, lng: -75.1652 }, // Philadelphia default
  zoom = 13,
  vendors = [],
  onVendorClick,
}: MapProps) {
  const { theme } = useTheme();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{[key: string]: mapboxgl.Marker}>({});
  const popupsRef = useRef<{[key: string]: mapboxgl.Popup}>({});
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === 'dark' ? DARK_STYLE : LIGHT_STYLE,
      center: [center.lng, center.lat],
      zoom: zoom,
      attributionControl: false
    });

    map.current.addControl(new mapboxgl.AttributionControl(), 'top-left');
    
    map.current.on('load', () => {
      setMapLoaded(true);
    });
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map style when theme changes
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(theme === 'dark' ? DARK_STYLE : LIGHT_STYLE);
    }
  }, [theme]);

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
          
          // Center map on user location when first obtained
          if (map.current && !isLocating) {
            map.current.flyTo({
              center: [userPos.lng, userPos.lat],
              zoom: 15,
              essential: true
            });
          }
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

  // Add user location marker when location is available and map is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded || !userLocation) return;

    // Clear any existing user marker
    if (markersRef.current['user']) {
      markersRef.current['user'].remove();
    }
    
    // Create a user location marker
    const el = document.createElement('div');
    el.className = 'user-location-marker';
    el.style.width = '18px';
    el.style.height = '18px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = '#4285F4';
    el.style.border = '2px solid white';
    el.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)';
    
    markersRef.current['user'] = new mapboxgl.Marker(el)
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);
      
  }, [userLocation, mapLoaded]);

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

  // Find nearby vendors (within 10km) with distance calculation
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

  // Add vendor markers to the map
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Remove existing markers and popups
    Object.values(markersRef.current).forEach(marker => {
      if (marker !== markersRef.current['user']) {
        marker.remove();
      }
    });
    
    Object.values(popupsRef.current).forEach(popup => {
      popup.remove();
    });
    
    // Add new markers for vendors
    nearbyVendors.forEach((vendor) => {
      // Create marker element
      const el = document.createElement('div');
      el.className = 'vendor-marker';
      el.style.width = '14px';
      el.style.height = '14px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = theme === 'dark' ? 'white' : 'black';
      el.style.border = `1px solid ${theme === 'dark' ? 'black' : 'white'}`;
      
      // Create popup for this vendor
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
          <div class="p-2 max-w-[200px]" style="color: ${theme === 'dark' ? 'white' : 'black'}; background: ${theme === 'dark' ? '#1f1f1f' : 'white'};">
            <h3 style="font-weight: 500;">${vendor.name}</h3>
            ${vendor.distance ? `<p style="font-size: 0.875rem; color: ${theme === 'dark' ? '#aaa' : '#666'};">${vendor.distance}</p>` : ''}
            <button 
              id="vendor-${vendor.id}-button"
              style="margin-top: 8px; font-size: 0.875rem; color: #3b82f6; cursor: pointer;"
            >
              View Details
            </button>
          </div>
        `);
        
      // Create and add the marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([vendor.location.lng, vendor.location.lat])
        .setPopup(popup)
        .addTo(map.current!);
        
      // Store references
      markersRef.current[vendor.id] = marker;
      popupsRef.current[vendor.id] = popup;
      
      // Add event listener for popup
      marker.getElement().addEventListener('click', () => {
        setSelectedVendor(vendor);
      });
      
      // Add event listener for the "View Details" button inside popup
      popup.on('open', () => {
        setTimeout(() => {
          const button = document.getElementById(`vendor-${vendor.id}-button`);
          if (button) {
            button.addEventListener('click', () => {
              if (onVendorClick) {
                onVendorClick(vendor.id);
              }
              popup.remove();
            });
          }
        }, 0);
      });
    });
    
  }, [nearbyVendors, theme, mapLoaded, onVendorClick]);

  // Center the map on the user's location
  const centerOnUser = useCallback(() => {
    if (!map.current || !userLocation) {
      toast.error("Unable to locate you. Please try again.");
      return;
    }
    
    setIsLocating(true);
    
    map.current.flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 15,
      essential: true
    });
    
    // Add a slight delay before turning off the locating animation
    setTimeout(() => setIsLocating(false), 1000);
    
    toast.success("Map centered on your location");
  }, [map, userLocation]);

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-lg relative", className)} 
      style={{ height }}
    >
      {!mapLoaded ? (
        <div className="w-full h-full bg-secondary flex items-center justify-center">
          <div className="animate-pulse-opacity">Loading map...</div>
        </div>
      ) : (
        <>
          <div 
            ref={mapContainer} 
            className="map-container h-full w-full"
          />

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
