import React, { useState } from 'react'
import authContext from './authContext'

const AuthState = (props) => {
    const host = "http://127.0.0.1:5000"
    const [credentials, setCredentials] = useState({ name: "", email: "" })
    

    const getUserData = async (id) => {
        const response = await fetch(`${host}/auth/find-user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await response.user
        setCredentials(json);
    }

    return (
        <authContext.Provider value={{ credentials, getUserData }}>
            {props.children}
        </authContext.Provider>
    )
}