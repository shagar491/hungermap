// src/views/Page/Map.tsx
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Tooltip,
  MapContainerProps,
} from "react-leaflet";
import { useSelector } from "react-redux";
import { useFetchIPCQuery } from "../../store";
import { africa_shape } from "../Graphs/africa";
import { RootState } from "../../types/appTypes";
import { MapProps } from "../../types/componentTypes";
import { LatLngExpression } from "leaflet";

import "leaflet/dist/leaflet.css";

const position: LatLngExpression = [1.9422957087636317, -27.91002939455943];

const Map: React.FC<MapProps> = ({ onClick }) => {
  const header = useSelector((state: RootState) => state.header.id);
  const [activePolygon, setActivePolygon] = useState<[string, string]>([
    "Niger",
    "#F09536",
  ]);
  const { data, error, isLoading } = useFetchIPCQuery(header);

  const handleColor = (poly: string): string => {
    if (!data) return "rgb(24,140,179)";

    if (header === 0) {
      return activePolygon[0] === poly ? activePolygon[1] : "rgb(24,140,179)";
    } else {
      const peak = data.ipc_peaks.find(
        (peak: { country_name: string }) => peak.country_name === poly
      );
      if (!peak) return "rgb(24,140,179)";

      const percent = peak.phase_3_percent;
      if (percent === 0) return "#22c1c3";
      else if (percent <= 1) return "#f9bc30";
      else if (percent > 1) return "#dd0a43";
    }

    return "rgb(24,140,179)";
  };

  const handleClick = (e: string) => {
    onClick(e);
    setActivePolygon([e, "#F09536"]);
  };

  const handleZoom = (): boolean => {
    const screenWidth = window.innerWidth;
    return screenWidth <= 768; // Tablet or smaller screens
  };

  const mapContainerProps: MapContainerProps = {
    center: position,
    zoom: handleZoom() ? 2 : 3,
    scrollWheelZoom: true,
    zoomControl: false,
    dragging: false,
    className: "map",
  };

  return (
    <section className="map__container">
      <MapContainer {...mapContainerProps}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/shagar49/clifkgrew003301qp62i773my/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2hhZ2FyNDkiLCJhIjoiY2xpZmpucGUwMGczazNwdDR3MnZ4b25nOSJ9.eVQ3-LVHMh4oKApRNvBYZg"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {africa_shape.features.map((country) => {
          const coordinates: LatLngExpression[][] = (
            country.geometry.coordinates as [number, number][][]
          ).map((polygon) =>
            polygon.map((item) => [item[1], item[0]] as LatLngExpression)
          );
          const { admin } = country.properties;
          const fillColor = handleColor(admin);

          return (
            <Polygon
              key={admin}
              pathOptions={{
                fillColor,
                fillOpacity: 0.7,
                weight: 1,
                opacity: 1,
                dashArray: "0",
                color: "black",
              }}
              positions={coordinates}
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 5,
                    weight: 1,
                    dashArray: 0,
                    color: "black",
                  });
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle({
                    fillOpacity: 0.7,
                    weight: 1,
                    dashArray: 0,
                    color: "black",
                  });
                },
                click: () => handleClick(admin),
              }}
            >
              <Tooltip
                sticky={true}
                className="map__tooltip"
                direction="top"
                offset={[1, 1]}
              >
                {admin}
              </Tooltip>
            </Polygon>
          );
        })}
      </MapContainer>
    </section>
  );
};

export default Map;
