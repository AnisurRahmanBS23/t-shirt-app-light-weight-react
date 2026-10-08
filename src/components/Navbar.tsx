import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { cartCount } = useCart();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-2xl font-bold text-gray-900">
                        T-Store
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="text-gray-700 hover:text-slate-600 transition-colors relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-slate-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
