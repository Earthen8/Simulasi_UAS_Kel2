import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ShoppingCart, User, Menu, Leaf } from 'lucide-react';

function Navbar() {
    const { user, logoutUser, cartCount, fetchCartCount } = useContext(AuthContext);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cartItemCount = cartCount || 0;
    
    useEffect(() => {
        if (user) {
            fetchCartCount();
        }
    }, [user]);

    return (
        <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Bagian Kiri: Logo & Tombol Mobile */}
                    <div className="flex items-center gap-8">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <Link to="/" className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                            <Leaf className="w-7 h-7" />
                            GraStore
                        </Link>
                    </div>
                    
                    {/* Bagian Tengah: Link Navigasi (Desktop) */}
                    <div className="hidden md:flex items-center gap-6 text-sm">
                        <Link to="/" className="hover:text-emerald-400 transition-colors font-medium">Home</Link>
                        <Link to="/orders" className="hover:text-emerald-400 transition-colors font-medium">Pesanan Saya</Link>
                        
                        {/* Tampilkan link jika user BELUM login */}
                        {!user && (
                            <>
                                <Link to="/login" className="hover:text-emerald-400 transition-colors font-medium">Login</Link>
                                <Link to="/register" className="hover:text-emerald-400 transition-colors font-medium">Register</Link>
                            </>
                        )}
                    </div>
                    
                    {/* Bagian Kanan: Ikon Keranjang & User */}
                    <div className="flex items-center gap-4">
                        <Link to="/cart" className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                                {cartItemCount}
                            </span>
                        </Link>
                        
                        {user ? (
                            <div className="flex items-center gap-2">
                                <span className="hidden sm:inline text-sm">Halo, {user.username}</span>
                                <User className="w-5 h-5" />
                                <button 
                                    onClick={logoutUser} 
                                    className="ml-4 bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                <User className="w-5 h-5" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;