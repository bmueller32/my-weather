import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";



import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import SearchPage from "./pages/SearchPage/SearchPage";


import userService from "./utils/userService";

function App() {
  // get token from localstorage and decode when page loads up //if there is a token, user = user object. If not user = null
  const [user, setUser] = useState(userService.getUser());

  //update state when someone signs up or logs in (in handleSubmit of LoginPage & SignupPage) set user = token(defined in userService)
  function handleSignUpOrLogin() {
    setUser(userService.getUser())
  }

  function handleLogout() {
    userService.logout(); //remove jwt token from local storage
    //set user to null (update state)
    setUser(null)
  }

  if (!user) {
    //if user not logged in (user from token) use these routes
    return (
      <Routes>
        <Route
          path="/login"
          element={<SearchPage handleLogout={handleLogout} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  //if user logged in routes 

  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignUpOrLogin} />} />
      {/* <Route path="/:username" element={<SearchPage user={user} handleLogout={handleLogout}/>}/> */}
    </Routes>
  );
}

export default App;
