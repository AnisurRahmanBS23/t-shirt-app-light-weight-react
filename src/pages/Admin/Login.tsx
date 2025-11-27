import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded password for MVP
        if (password === 'admin123') {
            localStorage.setItem('adminAuth', 'true');
            navigate('/admin/dashboard');
        } else {
            alert('Invalid password');
        }
    };

    return (
        <div className="pt-24 pb-10 px-4 max-w-md mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Admin Login</h2>
            <form onSubmit={handleLogin} className="bg-white/10 p-6 rounded-xl space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-bold transition-all"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
