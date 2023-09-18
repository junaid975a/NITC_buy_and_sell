import React from "react";
import Template from "../components/Template";

const Login = ({setIsLoggedIn}) => {
    return (
        
            <Template
                title="Welcome Back"
                des1="pages/login/des1"
                des2="pages/login/des2"
                image="#"
                formtype="login"
                setIsLoggedIn={setIsLoggedIn}/>
        
    )
}

export default Login; 