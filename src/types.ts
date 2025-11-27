export interface Product {
    id: string;
    title: string;
    price: number;
    image_urls: string[];
    stock: {
        [size: string]: number; // e.g., "M": 10
    };
    createdAt?: any;
}

export interface CartItem extends Product {
    selectedSize: string;
    quantity: number;
}
