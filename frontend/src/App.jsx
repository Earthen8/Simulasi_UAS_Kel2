import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectIfLoggedIn from './components/RedirectIfLoggedIn';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import Checkout from './pages/Checkout';
import './index.css'

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                {/* Rute Publik */}
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<ProductDetail />} />

                <Route 
                    path="/login" 
                    element={
                        <RedirectIfLoggedIn>
                            <Login />
                        </RedirectIfLoggedIn>
                    } 
                />
                <Route 
                    path="/register" 
                    element={
                        <RedirectIfLoggedIn>
                            <Register />
                        </RedirectIfLoggedIn>
                    } 
                />
                
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
                <Route 
                    path="/checkout" 
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </>
    );
}

export default App;