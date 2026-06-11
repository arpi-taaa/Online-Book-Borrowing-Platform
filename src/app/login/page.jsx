"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaShieldAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const toastConfig = {
        duration: 4000,
        style: {
            borderRadius: '16px',
            background: '#0f172a',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'bold'
        }
    };

    const handleLogin = async (data) => {
        await authClient.signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: "/",
        }, {
            onSuccess: () => {
                toast.success("Welcome back! Signed in with Google securely.", toastConfig);
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "Google Sign-In failed.");
            }
        });
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/"
            }, {
                onSuccess: () => {
                    toast.success("Welcome back! Signed in with Google securely.", toastConfig);
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Google Sign-In failed.");
                }
            });
        } catch (error) {
            console.error("Google Sign-In failed:", error);
        }
    };

    return (
        <main className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-100 bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6">

                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary/10 text-primary rounded-2xl border border-primary/5">
                        <FaShieldAlt className="text-xl" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-950 tracking-tight pt-1">
                        Account Login
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">
                        Access Our Online Book Borrowing Platform
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                            Email Address
                        </label>
                        <div className="relative flex items-center">
                            <FaEnvelope className="absolute left-4 text-slate-400 text-sm" />
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="name@example.com"
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 focus:border-primary/50 focus:bg-white rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <FaLock className="absolute left-4 text-slate-400 text-sm" />
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", { required: "Password is required" })}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-100 focus:border-primary/50 focus:bg-white rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full rounded-xl normal-case text-xs font-bold bg-primary hover:brightness-105 border-none shadow-sm text-primary-content h-12 mt-2 transition-all active:scale-98"
                    >
                        Sign In
                    </button>
                </form>

                <div className="relative flex py-2 items-center text-slate-300">
                    <div className="grow border-t border-slate-100"></div>
                    <span className="shrink mx-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">or continue with</span>
                    <div className="grow border-t border-slate-100"></div>
                </div>

                {/* Google OAuth Option */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full h-12 border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center gap-2.5 text-xs font-bold text-slate-700 transition-all active:scale-98 shadow-sm"
                >
                    <FcGoogle className="text-lg" />
                    Continue with Google
                </button>

                <p className="text-center text-xs text-slate-500 font-medium pt-2">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-primary font-bold hover:underline transition-all">
                        Register here
                    </Link>
                </p>

            </div>
        </main>
    );
};

export default LoginPage;