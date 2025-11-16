import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import api from '../services/api';  
import { ArrowRight, Sparkles, Leaf, Package } from 'lucide-react';

function ProductCard({ product }) {
    const price = parseFloat(product.price); 

    return (
        <div className="group bg-white rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100">
            
            <div className="relative w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                {product.image ? (
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover" 
                />
                ) : (
                    <Package className="w-16 h-16 text-gray-300" />
                )}
                <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    New
                </div>
            </div>
            {/* ------------------------------------------- */}
            
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-emerald-600 transition-colors">
                    {product.name}
                </h3>
                <p className="text-emerald-600 font-bold text-xl mb-4">
                    Rp {price.toLocaleString('id-ID')} 
                </p>
                
                <Link 
                    to={`/products/${product.id}`}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}

function Home() {
    const [products, setProducts] = useState([]); 

    const categories = [
        { name: 'Eco Essentials', icon: '🌱', color: 'from-emerald-400 to-emerald-600' },
        { name: 'Sustainable Living', icon: '♻️', color: 'from-amber-400 to-amber-600' },
        { name: 'Natural Care', icon: '🍃', color: 'from-green-400 to-green-600' },
        { name: 'Green Home', icon: '🏡', color: 'from-teal-400 to-teal-600' },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products/');
                setProducts(response.data);
            } catch (error) {
                console.error("Gagal mengambil produk:", error);
            }
        };
        fetchProducts();
    }, []); 

    return (
        <div className="bg-gray-50 min-h-screen font-sans">

            {/* Hero Banner */}
            <section className="relative bg-gradient-to-br from-amber-50 via-emerald-50 to-teal-50 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
                </div>
                
                <div className="container mx-auto px-4 py-32 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-lg">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-semibold text-gray-700">Best Offer!</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Welcome to
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                Sustainable Living
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Discover eco-friendly products that make a difference. 
                            Special promotions on sustainable goods.
                        </p>
                        
                        <a href="#our-products" className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-10 rounded-2xl font-bold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 inline-flex items-center gap-3 mx-auto shadow-xl hover:shadow-2xl hover:scale-105 transform">
                            Explore Deals
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Products Categories</h2>
                    <p className="text-gray-600 text-lg">Find products that match your sustainable lifestyle</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <div 
                            key={index} 
                            className="group relative bg-white p-8 rounded-3xl text-center cursor-pointer transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                            
                            <div className="relative z-10">
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {cat.icon}
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors">
                                    {cat.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Products */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <section id="our-products" className='bg-white-py-20'>
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-3">Our Products</h2>
                                <p className="text-gray-600 text-lg">The best choices for you</p>
                            </div>
                        </section>
                    </div>
                    
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">
                                Memuat produk... (Pastikan backend Django berjalan & ada produk di admin)
                            </p>
                        </div>
                    )}
                    {/* ------------------------------------------- */}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <Leaf className="w-12 h-12 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-3xl font-bold mb-4">Join the Green Movement</h3>
                    <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto">
                        Created by Earthen, Hafizh, and Gracello
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Home;