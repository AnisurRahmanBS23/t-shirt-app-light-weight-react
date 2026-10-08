export interface Product {
    id: string;
    title: string;
    price: number;
    image_urls: string[]; // Up to 3 images
    stock: Record<string, number>;
    color: string;
    gsm: number; // Fabric weight
    brand: string;
    type: 'half-sleeve' | 'full-sleeve';
    description: string;
    ratings: {
        average: number;
        count: number;
    };
    createdAt?: any;
}

export interface CartItem extends Product {
    selectedSize: string;
    quantity: number;
}

export interface Rating {
    id?: string;
    userId: string;
    productId: string;
    orderId: string;
    rating: number; // 1-5
    createdAt: any;
}
