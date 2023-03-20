import React from "react";
import Text from "./Text";

function Legend() {
  const legendArray = {
    temp: {
      value: "Temperature",
      color: "lightblue",
    },
    cloud: {
      value: "Cloud Cover",
      color: "green",
    },
    wspd: {
      value: "Wind Speed",
      color: "blue",
    },
    hum: {
      value: "Humidity",
      color: "yellow",
    },
    wgust: {
      value: "Wind Gauge",
      color: "crimson",
    }
  };
  return (
    <>
      <Text
        id="center"
        value={legendArray.temp.value}
        position={`-8 9 1`}
        scale="6 6 6"
        color={legendArray.temp.color}
        align="left"
      />
      <Text
        id="center"
        value={legendArray.cloud.value}
        position={`-8 8 1`}
        scale="6 6 6"
        color={legendArray.cloud.color}
        align="left"
      />
      <Text
        id="center"
        value={legendArray.wspd.value}
        position={`-8 7 1`}
        scale="6 6 6"
        color={legendArray.wspd.color}
        align="left"
      />
      <Text
        id="center"
        value={legendArray.wgust.value}
        position={`-8 6 1`}
        scale="6 6 6"
        color={legendArray.wgust.color}
        align="left"
      />
      <Text
        id="center"
        value={legendArray.hum.value}
        position={`-8 5 1`}
        scale="6 6 6"
        color={legendArray.hum.color}
        align="left"
      />
    </>
  );
}

export default Legend;
