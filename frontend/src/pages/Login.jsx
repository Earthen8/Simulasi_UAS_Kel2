import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import VideoBackground from '../components/VideoBackground';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react'; 

function Login() {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const { loginUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginPromise = loginUser(username, password);
        
        toast.promise(
            loginPromise,
            {
                loading: 'Logging in...',
                success: (data) => {
                    if (data.success) {
                        return 'Login berhasil!';
                    } else {
                        throw new Error(data.error?.detail || 'Login gagal.');
                    }
                },
                error: (err) => err.message || 'Terjadi kesalahan saat login.',
            }
        ).catch(() => {});
    };

    return (
        <VideoBackground videoSrc="/videos/jungle.mp4">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md animate-fade-in-up">
                <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">LOGIN</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="sr-only">Email</label>
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

                    <div className="mb-8 relative">
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

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-xl hover:bg-emerald-700 transition-all duration-300 shadow-md"
                    >
                        LOGIN
                    </button>
                </form>
                
                <p className="text-center text-gray-600 mt-8 text-md">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors">
                        Register
                    </Link>
                </p>
            </div>
        </VideoBackground>
    );
}

export default Login;