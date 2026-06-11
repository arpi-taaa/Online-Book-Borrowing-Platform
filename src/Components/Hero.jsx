"use client";

import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaSearch, FaBook, FaStar, FaBookmark } from 'react-icons/fa';

const Hero = () => {
    return (
        /* 1. Added your local /images/hero.png as a background image.
          2. 'bg-cover bg-center' ensures it scales perfectly without stretching.
          3. Replaced 'bg-base-100' with a dark or translucent tint overlay (bg-neutral-focus/80) 
             mixed with a backdrop-blur so your white/colored text remains perfectly readable.
        */
        <div 
            className="relative isolate overflow-hidden bg-cover bg-center py-24 sm:py-32"
            style={{ backgroundImage: "url('/images/hero.png')" }}
        >
            <div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-[1px] -z-10" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Content (Updated colors to stand out on dark images) */}
                    <div className="lg:col-span-7 text-center lg:text-left space-y-6">
                        
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-content text-xs font-semibold border border-primary/30 tracking-wide">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                            Discover Your Next Adventure
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                            Find Your <br />
                            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                Next Read
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                            Dive into a massive digital ecosystem filled with thousands of books, academic papers, and timeless literature. Borrow instantly and track everything in one dashboard.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                            <Link 
                                href="/books" 
                                className="btn btn-primary btn-md rounded-full px-8 normal-case text-sm font-bold text-primary-content shadow-[0_4px_14px_rgba(var(--p),0.3)] hover:brightness-105 border-none transition-all duration-200 active:scale-95 flex items-center gap-2 group"
                            >
                                Browse Now
                                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Premium Floating Book Display Frame */}
                    <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-secondary/10 blur-3xl -z-10" />

                        <div className="w-full max-w-85 bg-base-100/90 backdrop-blur-md border border-base-content/10 rounded-2xl shadow-2xl p-6 space-y-5 transform hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-center justify-between border-b border-base-content/5 pb-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-base-content/40">Trending Book</span>
                                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                                    <FaStar /> 4.9
                                </div>
                            </div>

                            <div className="flex gap-4 items-center bg-base-200/50 p-3 rounded-xl border border-base-content/5">
                                <div className="w-14 h-20 bg-linear-to-br from-primary to-secondary rounded-lg shadow-md flex items-center justify-center text-primary-content">
                                    <FaBook className="text-xl" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-base-content truncate max-w-40">The Digital Horizon</h4>
                                    <p className="text-xs text-base-content/60">by Tech Authors</p>
                                    <span className="badge badge-xs badge-outline text-[9px] font-semibold opacity-70 p-1.5">Available</span>
                                </div>
                            </div>

                            <div className="space-y-2.5 pt-1 text-xs font-medium text-base-content/80">
                                <div className="flex items-center gap-2">
                                    <FaBookmark className="text-primary/70 shrink-0" />
                                    <span>Save & queue books into your profile</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaBook className="text-secondary/70 shrink-0" />
                                    <span>One-click digital borrowing passes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;