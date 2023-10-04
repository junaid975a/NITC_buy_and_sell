import React, { useState } from 'react'
import AuthContext from './AuthContext'
import axios from 'axios'

const AuthState = (props) => {
    const host = "http://127.0.0.1:5000"
    const [userData, setUserData] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    const config = {
        headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
    };

    const getUserData = async (id) => {
        if (id === null) {
            setUserData(null);
            return; // Exit the function early
        }

        try {
            const response = await fetch(`${host}/auth/find-user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                // Handle non-successful response (e.g., 404 or 500)
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const dataUser = await response.json(); // Parse JSON data from the response

            setUserData(dataUser); // Set the parsed data to state
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    const getSellerData = async (id) => {
        if (id === null) {
            // setUserData(null);
            return; // Exit the function early
        }

        try {
            const response = await fetch(`${host}/auth/fetch-user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body:JSON.stringify({email:id})
            });

            if (!response.ok) {
                // Handle non-successful response (e.g., 404 or 500)
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const sellerData = await response.json(); // Parse JSON data from the response

            return sellerData
            
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    const editUser = async (data) => {
        try {
            const response = await axios.put(`${host}/auth/update-profile`,{
                name:data.name,
                phoneNo:data.phoneNo,
            },config)

            if (!response.ok) {
                // Handle non-successful response (e.g., 404 or 500)
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const updatedData = await response.json();

            setUserData(updatedData)
            
        } catch (error) {
            
        }

        
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, userData, getUserData, setUserData,getSellerData,editUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState