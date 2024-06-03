import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem('loggedIn');
        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        sessionStorage.setItem('loggedIn', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('loggedIn');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
