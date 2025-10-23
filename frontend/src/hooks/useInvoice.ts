"use client"
import { useState, useEffect, useCallback } from 'react';
import { invoiceApi } from '../lib/api';
import { Invoice } from '../types/invoice';


interface UseInvoicesResult {
    invoices: Invoice[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export function useInvoices(refreshTrigger?: number): UseInvoicesResult {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInvoices = useCallback(async (showLoading = true) => {
        try {
            if (showLoading) setLoading(true);
            setError(null);
            const data = await invoiceApi.getInvoices();
            setInvoices(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error('Error fetching invoices:', err);
            setError(err.response?.data?.message || 'Failed to fetch invoices');
        } finally {
            if (showLoading) setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInvoices(true);
    }, [fetchInvoices, refreshTrigger]);

    const refresh = useCallback(async () => {
        await fetchInvoices(true);
    }, [fetchInvoices]);

    return {
        invoices,
        loading,
        error,
        refresh,
    };
}