import React from "react";
import Text from "./Text";

function Legend() {
  const legendArray = [
    {
      value: "Temperature",
      color: "lightblue",
      position: "-5 9 1",
    },
    {
      value: "Cloud Cover",
      color: "green",
      position: "-5 8 1",
    },
    {
      value: "Wind Speed",
      color: "blue",
      position: "-5 7 1",
    },
    {
      value: "Wind Gauge",
      color: "crimson",
      position: "-5 6 1",
    },
    {
      value: "Humidity",
      color: "yellow",
      position: "-5 5 1",
    },
  ];
  return (
    <>
      <a-entity>
        {legendArray.map((values, index) => {
          <Text
            id="center"
            value={values.value}
            position={values.position}
            scale="6 6 6"
            color={values.color}
            align="left"
          />;
        })}
      </a-entity>
    </>
  );
}

export default Legend;
