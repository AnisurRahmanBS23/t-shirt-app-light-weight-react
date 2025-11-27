import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

// Dummy data (same as Home.tsx for now, ideally moved to a shared file or fetched)
const DUMMY_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Neon Cyber Tee',
        price: 550,
        image_urls: ['https://i.ibb.co/5GzXhzB/tshirt1.jpg'],
        stock: { M: 10, L: 5 },
    },
    {
        id: '2',
        title: 'Abstract Blue',
        price: 600,
        image_urls: ['https://i.ibb.co/MC7r11h/tshirt2.jpg'],
        stock: { S: 2, M: 8, XL: 1 },
    },
    {
        id: '3',
        title: 'Purple Haze',
        price: 500,
        image_urls: ['https://i.ibb.co/hR5y2yL/tshirt3.jpg'],
        stock: { L: 10, XXL: 3 },
    },
];

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>('');

    const product = DUMMY_PRODUCTS.find((p) => p.id === id);

    if (!product) {
        return <div className="text-white text-center pt-20">Product not found</div>;
    }

    const handleAddToCart = () => {
        if (!selectedSize) return alert('Please select a size');
        addToCart(product, selectedSize);
        alert('Added to cart!');
    };

    const handleBuyNow = () => {
        if (!selectedSize) return alert('Please select a size');
        addToCart(product, selectedSize);
        navigate('/cart');
    };

    return (
        <div className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white/5">
                    <img src={product.image_urls[0]} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-white">
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-2xl text-purple-300 font-semibold mb-6">{product.price} Tk</p>

                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-300 mb-2">Select Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(product.stock).map(([size, count]) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    disabled={count === 0}
                                    className={`px-4 py-2 rounded-lg border transition-all ${selectedSize === size
                                            ? 'bg-purple-600 border-purple-600 text-white'
                                            : 'border-white/20 hover:border-white/50 text-gray-300'
                                        } ${count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-colors border border-white/20"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
