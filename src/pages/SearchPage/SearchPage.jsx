import { useState, useEffect } from "react";
import SearchForm from "../../components/ErrorMessage/SearchForm/SearchForm";
import userService from "../../utils/userService";
import WeatherInfo from "../../components/ErrorMessage/WeatherInfo/WeatherInfo";

export default function SearchPage() {
  const [user, setUser] = useState(userService.getUser());

  const [searchTerm, setSearchTerm] = useState("london");
  const [weather, setWeather] = useState({});

  function getWeatherSearch(cityName) {
    setSearchTerm(cityName);
  }

  useEffect(() => {
    const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=c306f9e6b6654417930193923230208&q=${searchTerm}&aqi=no`;
    //use async and await for api call to give http request time
    const headers = {
        'Content-Type': 'application/json', 
      };
    async function getWeatherInfo() {
      try {
        
        const apiResponse = await fetch(weatherUrl,{ 
            method: "GET",
            headers: headers
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

    getWeatherInfo();

    //watch for state to change of searchTerm and useEffect is run again
  }, [searchTerm]); // run useEffect again after component loads
  console.log(weather);
  return (
    <>
      <SearchForm getWeatherSearch={getWeatherSearch} />
     {weather.location? <WeatherInfo weather={weather}  /> : null }
    </>
  );
}
