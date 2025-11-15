// frontend/src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'; // Install: npm install @heroicons/react

function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <nav className="bg-white text-neutral-charcoal shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary-dark tracking-wide">
                    LOGO
                </Link>

                {/* Ikon Navigasi */}
                <div className="flex items-center space-x-5">
                    <Link to="/cart" className="relative text-neutral-charcoal hover:text-primary transition-colors">
                        <ShoppingCartIcon className="h-7 w-7" />
                        {/* (Logika untuk 'cart count' bisa ditambahkan di sini) */}
                    </Link>
                    
                    {user ? (
                        <div className="flex items-center space-x-3">
                            <span className="hidden sm:inline">Halo, {user.username}!</span>
                            <UserIcon className="h-7 w-7 text-neutral-charcoal" />
                            <button 
                                onClick={logoutUser} 
                                className="bg-primary-dark text-white text-sm py-2 px-4 rounded-md hover:bg-primary transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link 
                                to="/login" 
                                className="text-sm font-medium py-2 px-4 rounded-md hover:bg-neutral-gray transition-colors"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;