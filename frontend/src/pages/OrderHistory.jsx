import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ShoppingBag, Box, Package, MapPin, Phone, CreditCard, Calendar, ScrollText } from 'lucide-react';

function OrderDetailModal({ order, onClose }) {
    if (!order) return null;

    const subtotal = order.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    const totalWithShipping = subtotal + parseFloat(order.shipping_cost);

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in-up">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <XCircle className="w-7 h-7" />
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <ScrollText className="w-8 h-8 text-emerald-600" />
                    Detail Pesanan #{order.id}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Ringkasan Pesanan */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Informasi Umum</h3>
                        <p className="flex items-center gap-2 text-gray-700 mb-2"><Calendar className="w-5 h-5 text-emerald-500" /> Tanggal: {new Date(order.created_at).toLocaleDateString()}</p>
                        <p className="flex items-center gap-2 text-gray-700 mb-2"><CreditCard className="w-5 h-5 text-emerald-500" /> Pembayaran: {order.payment_method}</p>
                        <p className="flex items-center gap-2 text-gray-700 mb-2"><Truck className="w-5 h-5 text-emerald-500" /> Pengiriman: {order.shipping_option} (Rp {parseFloat(order.shipping_cost).toLocaleString('id-ID')})</p>
                        <p className="flex items-center gap-2 text-gray-700 mb-2"><ShoppingBag className="w-5 h-5 text-emerald-500" /> Total Pesanan: <span className="font-bold text-emerald-700">Rp {totalWithShipping.toLocaleString('id-ID')}</span></p>
                    </div>

                    {/* Alamat Pengiriman */}
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Alamat Pengiriman</h3>
                        <p className="flex items-center gap-2 text-gray-700 mb-2"><User className="w-5 h-5 text-emerald-500" /> {order.full_name}</p>
                        <p className="flex items-center gap-2 text-gray-700 mb-2"><Phone className="w-5 h-5 text-emerald-500" /> {order.phone}</p>
                        <p className="flex items-center gap-2 text-gray-700 mb-2"><MapPin className="w-5 h-5 text-emerald-500" /> {order.address}, {order.city}, {order.postal_code}</p>
                    </div>
                </div>

                {/* Daftar Produk dalam Pesanan */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Produk Dipesan</h3>
                <div className="space-y-4">
                    {order.items.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                            <img 
                                src={item.product.image ? item.product.image : '/placeholder-product.png'} 
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-grow">
                                <p className="font-semibold text-gray-900">{item.product.name}</p>
                                <p className="text-sm text-gray-600">Rp {parseFloat(item.price).toLocaleString('id-ID')} x {item.quantity}</p>
                            </div>
                            <span className="font-bold text-emerald-600">Rp {(parseFloat(item.price) * item.quantity).toLocaleString('id-ID')}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null); 

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders/');
                setOrders(response.data);
            } catch (error) {
                console.error("Gagal mengambil riwayat pesanan", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return <p className="text-center py-20 text-xl text-gray-600">Memuat riwayat pesanan Anda...</p>;
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-20 container mx-auto px-4">
                <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Belum Ada Pesanan</h2>
                <p className="text-gray-500 text-lg mb-8">
                    Mulai jelajahi produk kami dan buat pesanan pertama Anda!
                </p>
                <Link 
                    to="/" 
                    className="bg-emerald-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors"
                >
                    Mulai Belanja
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Riwayat Pesanan Anda</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map(order => (
                    <div 
                        key={order.id} 
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between transform transition-transform duration-300 hover:scale-103 hover:shadow-2xl cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Box className="w-6 h-6 text-emerald-600" />
                                    Pesanan #{order.id}
                                </h2>
                                <span className="text-sm font-medium text-gray-500">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">{order.items.length} produk</span>
                            </p>
                            <p className="text-lg font-bold text-emerald-700 mb-4">
                                Total: Rp {parseFloat(order.total_price).toLocaleString('id-ID')}
                            </p>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Truck className="w-4 h-4 text-emerald-500" />
                                <span className="font-medium">{order.shipping_option}</span>
                            </div>
                        </div>
                        
                        <button 
                            className="mt-6 self-start text-emerald-600 font-semibold hover:text-emerald-800 transition-colors"
                        >
                            Lihat Detail
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal Detail Pesanan */}
            <OrderDetailModal 
                order={selectedOrder} 
                onClose={() => setSelectedOrder(null)} 
            />
        </div>
    );
}

export default OrderHistory;