import React, { useState } from 'react'
import AuthContext from './AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthState = (props) => {
    const host = "http://127.0.0.1:5000"
    const [userData, setUserData] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    const getUserData = async (id) => {
        if (id === null) {
            setUserData(null);
            return; // Exit the function early
        }

        try {
            const response = await axios.get(`${host}/auth/find-user`,config);

            // if (!response.ok) {
            //     // Handle non-successful response (e.g., 404 or 500)
            //     throw new Error(`Request failed with status: ${response.status}`);
            // }

            const dataUser = await response.data // Parse JSON data from the response

            setUserData(dataUser); // Set the parsed data to state
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error("Error fetching user data")
            // Handle the error (e.g., show an error message to the user)
        }
    };

    const getOtherUserData = async (id) => {
        if (id === null) {
            // setUserData(null);
            return; // Exit the function early
        }

        try {
            const response = await axios.get(`${host}/auth/fetch-user/${id}`,config);

            // if (!response.ok) {
            //     // Handle non-successful response (e.g., 404 or 500)
            //     throw new Error(`Request failed with status: ${response.status}`);
            // }

            const otherUserData = response; // Parse JSON data from the response

            return otherUserData
            
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle the error (e.g., show an error message to the user)
        }
    };

    const editUser = async (data) => {
        try {
            const response = await axios.put(`${host}/auth/update-profile`,data,config)

            // if (!response.ok) {
            //     // Handle non-successful response (e.g., 404 or 500)
            //     throw new Error(`Request failed with status: ${response.status}`);
            // }

            const updatedData = await response.json();

            setUserData(updatedData)
            
        } catch (error) {
            
        }

        
    }

    return (
        <AuthContext.Provider value={{ 
            user,
            setUser, 
            isAuthenticated, 
            setIsAuthenticated, 
            userData, 
            getUserData, 
            setUserData,
            getOtherUserData,
            editUser 
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState