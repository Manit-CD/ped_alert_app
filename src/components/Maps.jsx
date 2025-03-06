import React, { useRef, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const LIBRARIES = ["marker"]; // Define libraries as a constant

const mapContainerStyle = {
    position: "relative",
    width: "100%",
    height: "30rem",
};

const center = { lat: 23.2599, lng: 77.4126 };

const Maps = ({ locations }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Use environment variable
        libraries: LIBRARIES,
    });

    const mapRef = useRef(null);

    const cords = useMemo(() => {
        return locations.map(({ lat, lng }) => ({ lat, lng }));
    }, [locations]);

    useEffect(() => {
        const markers = [];

        if (
            isLoaded &&
            mapRef.current &&
            window.google?.maps?.marker?.AdvancedMarkerElement
        ) {
            const map = mapRef.current;

            cords.forEach((location) => {
                const marker = new google.maps.marker.AdvancedMarkerElement({
                    map,
                    position: { lat: location.lat, lng: location.lng },
                    title: location.title,
                });

                markers.push(marker);
            });
        }

        return () => {
            markers.forEach((marker) => {
                marker.map = null;
            });
        };
    }, [isLoaded, cords]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={6}
            center={center}
            onLoad={(map) => (mapRef.current = map)}
        />
    );
};

export default Maps;
