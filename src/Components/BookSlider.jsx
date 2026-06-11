"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper core CSS styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const BookSlider = () => {
    // 1. Array containing your custom image URLs and slide descriptions
    const bannerSlides = [
        { 
            id: 1, 
            title: "Explore Boundless Knowledge", 
            desc: "Access thousands of academic publications, programming manuals, and classic storytelling novels instantly.", 
            image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1200" // Cozy Library Image
        },
        { 
            id: 2, 
            title: "Zero Late Fees This Semester", 
            desc: "Keep track of active borrow limits and return digital volumes securely right through your personal student dashboard.", 
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200" // Modern Study Space Image
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 my-8">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    effect={'fade'}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className="h-64 md:h-80"
                >
                    {bannerSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            {/* 2. Background container utilizing the custom image url */}
                            <div 
                                className="w-full h-full bg-cover bg-center relative flex flex-col justify-center px-8 md:px-16 space-y-3"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                {/* 3. The Dark Overlay Filter (Ensures white text stands out beautifully over bright pixels) */}
                                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs z-0" />

                                {/* Text content wrapper - locked to z-10 to stay on top of the dark filter */}
                                <div className="relative z-10 flex flex-col space-y-3">
                                    <span className="badge badge-primary bg-primary/20 text-primary border-none text-[10px] font-black uppercase tracking-widest px-3 py-2 w-fit">
                                        Library Bulletin
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-black tracking-tight max-w-xl leading-none text-white">
                                        {slide.title}
                                    </h2>
                                    <p className="text-xs md:text-sm text-white/80 max-w-md font-medium leading-relaxed">
                                        {slide.desc}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default BookSlider;