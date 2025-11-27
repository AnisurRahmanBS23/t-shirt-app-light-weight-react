import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Product } from '../../types';

const ProductManager = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
        title: '',
        price: 0,
        image_urls: [''],
        stock: { M: 0, L: 0, XL: 0 },
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && currentProduct.id) {
                await updateDoc(doc(db, 'products', currentProduct.id), currentProduct);
            } else {
                await addDoc(collection(db, 'products'), currentProduct);
            }
            setIsEditing(false);
            setCurrentProduct({ title: '', price: 0, image_urls: [''], stock: { M: 0, L: 0, XL: 0 } });
            fetchProducts();
        } catch (error) {
            console.error("Error saving product: ", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, 'products', id));
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product: ", error);
            }
        }
    };

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Title</label>
                            <input
                                type="text"
                                value={currentProduct.title}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
                                className="w-full bg-white/5 border border-white/20 rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1">Price (Tk)</label>
                            <input
                                type="number"
                                value={currentProduct.price}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                                className="w-full bg-white/5 border border-white/20 rounded px-3 py-2"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Image URL</label>
                        <input
                            type="text"
                            value={currentProduct.image_urls?.[0] || ''}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, image_urls: [e.target.value] })}
                            className="w-full bg-white/5 border border-white/20 rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Stock</label>
                        <div className="flex gap-4">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <div key={size} className="flex items-center gap-2">
                                    <span className="w-8">{size}</span>
                                    <input
                                        type="number"
                                        value={currentProduct.stock?.[size] || 0}
                                        onChange={(e) => setCurrentProduct({
                                            ...currentProduct,
                                            stock: { ...currentProduct.stock, [size]: Number(e.target.value) }
                                        })}
                                        className="w-16 bg-white/5 border border-white/20 rounded px-2 py-1"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button type="submit" className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded font-bold">
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setCurrentProduct({ title: '', price: 0, image_urls: [''], stock: { M: 0, L: 0, XL: 0 } });
                                }}
                                className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded font-bold"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Product List</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="p-2">Image</th>
                                    <th className="p-2">Title</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Stock</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b border-white/10 hover:bg-white/5">
                                        <td className="p-2">
                                            <img src={product.image_urls[0]} alt={product.title} className="w-12 h-12 object-cover rounded" />
                                        </td>
                                        <td className="p-2">{product.title}</td>
                                        <td className="p-2">{product.price} Tk</td>
                                        <td className="p-2">
                                            {Object.entries(product.stock || {}).map(([size, count]) => (
                                                count > 0 && <span key={size} className="mr-2 text-xs bg-white/10 px-1 rounded">{size}:{count}</span>
                                            ))}
                                        </td>
                                        <td className="p-2 space-x-2">
                                            <button onClick={() => handleEdit(product)} className="text-blue-400 hover:text-blue-300">Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-300">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductManager;
