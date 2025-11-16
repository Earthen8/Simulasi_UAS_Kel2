import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

    const AuthContext = createContext();

    const [user, setUser] = useState(() => 
        localStorage.getItem('authTokens')
            ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access)
            : null
    );

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
    
    const [cartCount, setCartCount] = useState(0);

    const navigate = useNavigate();

    const fetchCartCount = async () => {
        if (localStorage.getItem('authTokens')) {
            try {
                const response = await api.get('/cart/');
                if (response.data && response.data.length > 0) {
                    setCartCount(response.data[0].items.length);
                } else {
                    setCartCount(0);
                }
            } catch (error) {
                console.error("Gagal mengambil keranjang:", error);
                setCartCount(0);
            }
        }
    };    

    const clearCartCount = () => {
        setCartCount(0);
    };

    const loginUser = async (email, password) => {
        try {
            const response = await api.post('/token/', {
                username: email,
                password: password
            });
            
            const data = response.data;
            setAuthTokens(data);
            
            const decodedUser = jwtDecode(data.access);
            setUser(decodedUser); 
            localStorage.setItem('authTokens', JSON.stringify(data));
            
            await fetchCartCount();
            navigate('/');
            return { success: true };

        } catch (error) {
            return { success: false, error: error.response?.data };
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        clearCartCount();
        localStorage.removeItem('authTokens'); // <-- Hapus 'username' dari localStorage
        navigate('/login');
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
        cartCount,     
        fetchCartCount,
        clearCartCount,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;