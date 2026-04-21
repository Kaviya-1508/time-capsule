import axios from 'axios';
import { CapsuleRequest, CapsuleResponse } from '../types';

// Change this after deploying backend
const API_URL = "https://time-capsule-backend.onrender.com/api";

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