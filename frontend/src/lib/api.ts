import axios from 'axios';
import { CreateInvoiceRequest, Invoice } from '../types/invoice';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const invoiceApi = {
    createInvoice: async (invoiceData: CreateInvoiceRequest): Promise<Invoice> => {
        const response = await api.post('/invoices', invoiceData);
        return response.data;
    },

    getInvoices: async (): Promise<Invoice[]> => {
        const response = await api.get('/invoices');
        return response.data;
    },
};

export default api;