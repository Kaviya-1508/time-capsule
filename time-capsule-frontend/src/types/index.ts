export interface Capsule {
    id: string;
    message: string;
    email: string;
    deliveryTime: string;
    status: 'PENDING' | 'DELIVERED';
    createdAt: string;
    deliveredAt?: string;
}

export interface CapsuleRequest {
    message: string;
    email: string;
    deliveryTime: string;
}

export interface CapsuleResponse {
    id: string;
    message: string;
    email: string;
    deliveryTime: string;
    status: string;
    createdAt: string;
}