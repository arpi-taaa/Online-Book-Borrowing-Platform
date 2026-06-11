"use client";

import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Review = () => {
    const reviews = [
        {
            id: 1,
            name: "Delphin",
            role: "Student (Antropology)",
            rating: 5,
            comment: "The automated circulation tracking is incredibly smooth. Finding academic referencing papers for digital logic design assignments takes me seconds now instead of hours.",
            initials: "De"
        },
        {
            id: 2,
            name: "Zayan Ahmed",
            role: "Student (EEE)",
            rating: 5,
            comment: "I love the clean interface. The email alert system for book return deadlines completely eliminates unexpected late fees. Highly recommended for university students.",
            initials: "ZA"
        },
        {
            id: 3,
            name: "Muhammad Abdullah",
            role: "Student (Software Engineering)",
            rating: 4,
            comment: "Excellent platform architecture. The book search filters are highly accurate, and the digital membership checkout process is fast and seamless.",
            initials: "MA"
        }
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-2 mb-12">
                <span className="text-xs uppercase font-bold tracking-widest text-primary">
                    Community Feedback
                </span>
                <h2 className="text-3xl font-black text-slate-950 tracking-tight sm:text-4xl leading-none pt-1">
                    What Our Readers Say
                </h2>
                <p className="text-base text-slate-600 font-medium max-w-md mx-auto pt-1">
                    Real testimonials from students and educators utilizing our digital library ecosystem.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <div 
                        key={review.id} 
                        className="group relative bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] transition-all duration-300 active:scale-[0.99] overflow-hidden"
                    >
                        <FaQuoteLeft className="text-primary/5 text-5xl absolute -top-2 -left-1 pointer-events-none group-hover:text-primary/10 transition-colors duration-300" />
                        
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-amber-400 text-xs" />
                                ))}
                                {review.rating < 5 && (
                                    <FaStar className="text-slate-200 text-xs" />
                                )}
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed font-medium italic min-h-18">
                                "{review.comment}"
                            </p>
                        </div>

                        <div className="flex items-center gap-3 pt-4 mt-6 border-t border-slate-50 relative z-10">
                            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shadow-inner group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300">
                                {review.initials}
                            </div>
                            <div>
                                <h4 className="font-extrabold text-sm text-slate-950 leading-none">
                                    {review.name}
                                </h4>
                                <p className="text-[10px] text-slate-400 font-bold tracking-wide uppercase mt-1">
                                    {review.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Review;