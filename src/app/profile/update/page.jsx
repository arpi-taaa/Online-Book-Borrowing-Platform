"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FaUser, FaLink, FaUserEdit } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';

const UpdateProfilePage = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || "",
            image: user?.image || ""
        }
    });

    const onUpdateSubmit = async (data) => {
        const { name, image } = data;

        const { data: res, error } = await authClient.updateUser({
            name: name,
            image: image,
        });

        if (error) {
            console.error("Failed to update profile:", error.message);
        } else {
            router.push("/profile");
            router.refresh();
        }
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6">
                
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                        <FaUserEdit className="text-xl" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-950 tracking-tight">Update Information</h1>
                    <p className="text-xs text-slate-500 font-medium">Modify your library profile identification</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onUpdateSubmit)}>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Full Name</label>
                        <div className="relative flex items-center">
                            <FaUser className="absolute left-4 text-slate-400 text-sm" />
                            <input
                                type="text"
                                {...register("name", { required: "Name cannot be empty" })}
                                placeholder="Update your name"
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 focus:border-primary/50 focus:bg-white rounded-xl text-sm font-medium text-slate-800 focus:outline-none transition-all"
                            />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Profile Image URL</label>
                        <div className="relative flex items-center">
                            <FaLink className="absolute left-4 text-slate-400 text-xs" />
                            <input
                                type="url"
                                {...register("image")}
                                placeholder="https://example.com/new-avatar.jpg"
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 focus:border-primary/50 focus:bg-white rounded-xl text-sm font-medium text-slate-800 focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full rounded-xl normal-case text-xs font-bold bg-primary hover:brightness-105 border-none shadow-sm text-primary-content h-12 mt-2 transition-all active:scale-98"
                    >
                        Update Information
                    </button>
                </form>
            </div>
        </main>
    );
};

export default UpdateProfilePage;