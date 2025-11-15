import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api'; 
import { ArrowRightIcon } from '@heroicons/react/24/outline';

function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="w-full h-48 bg-neutral-gray flex items-center justify-center">
                <span className="text-gray-400">Image</span> 
            </div>
            
            <div className="p-4">
                <h3 className="text-lg font-bold text-neutral-charcoal mb-1 truncate">{product.name}</h3>
                <p className="text-primary font-semibold text-base mb-3">Rp {product.price}</p>
                <Link 
                    to={`/products/${product.id}`}
                    className="w-full block text-center bg-primary-dark text-white py-2 rounded-lg font-semibold hover:bg-primary transition-colors"
                >
                    Lihat Detail
                </Link>
            </div>
        </div>
    );
}

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products/?limit=4'); 
                setProducts(response.data);
            } catch (error) {
                console.error("Gagal mengambil produk:", error);
            }
        };
        fetchProducts();
    }, []);

    const categories = [
        { name: 'Kategori 1', color: 'bg-secondary-sand' },
        { name: 'Kategori 2', color: 'bg-secondary-clay' },
        { name: 'Kategori 3', color: 'bg-secondary-sand' },
        { name: 'Kategori 4', color: 'bg-secondary-clay' },
    ];

    return (
        <div className="bg-neutral-gray min-h-screen">
            
            {/* 1. Hero Banner */}
            <section className="bg-secondary-sand text-neutral-charcoal">
                <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
                        Selamat Datang di Toko Kami
                    </h1>
                    <p className="text-lg mb-8 max-w-2xl">
                        Promo spesial untuk produk ramah lingkungan.
                    </p>
                    <button className="bg-primary text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-colors flex items-center">
                        Lihat Promo <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </button>
                </div>
            </section>

            {/* 2. Kategori */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-neutral-charcoal mb-8">Kategori</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <div 
                            key={cat.name} 
                            className={`p-8 rounded-lg text-center cursor-pointer transition-transform duration-300 hover:scale-105 ${cat.color}`}
                        >
                            <h3 className="font-bold text-xl text-primary-dark">{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Produk Populer */}
            <section className="container mx-auto px-4 pb-16">
                <h2 className="text-3xl font-bold text-neutral-charcoal mb-8">Produk Populer</h2>
                
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p>Memuat produk...</p>
                )}
            </section>

        </div>
    );
}

export default Home;