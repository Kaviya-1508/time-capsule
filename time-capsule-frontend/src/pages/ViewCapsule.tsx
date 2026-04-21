import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCapsule } from '../services/api';
import { CapsuleResponse } from '../types';

const ViewCapsule: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [capsule, setCapsule] = useState<CapsuleResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getCapsule(id)
                .then(res => setCapsule(res.data))
                .catch(() => alert('Failed to load capsule'))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (!capsule) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Capsule not found</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                <div className="flex justify-between items-start mb-6">
                    <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold
              ${capsule.status === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                    >
                        {capsule.status}
                    </span>
                    <span className="text-sm text-gray-400">
                        #{capsule.id.slice(-8)}
                    </span>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 
                      rounded-xl p-8 mb-8 border border-purple-100">
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed 
                      whitespace-pre-wrap break-words">
                        {capsule.message}
                    </p>
                </div>

                <div className="space-y-3 text-gray-600 border-t pt-6">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">📧</span>
                        <span className="font-medium">{capsule.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xl">📅</span>
                        <span>Created: {formatDate(capsule.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xl">⏰</span>
                        <span className={capsule.status === 'DELIVERED' ? 'text-green-600 font-medium' : ''}>
                            Delivery: {formatDate(capsule.deliveryTime)}
                        </span>
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <Link
                        to="/my-capsules"
                        className="text-purple-600 hover:text-purple-800 
                     font-medium transition duration-200"
                    >
                        ⬅ Back to My Capsules
                    </Link>
                    <Link
                        to="/"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 
                     text-white px-6 py-2 rounded-lg
                     hover:from-purple-700 hover:to-pink-700
                     transition duration-200 text-sm font-medium"
                    >
                        + New Capsule
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ViewCapsule;