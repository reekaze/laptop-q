"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import React, { useEffect, useState } from "react";
import { Map as LMap } from "leaflet";
import { delay } from "@/lib/utils";

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
  const [lmap, setLmap] = useState<LMap | undefined>();

  const RecenterAutomatically = () => {
    const map = useMapEvents({
      drag: (e) => {
        setPosition(map.getCenter());
      },
      zoom: (e) => {
        setPosition(map.getCenter());
      },
      locationfound: async (e) => {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom(), {
          duration: 4,
          easeLinearity: 0.4,
        });
      },
    });

    useEffect(() => {
      setLmap(map);

      return () => {};
    }, [map]);

    return null;
  };

  useEffect(() => {
    if (lmap !== undefined) {
      lmap.locate();
    }

    return () => {};
  }, [lmap]);

  return (
    <MapContainer
      center={center}
      zoom={18.0}
      className="h-full"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Place mark on your address</Popup>
      </Marker>
      <RecenterAutomatically />
    </MapContainer>
  );
};

export default Map;
