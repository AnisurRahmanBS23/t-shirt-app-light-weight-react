import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="block group">
            <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20">
                <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                        src={product.image_urls[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white font-semibold">View Details</span>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1 truncate">{product.title}</h3>
                    <p className="text-purple-200 font-semibold">{product.price} Tk</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
