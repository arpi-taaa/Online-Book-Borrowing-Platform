"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { FaBook, FaArrowLeft, FaTags, FaBookmark, FaExclamationTriangle } from 'react-icons/fa';
import toast from 'react-hot-toast';

const BookDetailsPage = ({ params }) => {
    const router = useRouter();
    const resolvedParams = use(params);
    const bookId = parseInt(resolvedParams.id);

    const { data: session, isPending: sessionLoading } = authClient.useSession();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reserved, setReserved] = useState(false);

    useEffect(() => {
        if (!sessionLoading && !session) {
            toast.error("Please sign in to access library materials", {
                id: "auth-guard-toast"
            });
            router.push('/login');
        }
    }, [session, sessionLoading, router]);

    useEffect(() => {
        if (!session) return;

        const fetchBookDetails = async () => {
            try {
                const response = await fetch('/data/books.json');
                if (!response.ok) {
                    throw new Error('Failed to load library inventory database');
                }
                const data = await response.json();
                const matchedBook = data.find((b) => b.id === bookId);
                
                if (!matchedBook) {
                    throw new Error('The requested volume does not exist in our catalog');
                }
                
                setBook(matchedBook);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId, session]);

    const handleReserveAction = () => {
        if (!session) {
            toast.error("Authentication required to reserve items");
            router.push('/login');
            return;
        }

        if (book.available_quantity <= 0) {
            toast.error("This volume is currently fully checked out by other members");
            return;
        }

        setBook(prevBook => ({
            ...prevBook,
            available_quantity: prevBook.available_quantity - 1
        }));
        
        setReserved(true);
        
        toast.success(`"${book.title}" successfully reserved! Added to your library queue.`, {
            duration: 4000,
            style: {
                borderRadius: '16px',
                background: '#0f172a',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold'
            }
        });
    };

    if (sessionLoading || (loading && !error)) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!session) return null;

    if (error) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-100 px-4 text-center space-y-4">
                <div className="p-4 bg-error/10 text-error rounded-full">
                    <FaExclamationTriangle className="text-3xl" />
                </div>
                <h2 className="text-xl font-black text-slate-950">Catalog Resolution Error</h2>
                <p className="text-sm text-slate-600 max-w-sm font-medium">{error}</p>
                <Link href="/books" className="btn btn-sm btn-outline rounded-xl font-bold gap-2 normal-case">
                    <FaArrowLeft /> Return to Catalog
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-base-100 pb-24 pt-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                
                <div className="mb-10">
                    <Link 
                        href="/books" 
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-primary transition-colors"
                    >
                        <FaArrowLeft /> Back to Full Library
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                    
                    <div className="col-span-1 md:col-span-5 w-full max-w-90 mx-auto md:mx-0">
                        <div className="relative w-full aspect-4/5 bg-slate-50 border border-slate-100 rounded-3xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.03)] overflow-hidden group">
                            <img 
                                src={book?.image_url} 
                                alt={book?.title} 
                                className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500 shadow-sm"
                            />
                            <FaBook className="absolute text-6xl text-slate-200 opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-7 space-y-6 pt-2">
                        
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider border border-primary/5">
                                    <FaTags /> {book?.category}
                                </span>
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                    book?.available_quantity > 0 
                                    ? 'bg-success/10 text-success border-success/5' 
                                    : 'bg-error/10 text-error border-error/5'
                                }`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${book?.available_quantity > 0 ? 'bg-success' : 'bg-error'}`} />
                                    {book?.available_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl leading-tight">
                                {book?.title}
                            </h1>
                            <p className="text-base font-semibold text-slate-500">
                                Written by <span className="text-slate-800 font-bold">{book?.author}</span>
                            </p>
                        </div>

                        <div className="border-t border-b border-slate-100 py-5">
                            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Summary & Overview</h3>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                {book?.description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100/50">
                            <div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Availability Status</p>
                                <p className="text-lg font-black text-slate-950 mt-0.5">
                                    {book?.available_quantity > 0 ? (
                                        <span>{book.available_quantity} Copies Left</span>
                                    ) : (
                                        <span className="text-error">All Copies Reserved</span>
                                    )}
                                </p>
                            </div>

                            <button
                                onClick={handleReserveAction}
                                disabled={book?.available_quantity <= 0 || reserved}
                                className={`btn btn-md px-8 rounded-xl font-bold text-xs uppercase tracking-wider border-none transition-all duration-200 shadow-sm shrink-0 ${
                                    reserved 
                                    ? 'btn-disabled bg-success/20 text-success font-bold' 
                                    : 'btn-primary text-primary-content bg-primary hover:brightness-105 active:scale-95 shadow-primary/10'
                                }`}
                            >
                                <FaBookmark className="text-[10px]" /> 
                                {reserved ? 'Reserved Successfully' : 'Reserve Book'}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
};

export default BookDetailsPage;