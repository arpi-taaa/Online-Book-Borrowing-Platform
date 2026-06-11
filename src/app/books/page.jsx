"use client";

import React, { useState, useEffect } from 'react';
import BookCard from '@/Components/BookCard';
import { FaBookOpen, FaSearch, FaTags } from 'react-icons/fa';

const categories = ["All", "Story", "Tech", "Science"];

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); // Added state for category selection
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await fetch('/data/books.json');
                if (!response.ok) {
                    throw new Error('Failed to load library catalog');
                }
                const data = await response.json();
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllBooks();
    }, []);

    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-base-100 pb-24 pt-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <div className="flex flex-col items-center text-center space-y-3 mb-12">
                    <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-xs border border-primary/5">
                        <FaBookOpen className="text-2xl" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-950 tracking-tight sm:text-5xl leading-none pt-1">
                        Complete Library Catalog
                    </h1>
                    <p className="text-base text-slate-600 font-medium max-w-xl pt-1">
                        Browse through our entire collection of storytelling classics, technical manuals, and cutting-edge research publications.
                    </p>
                    <div className="badge badge-neutral rounded-full font-bold text-xs px-4 py-3 shadow-xs border-none mt-2">
                        Showing {filteredBooks.length} Available Volumes
                    </div>
                </div>

                <div className="max-w-md mx-auto mb-16 relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                        <FaSearch className="text-sm" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search books by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-xs transition-all"
                    />
                </div>

                {error && (
                    <div className="alert alert-error max-w-md mx-auto rounded-2xl text-xs font-semibold shadow-xs mb-8">
                        <span>Error: {error}</span>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8 items-start">

                    <aside className="w-full md:w-56 shrink-0 md:sticky md:top-24 z-10">
                        <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] rounded-3xl p-5 space-y-4">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 pl-1 flex items-center gap-2">
                                <FaTags className="text-slate-300" />
                                Categories
                            </h2>
                            <ul className="space-y-1 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-2 md:gap-1 scrollbar-none">
                                {categories.map((category) => (
                                    <li key={category} className="shrink-0 w-auto md:w-full">
                                        <button
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-98 ${
                                                selectedCategory === category
                                                    ? "bg-primary text-primary-content shadow-sm"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 bg-slate-50/50 md:bg-transparent"
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <div className="flex-1 w-full">
                        
                        {loading && !error && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                                {[...Array(6)].map((_, i) => (
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

                        {!loading && !error && filteredBooks.length === 0 && (
                            <div className="text-center py-16 bg-white border border-dashed border-slate-100 rounded-3xl">
                                <p className="text-sm font-bold text-slate-400">
                                    No volumes found matching current selection parameters.
                                </p>
                            </div>
                        )}

                        {!loading && !error && filteredBooks.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                                {filteredBooks.map((singleBook) => (
                                    <BookCard key={singleBook.id} book={singleBook} />
                                ))}
                            </div>
                        )}
                        
                    </div>
                </div>

            </div>
        </main>
    );
};

export default BooksPage;