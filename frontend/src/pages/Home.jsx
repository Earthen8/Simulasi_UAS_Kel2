import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products/');
                setProducts(response.data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Produk Kami</h1>
            <div className="product-list">
                {products.length === 0 ? (
                    <p>Belum ada produk. (Jalankan 'python manage.py runserver' dan tambahkan produk di /admin/)</p>
                ) : (
                    products.map(product => (
                        <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
                            <h2>{product.name}</h2>
                            <p>Rp {product.price}</p>
                            <Link to={`/products/${product.id}`}>
                                Lihat Detail
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;