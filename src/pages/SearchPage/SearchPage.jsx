import { useState } from "react";


export default function SearchPage() {
  const [user, setUser] = useState(userService.getUser());

  const [searchTerm, setSearchTerm] = useState('');
  const [weather, setWeather] = useState({});
  

  return (
  <h1>Search city form</h1>
  )
}
