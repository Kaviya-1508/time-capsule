import axios from 'axios';
import { CapsuleRequest, CapsuleResponse } from '../types';

// ✅ CHANGE THIS LINE
const API_URL = "https://time-capsule-backend-b9yg.onrender.com/api";

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const createCapsule = (data: CapsuleRequest): Promise<{ data: CapsuleResponse }> =>
    api.post('/capsules', data);

export const getCapsule = (id: string): Promise<{ data: CapsuleResponse }> =>
    api.get(`/capsules/${id}`);

export const getCapsulesByEmail = (email: string): Promise<{ data: CapsuleResponse[] }> =>
    api.get(`/capsules/email/${email}`);

export default api;