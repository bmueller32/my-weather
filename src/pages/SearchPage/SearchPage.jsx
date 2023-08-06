import { useState, useEffect } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import userService from "../../utils/userService";
import InfoCard from "../../components/InfoCard/InfoCard";
import PageHeader from "../../components/Header/Header";
import CardGallery from "../../components/CardGallery/CardGallery";
import * as cityApi from "../../utils/cityApi";
import { Grid, GridRow } from "semantic-ui-react";

export default function SearchPage({ user, handleLogout }) {
  const [searchTerm, setSearchTerm] = useState(null);

  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");

  // (C)RUD
  // we will call this function in the handleSubmit of the AddCity, and pass to it
  // the formData we created
  // this way when we get a response from the server we can easily update the state, since its
  // in this component
  async function handleAddCity(data) {
    console.log("data", data);
    try {
      const responseData = await cityApi.create(data);
      console.log(responseData, " <- response from server in handleAddCity");
      setCities([responseData.data, ...cities]); // emptying the previous cities in to the new
      // and then adding the new one we just created to the front (response.data)
    } catch (err) {
      console.log(err, " err in handleAddCity SearchPage");
      setError("Error Creating a City! Please try again");
    }
  }

  async function handleDeleteCity(data) {
    try {
      const responseData = await cityApi.deleteCity(data);
      console.log(responseData, " <- response from server in handleDeleteCity");
      setCities([responseData.data, ...cities]);
    } catch (err) {
      console.log(err, "err in handleDeleteCity SearchPage");
      setError("Error deleting a city! Please try again");
    }
  }

  // C(R)UD
  async function getCities() {
    try {
      const responseFromTheServer = await cityApi.getAll(); // this is the fetch function from cityApi utils
      console.log(responseFromTheServer);
      setCities(responseFromTheServer.cities);
    } catch (err) {
      console.log(err, " err in getCities");
      setError("Error Fetching Cities, Check terminal");
    }
  }

  function getWeatherSearch(cityName) {
    setSearchTerm(cityName);
  }
  useEffect(() => {
    getCities();
    console.log(cities, "these are the cities");
  }, []);
  //   useEffect(() => {
  //     console.log('before get cities')
  //     getCities();
  //     console.log('after get cities')
  //     const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=c306f9e6b6654417930193923230208&q=${searchTerm}&aqi=no`;
  //     //use async and await for api call to give http request time
  //     const headers = {
  //       "Content-Type": "application/json",
  //     };
  //     async function getWeatherInfo() {
  //       try {
  //         const apiResponse = await fetch(weatherUrl, {
  //           method: "GET",
  //           headers: headers,
  //         });
  //         console.log(apiResponse);
  //         //fetch makes HTTP Get request and repsonse is json = apiResponse, has to be parsed into js object to be used
  //         const data = await apiResponse.json();

  //         //.json to parse json into js
  //         console.log(data);
  //         //console.log(data) to see api response
  //         setWeather(data);
  //       } catch (err) {
  //         console.log(err, "error from api call");
  //       }

  //     }

  //     getWeatherInfo();

  //    // watch for state to change of searchTerm and useEffect is run again
  //   }, [searchTerm]); // run useEffect again after component loads
  //   console.log(weather);
  return (
    <Grid centered>
        <Grid.Row>
            <Grid.Column>
      <PageHeader handleLogout={handleLogout} user={user} />
      </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <SearchForm
            getWeatherSearch={getWeatherSearch}
            handleAddCity={handleAddCity}
          />
          {/* {weather ? <InfoCard weather={weather} /> : null} */}
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          {!searchTerm ? (
            <CardGallery
              handleAddCity={handleAddCity}
              handleDeleteCity={handleDeleteCity}
              cities={cities}
              user={user}
            />
          ) : (
            <InfoCard handleDeleteCity={handleDeleteCity} handleAddCity={handleAddCity} location={searchTerm} />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
