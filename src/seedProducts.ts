import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const dummyProducts = [
    {
        title: 'Neon Cyber Tee',
        price: 550,
        image_urls: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
        ],
        stock: { S: 5, M: 10, L: 8, XL: 5, XXL: 2 },
        color: 'Black',
        gsm: 180,
        brand: 'Urban Threads',
        type: 'half-sleeve' as const,
        description: 'A modern cyber-inspired design with neon accents. Perfect for casual outings and street style. Made with premium cotton fabric for maximum comfort.',
        ratings: { average: 4.5, count: 23 }
    },
    {
        title: 'Abstract Blue Wave',
        price: 600,
        image_urls: [
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500'
        ],
        stock: { S: 3, M: 8, L: 12, XL: 6, XXL: 4 },
        color: 'Navy Blue',
        gsm: 200,
        brand: 'Wave Style',
        type: 'half-sleeve' as const,
        description: 'Abstract wave pattern in deep blue tones. Breathable fabric ideal for Bangladesh\'s climate. Stylish and comfortable for everyday wear.',
        ratings: { average: 4.7, count: 31 }
    },
    {
        title: 'Purple Haze',
        price: 500,
        image_urls: [
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500',
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500'
        ],
        stock: { S: 7, M: 15, L: 10, XL: 5, XXL: 3 },
        color: 'Purple',
        gsm: 180,
        brand: 'Street Vibes',
        type: 'half-sleeve' as const,
        description: 'Vibrant purple design with a modern aesthetic. Soft, lightweight fabric perfect for hot weather. Stand out with this bold color choice.',
        ratings: { average: 4.3, count: 18 }
    },
    {
        title: 'Sunset Gradient',
        price: 650,
        image_urls: [
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500',
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
            'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500'
        ],
        stock: { S: 4, M: 9, L: 11, XL: 7, XXL: 2 },
        color: 'Orange/Pink',
        gsm: 190,
        brand: 'Sunset Co.',
        type: 'half-sleeve' as const,
        description: 'Beautiful sunset-inspired gradient design. Premium quality fabric with excellent color retention. A unique piece for your wardrobe.',
        ratings: { average: 4.8, count: 42 }
    },
    {
        title: 'Minimalist Black',
        price: 450,
        image_urls: [
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
        ],
        stock: { S: 10, M: 20, L: 15, XL: 10, XXL: 5 },
        color: 'Black',
        gsm: 180,
        brand: 'Minimal',
        type: 'half-sleeve' as const,
        description: 'Classic black tee with minimalist design. Versatile and timeless. Perfect for any occasion. High-quality cotton blend for durability.',
        ratings: { average: 4.6, count: 67 }
    },
    {
        title: 'Vintage Retro',
        price: 700,
        image_urls: [
            'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500',
            'https://images.unsplash.com/photo-1622445275576-721325763afe?w=500',
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500'
        ],
        stock: { S: 6, M: 12, L: 9, XL: 4, XXL: 2 },
        color: 'Cream',
        gsm: 220,
        brand: 'Retro Threads',
        type: 'full-sleeve' as const,
        description: 'Vintage-inspired design with retro graphics. Premium heavyweight fabric. Perfect for cooler evenings. A nostalgic addition to your collection.',
        ratings: { average: 4.9, count: 28 }
    },
    {
        title: 'Geometric Pattern',
        price: 580,
        image_urls: [
            'https://images.unsplash.com/photo-1622445275576-721325763afe?w=500',
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
            'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500'
        ],
        stock: { S: 5, M: 10, L: 10, XL: 6, XXL: 3 },
        color: 'White/Black',
        gsm: 190,
        brand: 'Geo Style',
        type: 'half-sleeve' as const,
        description: 'Modern geometric pattern in monochrome. Eye-catching design that makes a statement. Comfortable fit for all-day wear.',
        ratings: { average: 4.4, count: 35 }
    },
    {
        title: 'Urban Street Style',
        price: 620,
        image_urls: [
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
            'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500',
            'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500'
        ],
        stock: { S: 8, M: 14, L: 12, XL: 8, XXL: 4 },
        color: 'Gray',
        gsm: 200,
        brand: 'Urban Threads',
        type: 'half-sleeve' as const,
        description: 'Street-inspired urban design. Durable and stylish. Perfect for the modern youth. Soft fabric with a relaxed fit.',
        ratings: { average: 4.5, count: 41 }
    },
    {
        title: 'Ocean Breeze',
        price: 550,
        image_urls: [
            'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500',
            'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500',
            'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=500'
        ],
        stock: { S: 4, M: 11, L: 13, XL: 7, XXL: 3 },
        color: 'Light Blue',
        gsm: 180,
        brand: 'Ocean Wear',
        type: 'half-sleeve' as const,
        description: 'Cool ocean-inspired design. Light and breathable. Ideal for summer days. Fresh color that never goes out of style.',
        ratings: { average: 4.6, count: 29 }
    },
    {
        title: 'Fire Dragon',
        price: 750,
        image_urls: [
            'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500',
            'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=500',
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
        ],
        stock: { S: 3, M: 7, L: 8, XL: 5, XXL: 2 },
        color: 'Red/Black',
        gsm: 210,
        brand: 'Dragon Style',
        type: 'full-sleeve' as const,
        description: 'Bold dragon graphic design. Premium quality heavyweight fabric. Make a powerful statement. Perfect for those who dare to be different.',
        ratings: { average: 4.8, count: 19 }
    },
    {
        title: 'Classic White',
        price: 400,
        image_urls: [
            'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=500',
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
        ],
        stock: { S: 15, M: 25, L: 20, XL: 12, XXL: 6 },
        color: 'White',
        gsm: 180,
        brand: 'Basics',
        type: 'half-sleeve' as const,
        description: 'Essential white tee. Wardrobe staple. Clean and versatile. Premium cotton for everyday comfort. A must-have basic.',
        ratings: { average: 4.7, count: 89 }
    },
    {
        title: 'Galaxy Space',
        price: 680,
        image_urls: [
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500'
        ],
        stock: { S: 5, M: 9, L: 11, XL: 6, XXL: 3 },
        color: 'Dark Purple',
        gsm: 200,
        brand: 'Space Wear',
        type: 'half-sleeve' as const,
        description: 'Cosmic galaxy print design. Out-of-this-world style. Vibrant colors that pop. For the dreamers and space enthusiasts.',
        ratings: { average: 4.5, count: 33 }
    },
    {
        title: 'Tropical Vibes',
        price: 590,
        image_urls: [
            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
            'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500'
        ],
        stock: { S: 6, M: 13, L: 14, XL: 8, XXL: 4 },
        color: 'Green/Yellow',
        gsm: 180,
        brand: 'Tropical Co.',
        type: 'half-sleeve' as const,
        description: 'Tropical paradise design. Bright and cheerful. Perfect for beach vibes. Lightweight and comfortable for hot days.',
        ratings: { average: 4.4, count: 26 }
    },
    {
        title: 'Monochrome Art',
        price: 520,
        image_urls: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
            'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500',
            'https://images.unsplash.com/photo-1503341338985-c2bae4d26e3e?w=500'
        ],
        stock: { S: 7, M: 12, L: 10, XL: 5, XXL: 2 },
        color: 'Black/White',
        gsm: 190,
        brand: 'Art Threads',
        type: 'half-sleeve' as const,
        description: 'Artistic monochrome design. Sophisticated and modern. Express your creative side. Quality fabric with unique print.',
        ratings: { average: 4.6, count: 37 }
    },
    {
        title: 'Neon Nights',
        price: 630,
        image_urls: [
            'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500',
            'https://images.unsplash.com/photo-1503341338985-c2bae4d26e3e?w=500',
            'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500'
        ],
        stock: { S: 4, M: 10, L: 12, XL: 7, XXL: 3 },
        color: 'Black/Neon',
        gsm: 200,
        brand: 'Neon Style',
        type: 'half-sleeve' as const,
        description: 'Vibrant neon accents on black. Stand out in the crowd. Perfect for night outs. High-quality print that lasts.',
        ratings: { average: 4.7, count: 44 }
    },
    {
        title: 'Graffiti Street',
        price: 720,
        image_urls: [
            'https://images.unsplash.com/photo-1503341338985-c2bae4d26e3e?w=500',
            'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500',
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500'
        ],
        stock: { S: 3, M: 8, L: 9, XL: 5, XXL: 2 },
        color: 'Multi-color',
        gsm: 210,
        brand: 'Street Art',
        type: 'full-sleeve' as const,
        description: 'Urban graffiti art design. Bold and expressive. For the rebels and artists. Premium heavyweight fabric for durability.',
        ratings: { average: 4.9, count: 21 }
    },
    {
        title: 'Mountain Peak',
        price: 560,
        image_urls: [
            'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500',
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
        ],
        stock: { S: 8, M: 15, L: 13, XL: 9, XXL: 4 },
        color: 'Forest Green',
        gsm: 190,
        brand: 'Mountain Wear',
        type: 'half-sleeve' as const,
        description: 'Mountain landscape design. Nature-inspired and peaceful. Perfect for outdoor enthusiasts. Comfortable and breathable.',
        ratings: { average: 4.5, count: 38 }
    },
    {
        title: 'Electric Blue',
        price: 540,
        image_urls: [
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500'
        ],
        stock: { S: 6, M: 11, L: 14, XL: 8, XXL: 5 },
        color: 'Electric Blue',
        gsm: 180,
        brand: 'Electric Style',
        type: 'half-sleeve' as const,
        description: 'Striking electric blue color. Energetic and modern. Make a bold fashion statement. Soft fabric for all-day comfort.',
        ratings: { average: 4.6, count: 32 }
    },
    {
        title: 'Sunset Paradise',
        price: 610,
        image_urls: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500'
        ],
        stock: { S: 5, M: 10, L: 11, XL: 6, XXL: 3 },
        color: 'Orange/Purple',
        gsm: 190,
        brand: 'Paradise Wear',
        type: 'half-sleeve' as const,
        description: 'Beautiful sunset paradise theme. Warm and inviting colors. Perfect for casual wear. Quality print with vibrant hues.',
        ratings: { average: 4.7, count: 27 }
    },
    {
        title: 'Urban Legend',
        price: 690,
        image_urls: [
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
            'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500',
            'https://images.unsplash.com/photo-1622445275576-721325763afe?w=500'
        ],
        stock: { S: 4, M: 9, L: 10, XL: 7, XXL: 4 },
        color: 'Charcoal Gray',
        gsm: 200,
        brand: 'Legend Threads',
        type: 'full-sleeve' as const,
        description: 'Urban legend graphic design. Mysterious and cool. Premium quality fabric. Perfect for those who love urban culture.',
        ratings: { average: 4.8, count: 36 }
    }
];

export const seedProducts = async () => {
    console.log('🌱 Starting to seed products...');

    try {
        const productsCollection = collection(db, 'products');

        for (let i = 0; i < dummyProducts.length; i++) {
            const product = dummyProducts[i];
            const docRef = await addDoc(productsCollection, product);
            console.log(`✅ Added product ${i + 1}/20: ${product.title} (ID: ${docRef.id})`);
        }

        console.log('🎉 Successfully seeded 20 products to Firestore!');
        return { success: true, count: dummyProducts.length };
    } catch (error) {
        console.error('❌ Error seeding products:', error);
        return { success: false, error };
    }
};
