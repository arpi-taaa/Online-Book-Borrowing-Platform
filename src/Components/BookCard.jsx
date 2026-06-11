"use client";

import React from 'react';
import Link from 'next/link';
import { FaBook, FaArrowRight, FaTags } from 'react-icons/fa';

const BookCard = ({ book }) => {
    return (
        
        <div className="group relative bg-white border border-slate-100 rounded-3xl p-5 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] transition-all duration-300 active:scale-[0.99] w-full max-w-90 mx-auto overflow-hidden">
            
            <div className="relative w-full aspect-4/5 rounded-2xl overflow-hidden mb-5 flex items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors">
                
                <img 
                    src={book.image_url} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                
                <FaBook className="absolute text-5xl text-slate-200 opacity-20 group-hover:opacity-10 transition-opacity" />

                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 right-3 px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-[10px] font-bold text-slate-700 border border-slate-100 shadow-sm flex items-center gap-1.5 group-hover:bg-white transition-colors">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-success" />
                    {book.available_quantity} available
                </div>
            </div>

            <div className="space-y-1.5 flex-1">

                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium tracking-wide">
                    <FaTags className="shrink-0" />
                    <span>{book.category}</span>
                </div>

                <div className="pt-1">
                    <h3 className="font-extrabold text-lg text-slate-950 leading-tight tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                        {book.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-0.5 truncate">
                        by {book.author}
                    </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 line-clamp-2 min-h-10">
                    {book.description}
                </p>
            </div>

            <div className="pt-6 mt-auto">
                <Link 
                    href={`/books/${book.id}`} 
                    className="btn btn-primary btn-sm w-full rounded-xl normal-case text-xs font-bold gap-2 text-primary-content bg-primary hover:brightness-105 border-none shadow-[0_4px_14px_rgba(var(--p),0.2)] transition-all group-hover:gap-2.5 active:scale-95"
                >
                    View Details
                    <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

        </div>
    );
};

export default BookCard;