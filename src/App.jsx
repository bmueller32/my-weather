import { Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import userService from "./utils/userService";

function App() {
// get token from localstorage and decode when page loads up //if there is a token, user = user object. If not user = null
  const [user, setUser] = useState(userService.getUser());



  //update state when someone signs up or logs in (in handleSubmit of LoginPage & SignupPage) set user = token(defined in userService)
  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }






  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage/>} />
    </Routes>
  );
}

export default App;
