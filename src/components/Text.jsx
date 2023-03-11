import React, { useEffect, useRef, useState } from "react";
import "aframe";

function Text({
  position = "1 2 1",
  scale = "3 3 3",
  width = "3",
  height = "3",
  value= "Default value",
  color = "purple",
  ...rest
}) {
  return (
    <a-text
      position={position}
      value={value}
      align="center"
      width={width}
      height={height}
      font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"
      color={color}
      scale={scale}
      {...rest}
    ></a-text>
  );
}

export default Text;
