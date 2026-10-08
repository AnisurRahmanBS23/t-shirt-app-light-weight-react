import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
    });

    if (cart.length === 0) {
        navigate('/');
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                customer: formData,
                items: cart,
                subtotal: cartTotal,
                deliveryFee: 100,
                total: cartTotal + 100,
                status: 'Pending',
                createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, 'orders'), orderData);

            clearCart();
            alert(`Order placed successfully! Order ID: ${docRef.id}`);
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-10 px-4 max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Checkout</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl space-y-4 shadow-md border border-gray-200">
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-500 text-gray-900"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-500 text-gray-900"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
                    <textarea
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-500 text-gray-900"
                    />
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between mb-2 text-gray-700">
                        <span>Total Amount (COD)</span>
                        <span className="font-bold text-xl text-gray-900">{cartTotal + 100} Tk</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg"
                >
                    {loading ? 'Placing Order...' : 'Confirm Order'}
                </button>
            </form>
        </div>
    );
};

export default Checkout;
