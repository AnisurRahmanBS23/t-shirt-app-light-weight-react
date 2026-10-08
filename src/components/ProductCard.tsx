import { Link } from 'react-router-dom';
import type { Product } from '../types';
import StarRating from './StarRating';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const hasStock = Object.values(product.stock || {}).some(count => count > 0);

    // Provide defaults for new fields that might not exist in old products
    const color = product.color || 'N/A';
    const brand = product.brand || 'Unknown';
    const type = product.type || 'half-sleeve';
    const gsm = product.gsm || 180;
    const ratings = product.ratings || { average: 0, count: 0 };

    return (
        <Link to={`/product/${product.id}`} className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden relative bg-gray-100">
                    <img
                        src={product.image_urls?.[0] || 'https://via.placeholder.com/400x500'}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Brand Badge */}
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                        <span className="text-xs font-semibold text-gray-700">{brand}</span>
                    </div>
                    {/* Stock Badge */}
                    {!hasStock && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
                            <span className="text-xs font-semibold">Out of Stock</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-1 truncate">{product.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                        {color} • {type === 'half-sleeve' ? 'Half Sleeve' : 'Full Sleeve'}
                    </p>

                    {/* Rating */}
                    {ratings.count > 0 && (
                        <div className="mb-2">
                            <StarRating rating={ratings.average} count={ratings.count} size="sm" />
                        </div>
                    )}

                    {/* Price and GSM */}
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-slate-700">{product.price} Tk</p>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{gsm} GSM</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
