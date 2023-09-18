import React from "react";
import Template from "../components/Template";

const Signup = ({setIsLoggedIn}) => {
    return (
        <Template
        title="pages/signup/title"
        des1="pages/signup/des1"
        des2="pages/signup/des1"
        image="#"
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}/>
    )
}

export default Signup;