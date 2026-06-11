import React from 'react';
import Link from 'next/link';
import { FaBookOpen, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-4 md:mt-6 lg:mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                
                <div className="space-y-4 md:col-span-1">
                    <div className="flex items-center gap-3 text-white">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl border border-primary/20">
                            <FaBookOpen className="text-xl" />
                        </div>
                        <span className="text-lg font-black tracking-tight text-white leading-none">
                            eLibrary Network
                        </span>
                    </div>
                    <p className="text-[12px] text-slate-400 font-medium leading-relaxed max-w-xs">
                        A centralized digital library platform designed for all age of people to easily browse, search, and borrow academic and fiction volumes.
                    </p>
                </div>

                <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white pl-1">
                        Navigation
                    </h3>
                    <ul className="space-y-2 text-xs font-medium">
                        <li>
                            <Link href="/" className="hover:text-primary transition-colors pl-1 py-1 block">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/books" className="hover:text-primary transition-colors pl-1 py-1 block">
                                Library Catalog
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile" className="hover:text-primary transition-colors pl-1 py-1 block">
                                My Profile
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="space-y-3 md:col-span-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white pl-1">
                        Contact Us
                    </h3>
                    <ul className="space-y-2.5 text-[12px] font-medium text-slate-400">
                        <li className="flex items-center gap-3">
                            <FaPhone className="text-slate-500 text-xs shrink-0" />
                            <span>+880 1700-000000</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-slate-500 text-xs shrink-0" />
                            <span className="break-all">support@elibrary.edu.bd</span>
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white pl-1">
                        Connect With Us
                    </h3>
                    <p className="text-[12px] text-slate-400 font-medium leading-relaxed">
                        Follow our network feeds for system updates, new arrivals, and special literary bulletin announcements.
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                        <a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            aria-label="Facebook" 
                            className="p-2.5 bg-slate-900 hover:bg-primary text-slate-300 hover:text-primary-content rounded-xl transition-all duration-300 active:scale-95"
                        >
                            <FaFacebook className="text-base" />
                        </a>
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            aria-label="Twitter" 
                            className="p-2.5 bg-slate-900 hover:bg-primary text-slate-300 hover:text-primary-content rounded-xl transition-all duration-300 active:scale-95"
                        >
                            <FaTwitter className="text-base" />
                        </a>
                        <a 
                            href="https://instagram.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            aria-label="Instagram" 
                            className="p-2.5 bg-slate-900 hover:bg-primary text-slate-300 hover:text-primary-content rounded-xl transition-all duration-300 active:scale-95"
                        >
                            <FaInstagram className="text-base" />
                        </a>
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noreferrer" 
                            aria-label="LinkedIn" 
                            className="p-2.5 bg-slate-900 hover:bg-primary text-slate-300 hover:text-primary-content rounded-xl transition-all duration-300 active:scale-95"
                        >
                            <FaLinkedin className="text-base" />
                        </a>
                    </div>
                </div>

            </div>

            <div className="border-t border-slate-900/80">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:fllex-row items-center justify-center gap-4 text-[11px] font-bold text-slate-500 tracking-wide">
                    <p>
                        © {currentYear} eLibrary Network Platform. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;