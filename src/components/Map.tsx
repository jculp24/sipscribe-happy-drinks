
import { useState, useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

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
  center = { lat: 39.9526, lng: -75.1652 }, // Philadelphia
  zoom = 13,
  vendors = [],
  onVendorClick,
}: MapProps) {
  const { theme } = useTheme();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "DEMO_MAP_KEY" // Replace with your API key when using in production
  });

  const mapOptions = useMemo(() => ({
    disableDefaultUI: true,
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

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-lg", className)} 
      style={{ height }}
    >
      {!isLoaded ? (
        <div className="w-full h-full bg-secondary flex items-center justify-center">
          <div className="animate-pulse-opacity">Loading map...</div>
        </div>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {vendors.map((vendor) => (
            <Marker
              key={vendor.id}
              position={vendor.location}
              title={vendor.name}
              onClick={() => onVendorClick?.(vendor.id)}
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
        </GoogleMap>
      )}
    </div>
  );
}
