import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import ImageGallery from '../components/ImageGallery';
import StarRating from '../components/StarRating';

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
        return <div className="text-gray-900 text-center pt-20">Loading product...</div>;
    }

    if (!product) {
        return <div className="text-gray-900 text-center pt-20">Product not found</div>;
    }

    // Provide defaults for new fields
    const color = product.color || 'Not specified';
    const brand = product.brand || 'Unknown';
    const type = product.type || 'half-sleeve';
    const gsm = product.gsm || 180;
    const description = product.description || 'No description available.';
    const ratings = product.ratings || { average: 0, count: 0 };
    const images = product.image_urls || ['https://via.placeholder.com/500'];

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
                {/* Image Gallery */}
                <ImageGallery images={images} alt={product.title} />

                {/* Product Info */}
                <div className="text-gray-900">
                    {/* Brand */}
                    <p className="text-sm font-semibold text-slate-600 mb-2">{brand}</p>

                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

                    {/* Rating */}
                    {ratings.count > 0 && (
                        <div className="mb-4">
                            <StarRating rating={ratings.average} count={ratings.count} size="md" />
                        </div>
                    )}

                    {/* Price */}
                    <p className="text-3xl text-slate-700 font-bold mb-6">{product.price} Tk</p>

                    {/* Specifications */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Specifications</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="text-gray-500">Color:</span>
                                <p className="font-medium text-gray-900">{color}</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Fabric:</span>
                                <p className="font-medium text-gray-900">{gsm} GSM</p>
                            </div>
                            <div>
                                <span className="text-gray-500">Type:</span>
                                <p className="font-medium text-gray-900">
                                    {type === 'half-sleeve' ? 'Half Sleeve' : 'Full Sleeve'}
                                </p>
                            </div>
                            <div>
                                <span className="text-gray-500">Brand:</span>
                                <p className="font-medium text-gray-900">{brand}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                    </div>

                    {/* Size Selector */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Select Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(product.stock || {}).map(([size, count]) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    disabled={count === 0}
                                    className={`px-4 py-2 rounded-lg border-2 transition-all font-medium ${selectedSize === size
                                            ? 'bg-slate-600 border-slate-600 text-white'
                                            : count === 0
                                                ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                                : 'border-gray-300 text-gray-700 hover:border-slate-400'
                                        }`}
                                >
                                    {size}
                                    {count === 0 && <span className="ml-1 text-xs">(Out)</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-white hover:bg-gray-50 text-gray-900 py-3 rounded-xl font-semibold transition-colors border-2 border-gray-300"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105"
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
