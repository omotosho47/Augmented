import React, { useRef } from "react";
import axios from "axios";
import "aframe";
import * as d3 from "d3"
import Text from "../components/Text";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function Chart() {
  const [data, setData] = React.useState([]);

  const sceneRef = React.useRef();
  const humidityRef = React.useRef();
  const temperatureRef = React.useRef();
  const cloudRef = React.useRef();
  const solarRef = React.useRef();
  const wgustRef = React.useRef();
  const windRef = React.useRef();

  React.useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://visual-crossing-weather.p.rapidapi.com/history",
        params: {
          startDateTime: "2023-02-12T00:00:00",
          aggregateHours: "24",
          location: "Bangor",
          endDateTime: "2023-02-19T00:00:00",
          unitGroup: "uk",
          contentType: "json",
          shortColumnNames: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "aa52058a48msha779089f63619d6p10d638jsn24e7f022859c",
          "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
        },
      };

      try {
        axios
          .request(options)
          .then(function (response) {
            const resp = response.data.locations.Bangor;
            // console.log("newly fetched", resp);
            setData(resp);
            localStorage.setItem("webAR", JSON.stringify(resp));
          })
          .catch(function (error) {
            console.error(error);
          });
      } catch (err) {
        console.error(err);
      }
    };

    const cached = localStorage.getItem("webAR");

    if (cached) {
      const cachedData = JSON.parse(cached);
      setData(cachedData.values);
      // console.log("cached", cachedData);
    } else {
      fetchData();
      console.log("trying to fetch");
    }
  }, []);

  // console.log(data)

  const width = 15
  const height = 10
  const heightScale = d3.scaleLinear().domain([0, 100]).range([0, 8])

  const xColor = d3.scaleLinear()
        .domain([0, 100])
        .range([
          "#0072c6",
          "#00b050",
          "#ffc000",
          "#ff9900",
          "#ff6600",
          "#c00000",
        ]);

      const xDate = d3.scaleBand().domain([data.datetimeStr]).range([0, width])

  React.useEffect(() =>{

    if(data.length > 1){
      const box = d3.select(humidityRef.current)
      box.selectAll("a-box")
      .data(data)
      .attr("color", (d) => xColor(d.humidity))
      .attr("shadow", "cast: true; receive: true;")
      .attr("height", (d) => heightScale(d.humidity))
      .attr("position", (d, i) => {
        const x = (i * 1.5) - 5 ;
        const y = heightScale(d.humidity) / 2;
        const z = -5.5;
        return `${x} ${y} ${z}`;
      });
    }

    if(data.length > 1){
      const box = d3.select(temperatureRef.current)
      box.selectAll("a-box")
      .data(data)
      .attr("color", (d) => xColor(d.temp))
      .attr("shadow", "cast: true; receive: true;")
      .attr("height", (d) => heightScale(d.temp))
      .attr(
        "animation",
        "property: rotation; to: 0 360 0; loop: true; dur: 20000"
      )
      .attr("position", (d, i) => {
        const x = (i * 1.5) - 5 ;
        const y = heightScale(d.temp) / 2;
        const z = 3.5;
        return `${x} ${y} ${z}`;
      });
    }

    if(data.length > 1){
      const box = d3.select(cloudRef.current)
      box.selectAll("a-box")
      .data(data)
      .attr("color", "red")
      .attr("height", (d) => heightScale(d.cloudcover))
      .attr("position", (d, i) => {
        const x = (i * 1.5) - 5 ;
        const y = heightScale(d.cloudcover) / 2;
        const z = -3.5;
        return `${x} ${y} ${z}`;
      });
    }

    if(data.length > 1){
      const box = d3.select(windRef.current)
      box.selectAll("a-box")
      .data(data)
      .attr("color", "magenta")
      .attr("height", (d) => heightScale(d.wspd))
      .attr("position", (d, i) => {
        const x = (i * 1.5) - 5 ;
        const y = heightScale(d.wspd) / 2;
        const z = 1.5;
        return `${x} ${y} ${z}`;
      });
    }

    if(data.length > 1){
      const box = d3.select(solarRef.current)
      box.selectAll("a-box")
      .data(data)
      .attr("color", "blue")
      .attr("height", (d) => heightScale(d.solarradiation))
      .attr("position", (d, i) => {
        const x = (i * 1.5) - 5 ;
        const y = heightScale(d.solarradiation) / 2;
        const z = -7.5;
        return `${x} ${y} ${z}`;
      });
    }

    if(data.length > 1){
      const box = d3.select(wgustRef.current)
      box.selectAll("a-box")
      .data(data)
      .attr("color", "yellow")
      .attr("height", (d) => heightScale(d.wgust))
      .attr("position", (d, i) => {
        const x = (i * 1.5) - 5 ;
        const y = heightScale(d.wgust) / 2;
        const z = -1.5;
        return `${x} ${y} ${z}`;
      });
    }
  },[data])

  

  return (
    <>
    <ToastContainer />
      <a-scene cursor="rayOrigin: mouse" stats ref={sceneRef}>
        <a-entity
          camera=""
          position="0 10 20"
          
        ></a-entity>
        <Text
          id="center"
          value="Climate data for Bangor University"
          position="0 0.5 2"
        />

        {/* <a-entity ref={humidityRef}>
        {
          data.map((item, index) =>{
            return(
              <a-box key={index} onClick={() => console.log(item.humidity `On ${item.datetimeStr}, weather condition is ${item.conditions}, weather type is ${item.weathertype}`)}></a-box>
            )
          })
        }
        </a-entity> */}
        <a-entity ref={temperatureRef}>
        {
          data.map((item, index) =>{
            return(
              <a-box key={index} onClick={() => {
                toast.success(
                  <>
                  <h2>On {item.datetimeStr}</h2>
                  <h3>Temperature: {item.temp}</h3>
                  <h3>Weather Condition: {item.conditions}</h3>
                  <h3>Weather Type: {item.weathertype}</h3>
                  <h3>Sea Level Pressure: {item.sealevelpressure}</h3>
                  </>
                )
              }}></a-box>
            )
          })
        }
        </a-entity>
        <a-entity ref={cloudRef}>
        {
          data.map((item, index) =>{
            return(
              <a-box key={index} onClick={() => console.log(item.clouds `On ${item.datetimeStr}, weather condition is ${item.conditions}, weather type is ${item.weathertype}`)}></a-box>
            )
          })
        }
        </a-entity>
        {/* <a-entity ref={solarRef}>
        {
          data.map((item, index) =>{
            return(
              <a-box key={index} onClick={() => console.log(item.clouds `On ${item.datetimeStr}, weather condition is ${item.conditions}, weather type is ${item.weathertype}`)}></a-box>
            )
          })
        }
        </a-entity> */}
        <a-entity ref={wgustRef}>
        {
          data.map((item, index) =>{
            return(
              <a-box key={index} onClick={() => console.log(item.clouds `On ${item.datetimeStr}, weather condition is ${item.conditions}, weather type is ${item.weathertype}`)}></a-box>
            )
          })
        }
        </a-entity>
        <a-entity ref={windRef}>
        {
          data.map((item, index) =>{
            return(
              <a-box key={index} onClick={() => console.log(item.clouds `On ${item.datetimeStr}, weather condition is ${item.conditions}, weather type is ${item.weathertype}`)}></a-box>
            )
          })
        }
        </a-entity>
        <a-plane
          color="gray"
          width={width}
          height={height}
          rotation="-90 0 0"
          position="0 0 0.8"
        ></a-plane>

        <a-entity id="center-target" position="0 1.6 -0.5"></a-entity>
      </a-scene>
    </>
  );
}

export default Chart;
