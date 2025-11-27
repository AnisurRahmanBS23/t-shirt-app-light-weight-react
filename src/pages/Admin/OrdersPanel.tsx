import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, orderBy, query } from 'firebase/firestore';

interface Order {
    id: string;
    customer: {
        name: string;
        phone: string;
        address: string;
    };
    items: any[];
    total: number;
    status: string;
    createdAt: any;
}

const OrdersPanel = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
            fetchOrders(); // Refresh list
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'text-yellow-400';
            case 'Processing': return 'text-blue-400';
            case 'Shipped': return 'text-purple-400';
            case 'Delivered': return 'text-green-400';
            case 'Cancelled': return 'text-red-400';
            default: return 'text-white';
        }
    };

    return (
        <div className="bg-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Recent Orders</h3>
                <button onClick={fetchOrders} className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">Refresh</button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-bold text-lg">Order #{order.id.slice(0, 8)}</p>
                                    <p className="text-sm text-gray-400">{new Date(order.createdAt?.seconds * 1000).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`font-bold ${getStatusColor(order.status)}`}>{order.status}</span>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="bg-black/30 border border-white/20 rounded px-2 py-1 text-sm"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-purple-300 mb-2">Customer Info</h4>
                                    <p><span className="text-gray-400">Name:</span> {order.customer.name}</p>
                                    <p><span className="text-gray-400">Phone:</span> {order.customer.phone}</p>
                                    <p><span className="text-gray-400">Address:</span> {order.customer.address}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-purple-300 mb-2">Items</h4>
                                    <ul className="space-y-1">
                                        {order.items.map((item, idx) => (
                                            <li key={idx} className="text-sm">
                                                {item.quantity}x {item.title} ({item.selectedSize}) - {item.price} Tk
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-2 font-bold text-right">Total: {order.total} Tk</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && <p className="text-center text-gray-400">No orders found.</p>}
                </div>
            )}
        </div>
    );
};

export default OrdersPanel;
