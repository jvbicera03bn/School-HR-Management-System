import React from 'react'
import { createContext, useState, useEffect } from "react";
import axios from "axios"
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const baseUrl = "http://localhost:5000/api"
    const [cookies, setCookie, removeCookie] = useCookies(['jwtToken'])
    /* const jwtCookie = new Cookies() */
    const [userInfo, setUserInfo] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(cookies.jwtToken ? true : false)
    function logIn(email, password) {
        axios.post(`${baseUrl}/user/login`, {
            email: email,
            password: password
        }).then((response) => {
            setCookie("jwtToken", response.data.token, {
                path: '/',
                expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
            })
            /* Get Me */
        }).catch((err) => {
            return err.response
        })
    }
    function logOut() {
        removeCookie("jwtToken",{path:"/"})
        setUserInfo(null)
        setIsLoggedIn(false)
        return (
            <Navigate to="/login" />
        )
    }
    function register(credentials) {

    }
    useEffect(() => {
        axios.get(`${baseUrl}/user/getme`, {
            headers: {
                "Authorization": `Bearer ${cookies.jwtToken}`
            }
        }).then((response) => {
            if (!userInfo) {
                setUserInfo(response.data)
                setIsLoggedIn(true)
            }
        })
    }, [cookies]);
    return (
        <AuthContext.Provider value={{
            baseUrl, logIn,
            userInfo, logOut,
            isLoggedIn, setIsLoggedIn, cookies
        }}>
            {children}
        </AuthContext.Provider>
    )
}


