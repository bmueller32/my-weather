import { Card } from 'semantic-ui-react'
import InfoCard from '../InfoCard/InfoCard'


export default function CardGallery({ cards, user}){

    const InfoCards = cards.map(() =>{
        return <InfoCard card={card} user={user}/>
    })
return(
    <Card.Group>
        {InfoCards}
    </Card.Group>
)
}
