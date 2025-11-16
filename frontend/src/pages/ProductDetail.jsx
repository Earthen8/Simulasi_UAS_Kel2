import React, { useState, useEffect, useContext } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Package, Plus, Minus, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { user, fetchCartCount } = useContext(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error("Gagal mengambil produk", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleQuantity = (amount) => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + amount;
            return newQuantity < 1 ? 1 : newQuantity;
        });
    };

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        const addToCartPromise = api.post('/cart-items/', {
            product_id: product.id,
            quantity: quantity
        });

        toast.promise(
            addToCartPromise,
            {
                loading: 'Menambahkan ke keranjang...',
                success: async (data) => {
                    await fetchCartCount();
                    return `${quantity} ${product.name} berhasil ditambahkan!`;
                },
                error: (err) => {
                    console.error("Gagal menambah ke keranjang", err.response?.data);
                    return 'Gagal menambah ke keranjang.';
                }
            }
        );
    };

    if (!product) {
        return <p className="text-center py-20">Loading...</p>;
    }

    const price = parseFloat(product.price);
    const totalPrice = (price * quantity).toLocaleString('id-ID');

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                
                {/* Kolom Gambar */}
                <div className="bg-gray-100 rounded-2xl flex items-center justify-center aspect-square overflow-hidden shadow-lg">
                    {product.image ? (
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <Package className="w-32 h-32 text-gray-300" />
                    )}
                </div>

                {/* Kolom Info Produk */}
                <div className="flex flex-col h-full pt-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-gray-600 text-lg mb-6">{product.description}</p>
                    
                    <div className="mt-auto">
                        {/* Tombol Kuantitas */}
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-lg font-medium text-gray-700">Kuantitas:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button 
                                    onClick={() => handleQuantity(-1)}
                                    className="p-3 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="px-6 py-2 text-lg font-bold text-gray-900">
                                    {quantity}
                                </span>
                                <button 
                                    onClick={() => handleQuantity(1)}
                                    className="p-3 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Total Harga Live */}
                        <div className="text-3xl font-bold text-emerald-600 mb-6">
                            Total: Rp {totalPrice}
                        </div>

                        {/* Tombol Add to Cart */}
                        <button 
                            onClick={handleAddToCart}
                            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg"
                        >
                            Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;