import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart/');
            setCart(response.data[0]); 
        } catch (error) {
            console.error("Failed to fetch cart", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleCheckout = async () => {
        try {
            await api.post('/checkout/');
            alert("Checkout berhasil!");
            navigate('/orders');
        } catch (error) {
            console.error("Checkout failed", error);
            alert("Checkout gagal.");
        }
    };

    if (loading) return <p>Loading keranjang...</p>;
    if (!cart || cart.items.length === 0) return <p>Keranjang Anda kosong.</p>;

    return (
        <div>
            <h2>Keranjang Belanja</h2>
            {cart.items.map(item => (
                <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
                    <h4>{item.product.name}</h4>
                    <p>Jumlah: {item.quantity}</p>
                    <p>Harga: Rp {item.product.price}</p>
                </div>
            ))}
            <button onClick={handleCheckout} style={{ marginTop: '20px' }}>
                Checkout
            </button>
        </div>
    );
}

export default Cart;