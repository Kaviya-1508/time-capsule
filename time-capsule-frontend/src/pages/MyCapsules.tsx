import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCapsulesByEmail } from '../services/api';
import { CapsuleResponse } from '../types';

const MyCapsules: React.FC = () => {
    const [email, setEmail] = useState('');
    const [capsules, setCapsules] = useState<CapsuleResponse[]>([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await getCapsulesByEmail(email);
            setCapsules(res.data);
            setSearched(true);
        } catch (err) {
            alert('No capsules found for this email');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">📋 My Time Capsules</h1>
                <p className="text-white/80">Search for your sealed messages</p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
                <form onSubmit={handleSearch} className="flex gap-3 mb-8">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg
                     hover:bg-purple-700 transition duration-200
                     disabled:opacity-50 font-medium"
                    >
                        {loading ? 'Searching...' : '🔍 Search'}
                    </button>
                </form>

                {searched && (
                    <div className="space-y-4">
                        {capsules.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📭</div>
                                <p className="text-gray-500 text-lg">No capsules found</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-gray-500 mb-4">
                                    Found {capsules.length} capsule{capsules.length !== 1 ? 's' : ''}
                                </p>
                                <div className="space-y-3">
                                    {capsules.map((capsule) => (
                                        <Link
                                            to={`/capsule/${capsule.id}`}
                                            key={capsule.id}
                                            className="block bg-gray-50 rounded-xl p-5
                               hover:shadow-md hover:bg-gray-100
                               transition duration-200 border border-gray-200"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${capsule.status === 'PENDING'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-green-100 text-green-700'
                                                        }`}
                                                >
                                                    {capsule.status}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    ID: {capsule.id.slice(-6)}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 line-clamp-2 mb-2">
                                                {capsule.message}
                                            </p>
                                            <div className="flex gap-4 text-xs text-gray-500">
                                                <span>📅 Created: {formatDate(capsule.createdAt)}</span>
                                                <span>⏰ Delivery: {formatDate(capsule.deliveryTime)}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-block text-purple-600 hover:text-purple-800 
                     font-medium transition duration-200"
                    >
                        ⬅ Create New Capsule
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyCapsules;