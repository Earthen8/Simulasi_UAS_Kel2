import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        try {
            await api.post('/cart-items/', {
                product_id: product.id,
                quantity: 1
            });
            alert("Produk ditambahkan ke keranjang!");
        } catch (error) {
            console.error("Failed to add to cart", error.response?.data);
            alert("Gagal menambah ke keranjang. Mungkin produk sudah ada di keranjang Anda.");
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h3>Rp {product.price}</h3>
            <button onClick={handleAddToCart}>Tambah ke Keranjang</button>
        </div>
    );
}

export default ProductDetail;