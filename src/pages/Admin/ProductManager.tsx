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
        image_urls: ['', '', ''],
        stock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
        color: '',
        gsm: 180,
        brand: '',
        type: 'half-sleeve',
        description: '',
        ratings: { average: 0, count: 0 }
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
            // Filter out empty image URLs
            const productData = {
                ...currentProduct,
                image_urls: currentProduct.image_urls?.filter(url => url.trim() !== '') || []
            };

            if (isEditing && currentProduct.id) {
                await updateDoc(doc(db, 'products', currentProduct.id), productData);
            } else {
                await addDoc(collection(db, 'products'), productData);
            }
            setIsEditing(false);
            setCurrentProduct({
                title: '',
                price: 0,
                image_urls: ['', '', ''],
                stock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
                color: '',
                gsm: 180,
                brand: '',
                type: 'half-sleeve',
                description: '',
                ratings: { average: 0, count: 0 }
            });
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
        setCurrentProduct({
            ...product,
            image_urls: [...product.image_urls, '', ''].slice(0, 3) // Ensure 3 slots
        });
        setIsEditing(true);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1 text-gray-700">Title</label>
                            <input
                                type="text"
                                value={currentProduct.title}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-700">Price (Tk)</label>
                            <input
                                type="number"
                                value={currentProduct.price}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                                className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-900"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1 text-gray-700">Brand</label>
                            <input
                                type="text"
                                value={currentProduct.brand}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-700">Color</label>
                            <input
                                type="text"
                                value={currentProduct.color}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, color: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-900"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1 text-gray-700">GSM (Fabric Weight)</label>
                            <input
                                type="number"
                                value={currentProduct.gsm}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, gsm: Number(e.target.value) })}
                                className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 text-gray-700">Sleeve Type</label>
                            <select
                                value={currentProduct.type}
                                onChange={(e) => setCurrentProduct({ ...currentProduct, type: e.target.value as 'half-sleeve' | 'full-sleeve' })}
                                className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-900"
                                required
                            >
                                <option value="half-sleeve">Half Sleeve</option>
                                <option value="full-sleeve">Full Sleeve</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-700">Description</label>
                        <textarea
                            value={currentProduct.description}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-900"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-700">Image URLs (up to 3)</label>
                        {[0, 1, 2].map((index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Image URL ${index + 1}${index === 0 ? ' (required)' : ' (optional)'}`}
                                value={currentProduct.image_urls?.[index] || ''}
                                onChange={(e) => {
                                    const newUrls = [...(currentProduct.image_urls || ['', '', ''])];
                                    newUrls[index] = e.target.value;
                                    setCurrentProduct({ ...currentProduct, image_urls: newUrls });
                                }}
                                className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 mb-2 text-gray-900"
                                required={index === 0}
                            />
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-700">Stock</label>
                        <div className="flex gap-4">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <div key={size} className="flex items-center gap-2">
                                    <span className="w-8 text-gray-700">{size}</span>
                                    <input
                                        type="number"
                                        value={currentProduct.stock?.[size] || 0}
                                        onChange={(e) => setCurrentProduct({
                                            ...currentProduct,
                                            stock: { ...currentProduct.stock, [size]: Number(e.target.value) }
                                        })}
                                        className="w-16 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-gray-900"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded font-bold">
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setCurrentProduct({
                                        title: '',
                                        price: 0,
                                        image_urls: ['', '', ''],
                                        stock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
                                        color: '',
                                        gsm: 180,
                                        brand: '',
                                        type: 'half-sleeve',
                                        description: '',
                                        ratings: { average: 0, count: 0 }
                                    });
                                }}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-bold"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Product List</h3>
                {loading ? (
                    <p className="text-gray-600">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="p-2 text-gray-700">Image</th>
                                    <th className="p-2 text-gray-700">Title</th>
                                    <th className="p-2 text-gray-700">Brand</th>
                                    <th className="p-2 text-gray-700">Price</th>
                                    <th className="p-2 text-gray-700">Stock</th>
                                    <th className="p-2 text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="p-2">
                                            <img src={product.image_urls[0]} alt={product.title} className="w-12 h-12 object-cover rounded" />
                                        </td>
                                        <td className="p-2 text-gray-900">{product.title}</td>
                                        <td className="p-2 text-gray-600">{product.brand}</td>
                                        <td className="p-2 text-gray-900">{product.price} Tk</td>
                                        <td className="p-2">
                                            {Object.entries(product.stock || {}).map(([size, count]) => (
                                                count > 0 && <span key={size} className="mr-2 text-xs bg-gray-100 px-1 rounded text-gray-700">{size}:{count}</span>
                                            ))}
                                        </td>
                                        <td className="p-2 space-x-2">
                                            <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-700">Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-700">Delete</button>
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
