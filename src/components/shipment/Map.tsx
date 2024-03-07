"use client";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import React, { useEffect, useRef, useState } from "react";
import { marker } from "leaflet";

type MapProps = {
  center: {
    lat: number;
    lng: number;
  };
  position: {
    lat: number;
    lng: number;
  };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
};

const Map = ({ center, position, setPosition }: MapProps) => {
  const markerRef = useRef(null);

  const RecenterAutomatically = () => {
    const map = useMapEvents({
      drag: (e) => {
        setPosition(map.getCenter());
      },
      zoom: (e) => {
        setPosition(map.getCenter());
      },
    });

    return null;
  };

  return (
    <MapContainer center={center} zoom={12.0} className="h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} ref={markerRef}>
        <Popup>Place mark on your address</Popup>
      </Marker>
      <RecenterAutomatically />
    </MapContainer>
  );
};

export default Map;
