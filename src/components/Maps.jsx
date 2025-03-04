import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    position: "relative",
    width: "100%",
    height: "30rem",
};

const center = { lat: 23.2599, lng: 77.4126 }; // Center the map

const GoogleMapComponent = ({ locations }) => {
    const API_KEY = "AIzaSyBrmTgytSySjG_Hr2YyrcPY0PNdOHJ6nq8";
    // AIzaSyBrmTgytSySjG_Hr2YyrcPY0PNdOHJ6nq8

    var cords = {};

    cords =
        locations.length > 1
            ? locations.map(({ lat, lng }) => ({ lat, lng }))
            : (cords = { lat: 28.7041, lng: 77.1025 });

    return (
        <div className="map-component-container">
            <LoadScript googleMapsApiKey={API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {/* Adding multiple markers */}
                    {cords.length > 1 ? (
                        cords.map((location, index) => (
                            <div>
                                <Marker key={index} position={location} />
                            </div>
                        ))
                    ) : (
                        <div>
                            <h1>Nahhh</h1>
                            <Marker position={center} />
                        </div>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default GoogleMapComponent;
