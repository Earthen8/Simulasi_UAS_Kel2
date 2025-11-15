import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { 
    ShoppingBag, Box, Package, MapPin, Phone, CreditCard, Calendar, ScrollText, Truck, User, XCircle
    } from 'lucide-react';

function OrderDetailModal({ order, onClose }) {
    if (!order) return null;

    const subtotal = order.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    const totalWithShipping = subtotal + parseFloat(order.shipping_cost);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1170&auto=format&fit=crop')",
                }}
            ></div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>

            <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in-up border border-slate-200/50">
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full p-2 transition-all duration-200 hover:rotate-90"
                >
                    <XCircle className="w-6 h-6" />
                </button>
                
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/30">
                            <ScrollText className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                Detail Pesanan
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">Order #{order.id}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Ringkasan Pesanan */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-6 border border-slate-200/60 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
                            Informasi Umum
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 group">
                                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                                    <Calendar className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Tanggal Pesanan</p>
                                    <p className="text-slate-800 font-semibold">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                                    <CreditCard className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Metode Pembayaran</p>
                                    <p className="text-slate-800 font-semibold">{order.payment_method}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                                    <Truck className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Pengiriman</p>
                                    <p className="text-slate-800 font-semibold">{order.shipping_option}</p>
                                    <p className="text-xs text-slate-600">Rp {parseFloat(order.shipping_cost).toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-200">
                                <div className="flex items-center justify-between bg-emerald-500 text-white rounded-xl p-4 shadow-lg shadow-emerald-500/20">
                                    <div className="flex items-center gap-2">
                                        <ShoppingBag className="w-5 h-5" />
                                        <span className="font-semibold">Total Pesanan</span>
                                    </div>
                                    <span className="text-xl font-bold">Rp {totalWithShipping.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alamat Pengiriman */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100/50 rounded-2xl p-6 border border-blue-200/60 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                            Alamat Pengiriman
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 group">
                                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Nama Penerima</p>
                                    <p className="text-slate-800 font-semibold">{order.full_name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                                    <Phone className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Nomor Telepon</p>
                                    <p className="text-slate-800 font-semibold">{order.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 group">
                                <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                                    <MapPin className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Alamat Lengkap</p>
                                    <p className="text-slate-800 font-semibold leading-relaxed">{order.address}, {order.city}, {order.postal_code}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daftar Produk dalam Pesanan */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
                        Produk Dipesan
                    </h3>
                    <div className="space-y-3">
                        {order.items.map(item => (
                            <div key={item.id} className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                                <div className="relative overflow-hidden rounded-xl ring-2 ring-slate-100 group-hover:ring-emerald-200 transition-all">
                                    <img 
                                        src={item.product.image ? item.product.image : '/placeholder-product.png'} 
                                        alt={item.product.name}
                                        className="w-20 h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">{item.product.name}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                                            Rp {parseFloat(item.price).toLocaleString('id-ID')}
                                        </span>
                                        <span className="text-slate-400">×</span>
                                        <span className="text-sm font-semibold text-slate-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                            {item.quantity}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500 mb-1">Subtotal</p>
                                    <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                        Rp {(parseFloat(item.price) * item.quantity).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
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