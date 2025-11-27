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

            // TODO: Decrement stock in Firestore (will handle in Admin or Cloud Function for now to keep it simple, or add batch write here)

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
        <div className="pt-24 pb-10 px-4 max-w-md mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>
            <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    />
                </div>

                <div className="border-t border-white/20 pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                        <span>Total Amount (COD)</span>
                        <span className="font-bold text-xl">{cartTotal + 100} Tk</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                    {loading ? 'Placing Order...' : 'Confirm Order'}
                </button>
            </form>
        </div>
    );
};

export default Checkout;
