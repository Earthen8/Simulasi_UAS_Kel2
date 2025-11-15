import React, { useState, useEffect } from 'react';
import api from '../services/api';

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders/');
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <p>Loading riwayat pesanan...</p>;
    if (orders.length === 0) return <p>Anda belum memiliki pesanan.</p>;

    return (
        <div>
            <h2>Riwayat Pesanan Saya</h2>
            {orders.map(order => (
                <div key={order.id} style={{ border: '1px solid #ccc', padding: '15px', margin: '15px' }}>
                    <h4>Pesanan #{order.id} - Total: Rp {order.total_price}</h4>
                    <small>Tanggal: {new Date(order.created_at).toLocaleString()}</small>
                    <ul>
                        {order.items.map(item => (
                            <li key={item.id}>
                                {item.product.name} (Jumlah: {item.quantity})
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default OrderHistory;