import React from "react";

export const WeatherMarker = (props) => {
  const { iconURL, alt, temp } = props;
  return (
    <div className="map-marker">
      <img alt={alt} src={iconURL} className="marker-icon" />
    </div>
  );
};
