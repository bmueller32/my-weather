import { useState } from "react"
import userService from "../../utils/userService"
import { Navigate, useNavigate } from "react-router-dom";






export default function SignupPage() {

    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
    })
    //must send form data when sending file to server

    const formData = new FormData();

    formData.append('photo', selectedFile);

    formData.append('username', state.username)
    formData.append('email', state.email)
    formData.append('password', state.password)


    try{
        //make fetch request to server 
        //call signup fetch function in userService
        const signUp = await userService.signup(formData)
        console.log(signUp)
        //navigate to homepage(SearchPage)
        Navigate('/');
        handleSignupOrLogin()


    }
    


    return(
    <h1>Signup page</h1>
    )
}
