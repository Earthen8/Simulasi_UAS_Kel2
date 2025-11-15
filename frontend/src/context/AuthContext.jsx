import React, { createContext, useState, useEffect, useCallback } from 'react';
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
    const [cart, setCart] = useState(null);

    const navigate = useNavigate();

    const fetchCart = useCallback(async () => {
        if (!authTokens) {
            setCart(null);
            return;
        }
        try {
            const response = await api.get('/cart/');
            // The API returns an array, we take the first object
            setCart(response.data[0] || { items: [] }); 
        } catch (error) {
            console.error("Failed to fetch cart from context", error);
            setCart(null);
        }
    }, [authTokens]);

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
        setCart(null); // Clear cart on logout
        navigate('/login');
    };

    // Fetch cart when user is authenticated
    useEffect(() => {
        if (user) {
            fetchCart();
        }
    }, [user, fetchCart]);

    const contextData = {
        user,
        authTokens,
        cart,
        fetchCart, // Expose fetchCart to be used by other components
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