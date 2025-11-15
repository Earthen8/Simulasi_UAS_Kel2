import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Package } from 'lucide-react';
import { toast } from 'react-hot-toast';


const FormInput = ({ label, id, ...props }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input 
            id={id}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            {...props}
        />
    </div>
);

// Pilihan ongkir
const shippingOptions = [
    { id: 'jabodetabek', name: 'Jabodetabek', price: 10000 },
    { id: 'luar_jawa', name: 'Luar Jabodetabek (Pulau Jawa)', price: 15000 },
    { id: 'sumatera_bali', name: 'Sumatera, Bali', price: 30000 },
    { id: 'sulawesi_kalimantan', name: 'Sulawesi, Kalimantan', price: 50000 },
    { id: 'papua', name: 'Papua dan sekitarnya', price: 100000 },
];

function Checkout() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        address: '',
        city: '',
        postal_code: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('Transfer Bank');
    const [shippingOption, setShippingOption] = useState(shippingOptions[0].id); // Default ke Jabodetabek
    
    const navigate = useNavigate();

    // 1. Ambil data keranjang untuk ringkasan
    useEffect(() => {
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
        fetchCart();
    }, []);

    // 2. Handle perubahan input form
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // 3. Kalkulasi
    const selectedShippingCost = shippingOptions.find(opt => opt.id === shippingOption)?.price || 0;
    
    const subtotal = cart ? cart.items.reduce((acc, item) => {
        return acc + (parseFloat(item.product.price) * item.quantity);
    }, 0) : 0;
    
    const total = subtotal + selectedShippingCost;

    // 4. Handle Submit "Bayar"
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const orderData = {
            ...formData,
            payment_method: paymentMethod,
            shipping_option: shippingOptions.find(opt => opt.id === shippingOption).name,
            shipping_cost: selectedShippingCost
        };

        const checkoutPromise = api.post('/checkout/', orderData);

        toast.promise(
          checkoutPromise,
          {
            loading: 'Memproses pesanan Anda...',
            
            success: (response) => {
              setTimeout(() => {
                navigate('/orders'); 
              }, 1000); 
              
              return 'Pesanan berhasil dibuat!'; 
            },
            
            error: 'Checkout gagal. Silakan coba lagi.',
          },
          {
            style: {
              minWidth: '300px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              padding: '16px 20px',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: '600',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              backdropFilter: 'blur(10px)',
            },
            loading: {
              duration: Infinity,
              icon: '⏳',
              style: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
              }
            },
            success: {
              duration: 3000,
              icon: '🎉',
              style: {
                background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
                color: '#fff',
                boxShadow: '0 10px 40px rgba(0, 176, 155, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              }
            },
            error: {
              duration: 4000,
              icon: '❌',
              style: {
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: '#fff',
                boxShadow: '0 10px 40px rgba(245, 87, 108, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              }
            }
          }
        );
      };


    if (loading) return <p className="text-center py-20">Loading...</p>;
    if (!cart || cart.items.length === 0) {
        return <p className="text-center py-20">Keranjang Anda kosong.</p>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Kolom Kiri: Form */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Alamat Pengiriman */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Alamat Pengiriman</h2>
                        <FormInput label="Nama Penerima" id="full_name" value={formData.full_name} onChange={handleFormChange} required />
                        <FormInput label="No. Telepon" id="phone" type="tel" value={formData.phone} onChange={handleFormChange} required />
                        <FormInput label="Alamat Lengkap" id="address" value={formData.address} onChange={handleFormChange} required />
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput label="Kota" id="city" value={formData.city} onChange={handleFormChange} required />
                            <FormInput label="Kode Pos" id="postal_code" value={formData.postal_code} onChange={handleFormChange} required />
                        </div>
                    </div>

                    {/* Destinasi Pengiriman (Ongkir) */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Destinasi Pengiriman</h2>
                        <select 
                            value={shippingOption} 
                            onChange={(e) => setShippingOption(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                        >
                            {shippingOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.name} - Rp {opt.price.toLocaleString('id-ID')}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Metode Pembayaran */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Metode Pembayaran</h2>
                        <div className="space-y-4">
                            {['Transfer Bank', 'E-Wallet', 'COD'].map(method => (
                                <label key={method} className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-emerald-50">
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value={method}
                                        checked={paymentMethod === method}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="form-radio text-emerald-600 focus:ring-emerald-500"
                                    />
                                    <span className="ml-4 text-lg font-medium text-gray-700">{method}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Kolom Kanan: Ringkasan */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>
                        
                        <div className="space-y-4 mb-4 border-b border-gray-200 pb-4">
                            {cart.items.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-gray-600">
                                    <span>{item.product.name} (x{item.quantity})</span>
                                    <span className="font-medium">Rp {(parseFloat(item.product.price) * item.quantity).toLocaleString('id-ID')}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-lg">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold text-gray-800">Rp {subtotal.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="text-gray-600">Ongkir</span>
                                <span className="font-semibold text-gray-800">Rp {selectedShippingCost.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 my-4"></div>

                        <div className="flex justify-between items-center mb-6 text-2xl font-bold">
                            <span className="text-gray-900">Total</span>
                            <span className="text-emerald-600">Rp {total.toLocaleString('id-ID')}</span>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg"
                        >
                            Bayar Sekarang
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
  };
  
  export default Checkout;