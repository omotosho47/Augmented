import React from "react";
import axios from "axios";
import Text from "../components/Text";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Legend from "../components/Legend";

function Chart() {
  const [data, setData] = React.useState([]);
  const sceneRef = React.useRef();
  const humidityRef = React.useRef();
  const temperatureRef = React.useRef();
  const cloudRef = React.useRef();
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
            toast.error("Error fetching the data", error.message);
            console.error(error.message);
          });
      } catch (err) {
        toast.error(<h2>Unable to get data {err.message}</h2>);
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

  const width = 13.5;
  const height = 11.5;

  const heightScale = d3.scaleLinear().domain([0, 100]).range([0, 8]);
  const tickValues = heightScale.ticks(10);

  const zLabels = [
    { position: "-8 1 -0.9", text: "Humidity" },
    { position: "-8, 1 0", text: "Wind Gauge" },
    { position: "-8, 1 2.5", text: "Wind Speed" },
    { position: "-8, 1 4.5", text: "Temperature" },
    { position: "-8, 1 -1.8", text: "Cloud Cover" },
  ];

  // Manipulating the DOM

  React.useEffect(() => {
    // Check if data is fetched or cached
    if (data.length > 1) {
      const box = d3.select(humidityRef.current);
      box
        .selectAll("a-cylinder")
        .data(data)
        .attr("color", "yellow")
        .attr("radius", "0.6")
        .attr("height", (d) => heightScale(d.humidity))
        .attr("position", (d, i) => {
          const x = i * 1.5 - 5;
          const y = heightScale(d.humidity) / 2;
          const z = -3.5;
          return `${x} ${y} ${z}`;
        });
    }

    if (data.length > 1) {
      const box = d3.select(temperatureRef.current);
      box
        .selectAll("a-cylinder")
        .data(data)
        .attr("color", "lightblue")
        .attr("radius", "0.6")
        .attr("height", (d) => heightScale(d.temp))
        .attr("position", (d, i) => {
          const x = i * 1.5 - 5;
          const y = heightScale(d.temp) / 2;
          const z = 3.5;
          return `${x} ${y} ${z}`;
        });
    }

    if (data.length > 1) {
      const box = d3.select(cloudRef.current);
      box
        .selectAll("a-cylinder")
        .data(data)
        .attr("color", "green")
        .attr("radius", "0.6")
        .attr("height", (d) => heightScale(d.cloudcover))
        .attr("position", (d, i) => {
          const x = i * 1.5 - 5;
          const y = heightScale(d.cloudcover) / 2;
          const z = -5.5;
          return `${x} ${y} ${z}`;
        });
    }

    if (data.length > 1) {
      const box = d3.select(windRef.current);
      box
        .selectAll("a-cylinder")
        .data(data)
        .attr("color", "blue")
        .attr("radius", "0.6")
        .attr("height", (d) => heightScale(d.wspd))
        .attr("position", (d, i) => {
          const x = i * 1.5 - 5;
          const y = heightScale(d.wspd) / 2;
          const z = 1.5;
          return `${x} ${y} ${z}`;
        });
    }

    if (data.length > 1) {
      const box = d3.select(wgustRef.current);
      box
        .selectAll("a-cylinder")
        .data(data)
        .attr("color", "crimson")
        .attr("radius", "0.6")
        .attr("height", (d) => heightScale(d.wgust))
        .attr("position", (d, i) => {
          const x = i * 1.5 - 5;
          const y = heightScale(d.wgust) / 2;
          const z = -1.5;
          return `${x} ${y} ${z}`;
        });
    }
  }, [data]);

  return (
    <>
      <ToastContainer />
      <a-scene ref={sceneRef}>
        <a-marker preset="hiro">
          <Legend />
          <Text
            id="center"
            value="Climate data for Bangor University"
            position="0 11.5 2"
            scale="6 6 6"
          />
          <Text
            id="center"
            value=" Time Period"
            position="0 -0.3 6.5"
            scale="5 5 5"
          />
          {tickValues.map((item, index) => (
            <a-entity key={index}>
              <a-entity
                line={`start: -7.2 ${heightScale(
                  item
                )} -6; end: 7.4 ${heightScale(item)} -6; color: lightblue`}
              ></a-entity>
              <a-entity
                line={`start: 7.4 ${heightScale(
                  item
                )} -6; end: 7.4 ${heightScale(item)} 5; color: lightblue`}
              ></a-entity>
              <Text
                value={item}
                position={`7.8 ${heightScale(item)} 5`}
                color="blue"
              />
              <Text
                value={item}
                position={`-7.6 ${heightScale(item)} -6`}
                color="blue"
              />
            </a-entity>
          ))}
          {data.map((item, i) => {
            const date = item.datetimeStr.slice(0, 10);
            return (
              <Text
                key={i}
                value={date}
                position={`${i * 1.35 - 4} 1 6.5`}
                color="blue"
                rotation="-60 -60 -10"
              />
            );
          })}
          <a-entity>
            {zLabels.map((item, i) => {
              return (
                <Text
                  key={i}
                  value={item.text}
                  position={item.position}
                  color="blue"
                  align="left"
                />
              );
            })}
          </a-entity>
          <a-entity ref={humidityRef}>
            {data.map((item, index) => {
              return (
                <a-cylinder
                  key={index}
                  onClick={() => {
                    toast.success(
                      <>
                        <h2>On {item.datetimeStr.slice(0, 10)}</h2>
                        <h3>Humidity: {item.humidity}%</h3>
                        <h3>Weather Condition: {item.conditions}</h3>
                        <h3>Weather Type: {item.weathertype}</h3>
                        <h3>Sea Level Pressure: {item.sealevelpressure} hPa</h3>
                      </>
                    );
                  }}
                ></a-cylinder>
              );
            })}
          </a-entity>
          <a-entity ref={temperatureRef}>
            {data.map((item, index) => {
              return (
                <a-cylinder
                  key={index}
                  onClick={() => {
                    toast.success(
                      <>
                        <h2>On {item.datetimeStr.slice(0, 10)}</h2>
                        <h3>Temperature: {item.temp}°C</h3>
                        <h3>Weather Condition: {item.conditions}</h3>
                        <h3>Weather Type: {item.weathertype}</h3>
                        <h3>Solar Radiation: {item.solarradiation}W/m²</h3>
                      </>
                    );
                  }}
                ></a-cylinder>
              );
            })}
          </a-entity>
          <a-entity ref={cloudRef}>
            {data.map((item, index) => {
              return (
                <a-cylinder
                  key={index}
                  onClick={() => {
                    toast.success(
                      <>
                        <h2>On {item.datetimeStr.slice(0, 10)}</h2>
                        <h3>Cloud Cover: {item.cloudcover}%</h3>
                        <h3>Weather Condition: {item.conditions}</h3>
                        <h3>Weather Type: {item.weathertype}</h3>
                      </>
                    );
                  }}
                ></a-cylinder>
              );
            })}
          </a-entity>
          <a-entity ref={wgustRef}>
            {data.map((item, index) => {
              return (
                <a-cylinder
                  key={index}
                  onClick={() => {
                    toast.success(
                      <>
                        <h2>On {item.datetimeStr.slice(0, 10)}</h2>
                        <h3>Wind Gauge: {item.wgust}m/s</h3>
                        <h3>Weather Condition: {item.conditions}</h3>
                        <h3>Weather Type: {item.weathertype}</h3>
                        <h3>Wind direction: {item.wdir} degrees</h3>
                      </>
                    );
                  }}
                ></a-cylinder>
              );
            })}
          </a-entity>
          <a-entity ref={windRef}>
            {data.map((item, index) => {
              return (
                <a-cylinder
                  key={index}
                  onClick={() => {
                    toast.success(
                      <>
                        <h2>On {item.datetimeStr.slice(0, 10)}</h2>
                        <h3>Wind Speed: {item.wspd}m/s</h3>
                        <h3>Weather Condition: {item.conditions}</h3>
                        <h3>Weather Type: {item.weathertype}</h3>
                        <h3>Sea Level Pressure: {item.sealevelpressure} hPa</h3>
                      </>
                    );
                  }}
                ></a-cylinder>
              );
            })}
          </a-entity>
          <a-plane
            color="gray"
            width={width}
            height={height}
            rotation="-90 0 0"
            position="0.5 0 0.8"
          ></a-plane>
          <a-entity
            line="start: -7.2 -0.7 -6; end: -7.2 10 -6"
            line__2="start: 7.4 -0.7 -6; end: 7.4 10 -6"
            line__3="start: 7.4 -0.7 5; end: 7.4 10 5"
          ></a-entity>
        </a-marker>
        <a-entity camera="" position="0 0 19" look-controls=""></a-entity>
      </a-scene>
    </>
  );
}

export default Chart;
