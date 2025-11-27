import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/" className="text-purple-300 hover:text-purple-200 underline">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-10 px-4 max-w-7xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}`} className="bg-white/10 p-4 rounded-xl flex gap-4 items-center">
                            <img src={item.image_urls[0]} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="text-sm text-gray-300">Size: {item.selectedSize}</p>
                                <p className="text-purple-300 font-semibold">{item.price} Tk x {item.quantity}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id, item.selectedSize)}
                                className="text-red-400 hover:text-red-300"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="bg-white/10 p-6 rounded-xl h-fit">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>{cartTotal} Tk</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Delivery</span>
                        <span>100 Tk</span>
                    </div>
                    <div className="border-t border-white/20 pt-4 flex justify-between font-bold text-lg mb-6">
                        <span>Total</span>
                        <span>{cartTotal + 100} Tk</span>
                    </div>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-bold transition-all"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
