//weather object
export default function WeatherInfo({weather}){
    console.log(weather)
    return(
        <>
        <h1>{weather?.location.name}</h1>
        <h1>{weather?.location.country}</h1>
        <h2>Temp:{weather?.current.temp_f}</h2>

        
        </>

    )
}