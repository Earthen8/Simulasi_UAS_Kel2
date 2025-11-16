import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import VideoBackground from '../components/VideoBackground';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react'; 

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Password tidak cocok!', { duration: 3000 });
            return;
        }

        const registerPromise = api.post('/register/', {
            username: username,
            email: email,
            password: password,
        });

        toast.promise(
            registerPromise,
            {
                loading: 'Mendaftar...',
                success: (data) => {
                    navigate('/login'); 
                    return 'Registrasi berhasil! Silakan login.';
                },
                error: (err) => {
                    const errorData = err.response?.data;
                    let errorMessage = 'Registrasi gagal.';
                    if (errorData) {
                        errorMessage = Object.values(errorData).flat().join(' ');
                    }
                    return errorMessage;
                },
            }
        );
    };

    return (
        <VideoBackground videoSrc="/videos/jungle.mp4">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md animate-fade-in-up">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">REGISTER</h1>
                
                <form onSubmit={handleSubmit}>
                    {/* --- Input Username --- */}
                    <div className="mb-6">
                        <label htmlFor="username" className="sr-only">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    {/* --- Input Email --- */}
                    <div className="mb-6">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* --- Input Password 1 (dengan ikon) --- */}
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-emerald-600"
                        >
                            {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* --- Input Password 2 (dengan ikon) --- */}
                    <div className="mb-8 relative">
                        <label htmlFor="password2" className="sr-only">Konfirmasi Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password2"
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                            placeholder="Konfirmasi Password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-emerald-600"
                        >
                            {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                        </button>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-xl hover:bg-emerald-700 transition-all duration-300 shadow-md"
                    >
                        REGISTER
                    </button>
                </form>
                
                <p className="text-center text-gray-600 mt-8 text-md">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors">
                        Login
                    </Link>
                </p>
            </div>
        </VideoBackground>
    );
}

export default Register;