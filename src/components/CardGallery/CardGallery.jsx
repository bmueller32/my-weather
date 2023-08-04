import { Card } from 'semantic-ui-react'
import InfoCard from '../InfoCard/InfoCard'
import { useEffect, useState } from 'react'

export default function CardGallery({ cities, user}){

    const InfoCards = cities.map((city, index) =>{
        
        console.log(city, "the city")
       
        
    return <InfoCard user={user} key={index} location={city.location}  />
    })
    
return(
    <Card.Group>
        {cities ? InfoCards : null}
    </Card.Group>
)
}
