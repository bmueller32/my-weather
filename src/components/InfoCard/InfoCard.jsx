import { Button, Card } from "semantic-ui-react";
import { useState, useEffect } from "react";
function InfoCard({ location, handleAddCity, handleDeleteCity }) {
  const [weather, setWeather] = useState(null);
  console.log(weather, "is weather");
  console.log(location, 'this is the location')
  //fetch a city
  const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=c306f9e6b6654417930193923230208&q=${location}&aqi=no`;
  //use async and await for api call to give http request time
  const headers = {
    "Content-Type": "application/json",
  };
  async function getWeatherInfo() {
    try {
      const apiResponse = await fetch(weatherUrl, {
        method: "GET",
        headers: headers,
      });
      console.log(apiResponse);
      //fetch makes HTTP Get request and repsonse is json = apiResponse, has to be parsed into js object to be used
      const data = await apiResponse.json();

      //.json to parse json into js
      console.log(data);
      //console.log(data) to see api response
      setWeather(data);
    } catch (err) {
      console.log(err, "error from api call");
    }
  }
  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
      <Card>
        <Card.Header>
            <Card.Content>
                <span>{weather?.current.condition.text}</span>
                <img className="ui mini spaced image" src={weather?.current.condition.icon}/>
            </Card.Content>
          <Card.Content>
            {weather?.location.name},{weather?.location.country}
          </Card.Content>
          <Card.Content>Temp:{weather?.current.temp_f} F</Card.Content>
        </Card.Header>
      </Card>
      <Card>
        <Card.Content>Feels like:{weather?.current.feelslike_f}</Card.Content>{" "}
        <Card.Content> Humidity:{weather?.current.humidity}%</Card.Content>{" "}
        <Card.Content>Wind:{weather?.current.wind_mph}mph</Card.Content>
        <Button color="green" onClick={()=>handleAddCity(location)}>Add</Button>
        <Button color="red" onClick={()=>handleDeleteCity(location)}>Remove</Button>
      </Card>
    </>
  );
}

export default InfoCard;
