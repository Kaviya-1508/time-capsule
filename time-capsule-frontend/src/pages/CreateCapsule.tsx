import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createCapsule } from '../services/api';

const CreateCapsule: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        message: '',
        deliveryTime: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formattedDateTime = form.deliveryTime + ':00';

            await createCapsule({
                message: form.message,
                email: form.email,
                deliveryTime: formattedDateTime
            });
            alert('✅ Capsule sealed and sent to the future!');
            navigate('/my-capsules');
        } catch (err) {
            console.error('Error:', err);
            alert('❌ Failed to create capsule');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4">📦</div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Create Time Capsule
                    </h1>
                    <p className="text-gray-500">
                        Write a message to your future self
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Email
                        </label>
                        <input
                            type="email"
                            placeholder="future@me.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       transition duration-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Message
                        </label>
                        <textarea
                            placeholder="Dear Future Me..."
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       transition duration-200 resize-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Delivery Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            value={form.deliveryTime}
                            onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       transition duration-200"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 
                     text-white font-semibold py-3 px-6 rounded-lg
                     hover:from-purple-700 hover:to-pink-700
                     transform hover:scale-[1.02] transition duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Sealing...' : '🔒 Seal & Send to Future'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        to="/my-capsules"
                        className="text-purple-600 hover:text-purple-800 
                     font-medium transition duration-200"
                    >
                        📋 View My Capsules →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateCapsule;