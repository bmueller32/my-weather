import { useState } from "react";
import userService from "../../utils/userService";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Button,
  Form,
  Grid,
  GridColumn,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

export default function SignupPage({ handleSignupOrLogin }) {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  //state for file upload
  const [selectedFile, setSelectedFile] = useState("");

  const [error, setError] = useState("");

  //navigate function takes a path defined in app
  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //must send form data when sending file to server
    //key on req.file=photo
    //req.body=formdata
    const formData = new FormData();

    formData.append("photo", selectedFile);
    formData.append("username", state.username);
    formData.append("email", state.email);
    formData.append("password", state.password);

    try {
      //make fetch request to server
      //call signup fetch function in userService
      const signUp = await userService.signup(formData);
      console.log(signUp);
      //navigate to homepage(SearchPage)
      handleSignupOrLogin();
      navigate('/');
       //defined in app
    } catch (err) {
      console.log(err, "err in handleSubmit");
      setError;
    }
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          <Image src="https://i.imgur.com/uFCl6n9.png" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              placeholder="passwordConf"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button color="blue" type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
