"use client";

import React from 'react';
import Link from 'next/link';
import { FaBookReader, FaBars, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import Marquee from 'react-fast-marquee';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully! Come back soon.", {
                        duration: 4000,
                        style: {
                            borderRadius: '16px',
                            background: '#0f172a',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }
                    });
                    router.push("/login");
                    router.refresh();
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Failed to terminate session safely.");
                }
            }
        });
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-base-100/70 backdrop-blur-md border-b border-base-content/10 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
            <Marquee
                speed={90}
                pauseOnHover
                gradient={false}
            >
                <div className='flex items-center mx-10'>
                    <img src="/images/book.png" className='w-5 h-5' alt="" />
                    <span className="mx-2">
                        New Arrival: The Human Genome
                    </span>
                </div>
                <div className='flex items-center mx-10'>
                    <img src="/images/books.png" className='w-5 h-5' alt="" />
                    <span className="mx-2">
                        Free Delivery on Borrowing 3+ Books
                    </span>
                </div>
                <div className='flex items-center mx-10'>
                    <img src="/images/gift.png" className='w-5 h-5' alt="" />
                    <span className="mx-2">
                        20% Discount on Premium Memberships
                    </span>
                </div>
                <div className='flex items-center mx-10'>
                    <img src="/images/reserve.png" className='w-5 h-5' alt="" />
                    <span className="mx-2">
                        Reserve popular books before they are gone
                    </span>
                </div>
            </Marquee>

            <div className="navbar max-w-6xl mx-auto h-16 px-4 sm:px-6">

                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm hover:bg-base-content/10 text-base-content/80 transition-all">
                            <FaBars className="text-lg" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-xl bg-base-100/95 backdrop-blur-lg rounded-xl w-52 border border-base-content/10 space-y-1 text-sm font-medium">
                            <li><Link href="/" className="rounded-lg py-2">Home</Link></li>
                            <li><Link href="/books" className="rounded-lg py-2">Browse Books</Link></li>
                            {user && (
                                <li><Link href="/dashboard" className="rounded-lg py-2">My Borrowed</Link></li>
                            )}
                        </ul>
                    </div>

                    <Link href="/" className="normal-case p-2 text-lg flex items-center gap-2 font-bold tracking-tight text-base-content transition-all active:scale-95">
                        <div className="p-1.5 bg-primary/10 rounded-xl text-primary shadow-sm border border-primary/10">
                            <FaBookReader className="text-xl" />
                        </div>
                        <span className="bg-blue-900 from-base-content to-base-content/70 bg-clip-text text-transparent hidden sm:inline">
                            eLIBRARY
                        </span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1.5 text-[14px] font-medium text-base-content/80">
                        <li>
                            <Link href="/" className="px-4 py-2 rounded-full hover:bg-base-content/5 hover:text-base-content transition-all duration-200">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/books" className="px-4 py-2 rounded-full hover:bg-base-content/5 hover:text-base-content transition-all duration-200">
                                Browse Books
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end gap-3">
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-base-content/10 ring-offset-base-100 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all duration-200">
                                {user.image ? (
                                    <div className="w-8 rounded-full">
                                        <img src={user.image} alt={user.name || "User Avatar"} />
                                    </div>
                                ) : (
                                    <div className="bg-primary/10 text-primary rounded-full w-8 flex items-center justify-center">
                                        <span className="text-xs font-bold">
                                            {user.name ? user.name.charAt(0).toUpperCase() : <FaUserAlt className="text-[10px]" />}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <ul tabIndex={0} className="mt-3 z-50 p-1.5 shadow-2xl menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-lg rounded-xl w-56 border border-base-content/10 text-sm">
                                <li className="px-3 py-2.5 border-b border-base-content/5 mb-1 pointer-events-none">
                                    <p className="font-semibold text-base-content leading-none truncate">{user.name || "User Account"}</p>
                                    <p className="text-xs text-base-content/50 truncate mt-1">{user.email}</p>
                                </li>
                                <li>
                                    <Link href="/profile" className="rounded-lg py-2 hover:bg-base-content/5">
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleSignOut}
                                        className="rounded-lg py-2 text-error hover:bg-error/10 active:bg-error/20 flex items-center gap-2 w-full text-left"
                                    >
                                        <FaSignOutAlt /> Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login" className="btn btn-ghost btn-sm text-[13px] font-medium rounded-full px-4 hover:bg-base-content/5 text-base-content/80 normal-case transition-all hidden sm:inline-flex">
                                Sign In
                            </Link>
                            <Link href="/register" className="btn btn-primary btn-sm text-[13px] font-medium rounded-full px-4 text-primary-content bg-primary hover:brightness-105 border-none shadow-[0_4px_12px_rgba(var(--p),0.2)] normal-case transition-all active:scale-95">
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;