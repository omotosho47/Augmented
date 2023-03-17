import React from "react";
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


  // Fetch data 
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
            setData(resp);
            // cache it
            localStorage.setItem("webAR", JSON.stringify(resp));
          })
          .catch(function (error) {
            toast.error("Error fetching the data", error.message)
            console.error(error.message)
          });
      } catch (err) {
        toast.error(
          <h2>Unable to get data {err.message}</h2>
        )
      }
    };

    // Check for cached data 

    const cached = localStorage.getItem("webAR");

    if (cached) {
      const cachedData = JSON.parse(cached);
      setData(cachedData.values);
    } else {
      fetchData();
      console.log("trying to fetch");
    }
  }, []);

  // Define the scale and color array for the bars

  const width = 15
  const height = 10

  const heightScale = d3.scaleLinear().domain([0, 100]).range([0, 8])
        const tickValues = heightScale.ticks(10);
        const xTickValues = heightScale.ticks(8);

// Manipulating the DOM 

  React.useEffect(() =>{
// Check if data is fetched or cached
    // if(data.length > 1){
    //   const box = d3.select(humidityRef.current)
    //   box.selectAll("a-cylinder")
    //   .data(data)
    //   .attr("color", "magenta")
    //   .attr("radius", "0.6")
    //   .attr("height", (d) => heightScale(d.humidity))
    //   .attr("position", (d, i) => {
    //     const x = (i * 1.5) - 5 ;
    //     const y = heightScale(d.humidity) / 2;
    //     const z = -5.5;
    //     return `${x} ${y} ${z}`;
    //   });
    // }

    if(data.length > 1){
      const box = d3.select(temperatureRef.current)
      box.selectAll("a-cylinder")
      .data(data)
      .attr("color", "lightblue")
      .attr("radius", "0.6")
      .attr("height", (d) => heightScale(d.temp))
      .attr("position", (d, i) => {
        const x = (i * 1.5) - 5 ;
        const y = heightScale(d.temp) / 2;
        const z = 3.5;
        return `${x} ${y} ${z}`;
      });
    }

    if(data.length > 1){
      const box = d3.select(cloudRef.current)
      box.selectAll("a-cylinder")
      .data(data)
      .attr("color", "yellow")
      .attr("radius", "0.6")
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
      box.selectAll("a-cylinder")
      .data(data)
      .attr("color", "blue")
      .attr("radius", "0.6")
      .attr("height", (d) => heightScale(d.wspd))
      .attr("position", (d, i) => {
        const x = (i * 1.5) - 5 ;
        const y = heightScale(d.wspd) / 2;
        const z = 1.5;
        return `${x} ${y} ${z}`;
      });
    }

    // if(data.length > 1){
    //   const box = d3.select(solarRef.current)
    //   box.selectAll("a-cylinder")
    //   .data(data)
    //   .attr("color", "green")
    //   .attr("radius", "0.6")
    //   .attr("height", (d) => heightScale(d.solarradiation))
    //   .attr("position", (d, i) => {
    //     const x = (i * 1.5) - 5 ;
    //     const y = heightScale(d.solarradiation) / 2;
    //     const z = -7.5;
    //     return `${x} ${y} ${z}`;
    //   });
    // }

    if(data.length > 1){
      const box = d3.select(wgustRef.current)
      box.selectAll("a-cylinder")
      .data(data)
      .attr("color", "pink")
      .attr("radius", "0.6")
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
      <a-scene cursor="rayOrigin: mouse" stats ref={sceneRef} embedded arjs>
      {/* <a-marker-camera preset='hiro'></a-marker-camera>     */}
        <a-entity
          camera=""
          position="0 10 19"
          
        ></a-entity>
        <Text
          id="center"
          value="Climate data for Bangor University"
          position="0 11.5 2"
          scale="6 6 6"
        />
        {
          tickValues.map((item, index) => (
            <a-entity key={index}>
              <a-entity line={`start: -7.2 ${heightScale(item)} -6; end: 7.4 ${heightScale(item)} -6; color: lightblue`}></a-entity>
              <a-entity line={`start: 7.4 ${heightScale(item)} -6; end: 7.4 ${heightScale(item)} 5; color: lightblue`}></a-entity>
              <Text value={item} position={`7.8 ${heightScale(item)} 5`} color="blue"/>
              <Text value={item} position={`-7.6 ${heightScale(item)} -6`} color="blue"/>
            </a-entity>
          ))
        }
        {/* {
          xTickValues.map((tickValue, i) => {
            return data.map((item, j) => {
              return <Text key={`${i}-${j}`} value={item.datetimeStr} position={`${heightScale(tickValue)} 1 5`} color="blue" rotation={`${Math.PI * -10.5} 100 0`} />;
            });
          })
        } */}

        {/* <a-entity ref={humidityRef}>
        {
          data.map((item, index) =>{
            return(
              <a-cylinder key={index} onClick={() => {
                toast.success(
                  <>
                  <h2>On {item.datetimeStr}</h2>
                  <h3>Temperature: {item.humidity}</h3>
                  <h3>Weather Condition: {item.conditions}</h3>
                  <h3>Weather Type: {item.weathertype}</h3>
                  <h3>Sea Level Pressure: {item.solarradiation}</h3>
                  </>
                )
              }}></a-cylinder>
            )
          })
        }
        </a-entity> */}
        <a-entity ref={temperatureRef}>
        {
          data.map((item, index) =>{
            return(
              <a-cylinder key={index} onClick={() => {
                toast.success(
                  <>
                  <h2>On {item.datetimeStr}</h2>
                  <h3>Temperature: {item.temp}</h3>
                  <h3>Weather Condition: {item.conditions}</h3>
                  <h3>Weather Type: {item.weathertype}</h3>
                  <h3>Sea Level Pressure: {item.solarradiation}</h3>
                  </>
                )
              }}></a-cylinder>
            )
          })
        }
        </a-entity>
        <a-entity ref={cloudRef}>
        {
          data.map((item, index) =>{
            return(
              <a-cylinder key={index} onClick={() => {
                toast.success(
                  <>
                  <h2>On {item.datetimeStr}</h2>
                  <h3>Cloud Cover: {item.cloudcover}</h3>
                  <h3>Weather Condition: {item.conditions}</h3>
                  <h3>Weather Type: {item.weathertype}</h3>
                  <h3>Sea Level Pressure: {item.sealevelpressure}</h3>
                  </>
                )
              }}></a-cylinder>
          )}
          )}
        </a-entity>
        {/* <a-entity ref={solarRef}>
        {
          data.map((item, index) =>{
            return(
              <a-cylinder key={index} onClick={() => {
                toast.success(
                  <>
                  <h2>On {item.datetimeStr}</h2>
                  <h3>Temperature: {item.solarradiation}</h3>
                  <h3>Weather Condition: {item.conditions}</h3>
                  <h3>Weather Type: {item.weathertype}</h3>
                  <h3>Sea Level Pressure: {item.solarradiation}</h3>
                  </>
                )
              }}></a-cylinder>
            )
          })
        }
        </a-entity> */}
        <a-entity ref={wgustRef}>
        {
          data.map((item, index) =>{
            return(
              <a-cylinder key={index} onClick={() => {
                toast.success(
                  <>
                  <h2>On {item.datetimeStr}</h2>
                  <h3>Cloud Cover: {item.wgust}</h3>
                  <h3>Weather Condition: {item.conditions}</h3>
                  <h3>Weather Type: {item.weathertype}</h3>
                  <h3>Sea Level Pressure: {item.sealevelpressure}</h3>
                  </>
                )
              }}></a-cylinder>
            )
          })
        }
        </a-entity>
        <a-entity ref={windRef}>
        {
          data.map((item, index) =>{
            return(
              <a-cylinder key={index} onClick={() => {
                toast.success(
                  <>
                  <h2>On {item.datetimeStr}</h2>
                  <h3>Cloud Cover: {item.wspd}</h3>
                  <h3>Weather Condition: {item.conditions}</h3>
                  <h3>Weather Type: {item.weathertype}</h3>
                  <h3>Sea Level Pressure: {item.sealevelpressure}</h3>
                  </>
                )
              }}></a-cylinder>
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
        <a-entity line="start: -7.2 -0.7 -6; end: -7.2 10 -6" line__2="start: 7.4 -0.7 -6; end: 7.4 10 -6" line__3= "start: 7.4 -0.7 5; end: 7.4 10 5" >
        </a-entity>

        <a-entity id="center-target" position="0 1.6 -0.5"></a-entity>
      </a-scene>
    </>
  );
}

export default Chart;
