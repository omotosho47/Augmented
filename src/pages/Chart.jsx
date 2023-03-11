import React from 'react'
import axios from 'axios'

function Chart() {
  const [data, setData] = React.useState([])

  React.useEffect(() =>{
      const fetchData = async () =>{
        const options = {
          method: 'GET',
          url: 'https://visual-crossing-weather.p.rapidapi.com/history',
          params: {
            startDateTime: '2023-02-12T00:00:00',
            aggregateHours: '24',
            location: 'Bangor',
            endDateTime: '2023-02-19T00:00:00',
            unitGroup: 'uk',
            contentType: 'json',
            shortColumnNames: '0'
          },
          headers: {
            'X-RapidAPI-Key': 'aa52058a48msha779089f63619d6p10d638jsn24e7f022859c',
            'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
          }
        };
        
        try{
          axios.request(options).then(function (response) {
            const resp = response.data.locations.Bangor
            console.log("newly fetched", resp)
            setData(resp)
            localStorage.setItem("webAR", JSON.stringify(resp))
          }).catch(function (error) {
            console.error(error);
          });
        }catch(err){
          console.error(err)
        }
      }

      const cached = localStorage.getItem("webAR")

      if(cached){
        const cachedData = JSON.parse(cached);
        setData(cachedData.values);
        console.log("cached", cachedData);
      }else{
      fetchData();
      console.log("trying to fetch")
      }
  },[])

  console.log(data)

  return (
    <div>
      <h1>Bar</h1>
    </div>
  )
}

export default Chart