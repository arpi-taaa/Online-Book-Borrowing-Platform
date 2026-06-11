"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaShieldAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        if (!isPending && !user) {
            router.push("/login");
        }
    }, [user, isPending, router]);

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

    if (isPending) {
        return (
            <main className="min-h-[85vh] flex items-center justify-center bg-base-100">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <span className="loading loading-ring loading-lg text-primary"></span>
                    <p className="text-xs font-bold text-slate-400 tracking-wider uppercase animate-pulse">
                        Verifying Library Credentials...
                    </p>
                </div>
            </main>
        );
    }

    if (!user) {
        return null;
    }

    const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }) : 'Active Member';

    return (
        <main className="min-h-[85vh] bg-base-100 py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto space-y-6">
                
                <div className="w-full bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left relative overflow-hidden">
                
                    <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100/50 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Authorized
                    </div>

                    <div className="avatar">
                        <div className="w-24 h-24 rounded-2xl ring-4 ring-primary/10 shadow-inner bg-slate-100 relative">
                            {user.image ? (
                                <img src={user.image} alt={user.name} className="object-cover" />
                            ) : (
                                <FaUserCircle className="w-full h-full text-slate-300" />
                            )}
                        </div>
                    </div>

                    <div className="space-y-1 grow">
                        <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none">
                            {user.name}
                        </h1>
                        <p className="text-xs text-primary font-bold">
                            eLibrary Network Account
                        </p>
                        <p className="text-xs text-slate-400 font-medium pt-1">
                            USER ID: <span className="font-mono text-slate-500 select-all">{user.id.substring(0, 12)}...</span>
                        </p>
                    </div>

                    <div className="shrink-0 pt-2 sm:pt-0">
                        <Link 
                            href="/profile/update" 
                            className="btn btn-primary btn-md rounded-xl normal-case text-xs font-bold bg-primary text-primary-content border-none shadow-sm gap-2 transition-all active:scale-95 px-5"
                        >
                            <FaUserEdit className="text-sm" />
                            Update Profile
                        </Link>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.01)] overflow-hidden divide-y divide-slate-50">
                    
                    <div className="p-6 bg-slate-50/40">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">User Information</h2>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">Secure registration properties recorded on our decentralized authentication database</p>
                    </div>

                    <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <div className="sm:w-48 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 shrink-0">
                            <FaUserCircle className="text-slate-300 text-sm" />
                            Full Registered Name
                        </div>
                        <div className="text-sm font-bold text-slate-800 leading-none">
                            {user.name}
                        </div>
                    </div>

                    <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <div className="sm:w-48 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 shrink-0">
                            <FaEnvelope className="text-slate-300 text-sm" />
                            Email Address
                        </div>
                        <div className="text-sm font-semibold text-slate-700 select-all">
                            {user.email}
                        </div>
                    </div>

                    <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <div className="sm:w-48 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 shrink-0">
                            <FaCalendarAlt className="text-slate-300 text-sm" />
                            Account Created On
                        </div>
                        <div className="text-sm font-medium text-slate-600">
                            {joinDate}
                        </div>
                    </div>

                    <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <div className="sm:w-48 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 shrink-0">
                            <FaShieldAlt className="text-slate-300 text-sm" />
                            Verification Status
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`badge border-none rounded-md font-bold text-[10px] px-2.5 py-1 ${
                                user.emailVerified 
                                    ? "bg-emerald-100 text-emerald-700" 
                                    : "bg-amber-100 text-amber-700"
                            }`}>
                                {user.emailVerified ? "Email Verified" : "Pending Verification"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end pt-2">
                    <button
                        onClick={handleSignOut}
                        className="btn btn-ghost btn-sm text-xs font-bold text-red-500 rounded-xl px-4 hover:bg-red-50 transition-all normal-case gap-2"
                    >
                        <FaSignOutAlt className="text-xs" />
                        Terminate Active Session
                    </button>
                </div>

            </div>
        </main>
    );
};

export default ProfilePage;