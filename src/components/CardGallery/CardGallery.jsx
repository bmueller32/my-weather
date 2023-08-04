import { Card } from 'semantic-ui-react'
import InfoCard from '../InfoCard/InfoCard'


export default function CardGallery({ cities, user}){

    const InfoCards = cities.map(() =>{
        return <InfoCard city={city} user={user}/>
    })
return(
    <Card.Group>
        {InfoCards}
    </Card.Group>
)
}
