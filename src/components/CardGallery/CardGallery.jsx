import { Card } from 'semantic-ui-react'
import InfoCard from '../InfoCard/InfoCard'


export default function CardGallery({ cities, user, handleAddCity, handleDeleteCity}){

    const InfoCards = cities.map((city, index) =>{
        
        console.log(city, "the city")
       
        
    return <InfoCard handleDeleteCity={handleDeleteCity} handleAddCity={handleAddCity} user={user} key={index} location={city.location}  />
    })
    
return(
    <Card.Group>
        {cities ? InfoCards : null}
    </Card.Group>
)
}
