import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple password check (in production, use proper authentication)
        if (password === 'admin123') {
            localStorage.setItem('adminAuth', 'true');
            navigate('/admin/dashboard');
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-500 text-gray-900"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
