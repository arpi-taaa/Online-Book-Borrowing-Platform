"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { FaArrowRight, FaHandSparkles } from 'react-icons/fa';

const Featuring = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedBooks = async () => {
            try {
                const response = await fetch('/data/books.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }
                const data = await response.json();
                setBooks(data.slice(0, 4));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedBooks();
    }, []);

    return (
        <section className="max-w-6xl mx-auto my-4 md:my-15 px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5 text-center md:text-left">
                <div className="space-y-2 max-w-xl mx-auto md:mx-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold border border-secondary/10 tracking-wide">
                        <FaHandSparkles className="text-[10px]" /> Curated Selections
                    </span>
                    <h2 className="text-3xl font-black text-slate-950 tracking-tight sm:text-4xl leading-none pt-1">Featured Reads</h2>
                    <p className="text-base text-slate-600 font-medium pt-1">Explore our top-rated academic resources and timeless fiction literature available this week.</p>
                </div>
                <Link 
                    href="/books" 
                    className="btn btn-ghost btn-sm rounded-full px-5 font-bold text-sm gap-2 border border-slate-100 normal-case shrink-0 hover:bg-slate-50 transition-colors active:scale-95"
                >
                    View All Catalog <FaArrowRight />
                </Link>
            </div>

            {error && (
                <div className="alert alert-error max-w-md mx-auto rounded-2xl text-xs font-semibold">
                    <span>Error: {error}</span>
                </div>
            )}

            {loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-5 w-full max-w-[320px] mx-auto">
                            <div className="skeleton aspect-4/5 w-full rounded-3xl"></div>
                            <div className="space-y-3">
                                <div className="skeleton h-3 w-16 rounded"></div>
                                <div className="skeleton h-6 w-full rounded"></div>
                                <div className="skeleton h-4 w-28 rounded"></div>
                                <div className="skeleton h-10 w-full rounded-xl pt-2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {books.map((singleBook) => (
                        <BookCard key={singleBook.id} book={singleBook} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Featuring;