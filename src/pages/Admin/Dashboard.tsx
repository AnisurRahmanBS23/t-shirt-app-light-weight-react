import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductManager from './ProductManager.tsx';
import OrdersPanel from './OrdersPanel.tsx';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'products' | 'orders'>('orders');

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin');
    };

    return (
        <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto text-white">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Admin Dashboard</h2>
                <button onClick={handleLogout} className="text-red-400 hover:text-red-300">Logout</button>
            </div>

            <div className="flex space-x-4 mb-6 border-b border-white/20">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-2 px-4 ${activeTab === 'orders' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400'}`}
                >
                    Orders
                </button>
                <button
                    onClick={() => setActiveTab('products')}
                    className={`pb-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-purple-500 text-purple-300' : 'text-gray-400'}`}
                >
                    Products
                </button>
            </div>

            <div>
                {activeTab === 'orders' ? <OrdersPanel /> : <ProductManager />}
            </div>
        </div>
    );
};

export default AdminDashboard;
