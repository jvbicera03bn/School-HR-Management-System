import { createContext, useState, useEffect } from "react";

export const empDataContext = createContext();

export const AuthContextProvider = ({ children }) => {
    useEffect(() => {
        

    });
    return (
        <empDataContext.Provider value={{
                
        }}>
            {children}
        </empDataContext.Provider>
    )
}