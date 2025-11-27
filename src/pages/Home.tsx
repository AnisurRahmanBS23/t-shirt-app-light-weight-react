import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

// Dummy data for now
const DUMMY_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Neon Cyber Tee',
        price: 550,
        image_urls: ['https://i.ibb.co/5GzXhzB/tshirt1.jpg'], // Placeholder
        stock: { M: 10, L: 5 },
    },
    {
        id: '2',
        title: 'Abstract Blue',
        price: 600,
        image_urls: ['https://i.ibb.co/MC7r11h/tshirt2.jpg'], // Placeholder
        stock: { S: 2, M: 8, XL: 1 },
    },
    {
        id: '3',
        title: 'Purple Haze',
        price: 500,
        image_urls: ['https://i.ibb.co/hR5y2yL/tshirt3.jpg'], // Placeholder
        stock: { L: 10, XXL: 3 },
    },
];

const Home = () => {
    const [products] = useState<Product[]>(DUMMY_PRODUCTS);

    // TODO: Fetch products from Firestore

    return (
        <div className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Latest Drops</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
