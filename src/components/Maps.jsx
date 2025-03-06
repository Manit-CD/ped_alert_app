import React, { useRef, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
    position: "relative",
    width: "100%",
    height: "30rem",
};

const center = {
    lat: 37.7749,
    lng: -122.4194,
};

const cords = [];

cords = locations.map(({ lat, lng }) => ({ lat, lng }));

const Maps = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBrmTgytSySjG_Hr2YyrcPY0PNdOHJ6nq8",
        libraries: ["marker"],
    });

    const mapRef = useRef(null);

    useEffect(() => {
        const markers = [];

        if (isLoaded && mapRef.current) {
            const map = mapRef.current;

            locations.forEach((location) => {
                const marker = new google.maps.marker.AdvancedMarkerElement({
                    map,
                    position: { lat: cords.lat, lng: cords.lng },
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
    }, [isLoaded]);

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
