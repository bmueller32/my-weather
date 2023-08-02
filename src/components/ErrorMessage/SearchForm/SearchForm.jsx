import { useState } from "react";
import { Form, Button } from "semantic-ui-react";

export default function SearchForm({ getWeatherSearch }) {
  const [cityFormState, setCityFormState] = useState("");

  function handleChange(e) {
    console.log(e.target.value);
    setCityFormState(e.target.value);
  }

  function handleSubmit(e) {
    //prevent form from making http request
    e.preventDefault();
    getWeatherSearch(cityFormState);
    setCityFormState("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Search by City</label>
        <input value={cityFormState} onChange={handleChange} />
      </Form.Field>
      <Button type="submit" className="btn">
        Search
      </Button>
    </Form>
  );
}
