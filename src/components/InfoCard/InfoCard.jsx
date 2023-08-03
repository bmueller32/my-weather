import { Card } from "semantic-ui-react";

function InfoCard({ weather }) {
  return (
    <>
      <Card>
        <Card.Header>
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
      </Card>
    </>
  );
}

export default InfoCard;
