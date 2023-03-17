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
    wgust: {
      value: "Wind ",
      color: "crimson",
    }
  };
  return (
    <>
      <Text
        id="center"
        value={legendArray.temp.value}
        position={`-9 8 1`}
        scale="6 6 6"
        color={legendArray.temp.color}
      />
      <Text
        id="center"
        value={legendArray.cloud.value}
        position={`-9 7 1`}
        scale="6 6 6"
        color={legendArray.cloud.color}
      />
      <Text
        id="center"
        value={legendArray.wspd.value}
        position={`-9 6 1`}
        scale="6 6 6"
        color={legendArray.wspd.color}
      />
      <Text
        id="center"
        value={legendArray.wgust.value}
        position={`-9 5 1`}
        scale="6 6 6"
        color={legendArray.wgust.color}
      />
    </>
  );
}

export default Legend;
