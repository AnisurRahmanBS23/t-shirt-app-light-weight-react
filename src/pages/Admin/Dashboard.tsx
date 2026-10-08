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
        <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-700 font-medium">Logout</button>
            </div>

            <div className="flex space-x-4 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-2 px-4 ${activeTab === 'orders' ? 'border-b-2 border-slate-600 text-slate-700 font-semibold' : 'text-gray-500'}`}
                >
                    Orders
                </button>
                <button
                    onClick={() => setActiveTab('products')}
                    className={`pb-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-slate-600 text-slate-700 font-semibold' : 'text-gray-500'}`}
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
