import { Header, Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment clearing >
      <Header as="h2" floated="right">
        <Link to="/login" onClick={handleLogout}> Logout
          <Icon name="sign-out"></Icon>
        </Link>
      </Header>
      <Header as="h1"floated="left" >My Weather</Header>
      <Header as="h2" floated="left">
        <Image src={
            user?.photoUrl ? 
            user?.photoUrl 
            : "https://react.semantic-ui.com/images/wireframe/square-image.png"
             } avatar
             ></Image>
      </Header>
    </Segment>
  );
}
