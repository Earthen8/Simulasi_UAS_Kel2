import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                {/* Rute Publik */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                
                {/* Rute Terlindungi */}
                <Route 
                    path="/cart" 
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/orders" 
                    element={
                        <ProtectedRoute>
                            <OrderHistory />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </>
    );
}

export default App;