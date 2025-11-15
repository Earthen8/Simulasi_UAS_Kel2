import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fungsi untuk mengambil data keranjang
    const fetchCart = async () => {
        try {
            const response = await api.get('/cart/');
            setCart(response.data[0]); 
        } catch (error) {
            console.error("Gagal mengambil keranjang", error);
        } finally {
            setLoading(false);
        }
    };

    // Ambil keranjang saat komponen dimuat
    useEffect(() => {
        fetchCart();
    }, []);

    // Fungsi untuk mengubah kuantitas (PATCH request)
    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Kuantitas minimal 1
        
        try {
            await api.patch(`/cart-items/${itemId}/`, { quantity: newQuantity });
            fetchCart(); // Muat ulang data keranjang
        } catch (error) {
            console.error("Gagal update kuantitas", error);
        }
    };

    // Fungsi untuk menghapus item (DELETE request)
    const handleDeleteItem = async (itemId) => {
        if (!window.confirm("Yakin ingin menghapus item ini dari keranjang?")) return;
        
        try {
            await api.delete(`/cart-items/${itemId}/`);
            fetchCart(); // Muat ulang data keranjang
        } catch (error) {
            console.error("Gagal menghapus item", error);
        }
    };

    // Fungsi untuk checkout
    const handleCheckout = async () => {
        try {
            await api.post('/checkout/');
            alert("Checkout berhasil!");
            navigate('/orders');
        } catch (error) {
            console.error("Checkout gagal", error.response?.data);
            alert("Checkout gagal. Pastikan keranjang tidak kosong.");
        }
    };

    // Hitung total harga keranjang
    const cartTotal = cart ? cart.items.reduce((acc, item) => {
        return acc + (parseFloat(item.product.price) * item.quantity);
    }, 0) : 0;


    // === Tampilan Loading dan Keranjang Kosong ===
    if (loading) return <p className="text-center py-20">Loading keranjang...</p>;

    if (!cart || cart.items.length === 0) {
        return (
            <div className="text-center py-20 container mx-auto px-4">
                <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Keranjang Anda Kosong</h2>
                <p className="text-gray-500 text-lg mb-8">
                    Sepertinya Anda belum menambahkan produk apapun.
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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Keranjang Belanja Anda</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Daftar Item Keranjang */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.items.map(item => (
                        <div key={item.id} className="flex flex-col md:flex-row items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100 gap-6">
                            <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                                <img 
                                    src={item.product.image ? item.product.image : ''} 
                                    alt={item.product.name}
                                    className="w-32 h-32 object-cover rounded-lg bg-gray-100" 
                                />
                            </Link>
                            
                            <div className="flex-grow w-full">
                                <Link to={`/products/${item.product.id}`}>
                                    <h3 className="text-xl font-bold text-gray-800 hover:text-emerald-600 transition-colors">
                                        {item.product.name}
                                    </h3>
                                </Link>
                                <p className="text-lg font-semibold text-emerald-600 mt-1">
                                    Rp {parseFloat(item.product.price).toLocaleString('id-ID')}
                                </p>
                            </div>
                            
                            <div className="flex-shrink-0 w-full md:w-auto flex flex-col md:items-end gap-4">
                                {/* Tombol Kuantitas */}
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button 
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                        className="p-3 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-5 py-2 text-md font-bold text-gray-900">
                                        {item.quantity}
                                    </span>
                                    <button 
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                        className="p-3 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                {/* Tombol Hapus */}
                                <button 
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
                                >
                                    <Trash2 className="w-4 h-4" /> Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ringkasan Checkout */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ringkasan Belanja</h2>
                        
                        <div className="flex justify-between items-center mb-4 text-lg">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-semibold text-gray-800">
                                Rp {cartTotal.toLocaleString('id-ID')}
                            </span>
                        </div>
                        
                        <div className="border-t border-gray-200 my-4"></div>
                        
                        <div className="flex justify-between items-center mb-6 text-2xl font-bold">
                            <span className="text-gray-900">Total</span>
                            <span className="text-emerald-600">
                                Rp {cartTotal.toLocaleString('id-ID')}
                            </span>
                        </div>

                        <Link 
                            to="/checkout"
                            className="block w-full text-center bg-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg"
                        >
                            Lanjut ke Checkout
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Cart;