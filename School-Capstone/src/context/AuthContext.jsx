import { createContext, useState } from "react";

export const AuthContext = createContext();

import React from 'react'

export const AuthContextProvider = ({ children }) => {

    const [userInfo, setUserInfo] = useState({})
    /*  HR OR EMP */
    const [userType, setUserType] = useState("HR")
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    return (
        <AuthContext.Provider value={{
            userInfo, setUserInfo,
            userType, setUserType,
            isLoggedIn, setIsLoggedIn,
        }}>
            {children}
        </AuthContext.Provider>
    )
}


