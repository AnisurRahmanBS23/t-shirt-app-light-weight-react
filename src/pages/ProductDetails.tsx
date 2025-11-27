import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (productId: string) => {
        setLoading(true);
        try {
            const docRef = doc(db, 'products', productId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
            } else {
                setProduct(null);
            }
        } catch (error) {
            console.error("Error fetching product: ", error);
            setProduct(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-white text-center pt-20">Loading product...</div>;
    }

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
