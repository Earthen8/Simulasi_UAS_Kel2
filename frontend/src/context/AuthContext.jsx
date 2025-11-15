import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null
    );
    
    const [user, setUser] = useState(() => 
        localStorage.getItem('username') 
            ? localStorage.getItem('username') 
            : null
    );

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        try {
            const response = await api.post('/token/', {
                username,
                password
            });
            
            const data = response.data;
            setAuthTokens(data);
            
            setUser(username);
            localStorage.setItem('authTokens', JSON.stringify(data));
            localStorage.setItem('username', username);
            
            navigate('/');
            return { success: true };

        } catch (error) {
            return { success: false, error: error.response?.data };
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('username');
        navigate('/login');
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;