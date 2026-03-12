import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { education } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".edu-header", {
                scrollTrigger: {
                    trigger: ".edu-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(".edu-card", {
                scrollTrigger: {
                    trigger: ".edu-grid",
                    start: "top 80%",
                },
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.2)"
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <section id="education" ref={comp} className="edu-section relative z-10 py-32">
            <div className="max-w-7xl mx-auto px-4">
                <div className="edu-header mb-20 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-[#FBE4D8] mb-6 tracking-tight font-display">
                        Education
                    </h2>
                    <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-[#522B5B] via-[#DFB6B2] to-[#854F6C] rounded-full"></div>
                </div>

                <div className="edu-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {education.map((item, idx) => (
                        <div key={idx} className="edu-card relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#522B5B] via-[#854F6C] to-[#DFB6B2] rounded-[2.5rem] blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                            <div className="relative h-full p-8 md:p-10 rounded-[2.5rem] bg-[#150B1F]/60 backdrop-blur-xl border border-[#FBE4D8]/10 flex flex-col justify-between hover:border-[#DFB6B2]/40 transition-all duration-500 overflow-hidden">
                                {/* Decorative circle */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#DFB6B2]/5 rounded-full blur-3xl group-hover:bg-[#DFB6B2]/10 transition-colors"></div>

                                <div>
                                    <div className="p-4 bg-[#050205] rounded-2xl w-fit mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                        <GraduationCap className="w-8 h-8 text-[#DFB6B2]" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#FBE4D8] mb-4 font-display leading-tight">{item.institution}</h3>
                                    <p className="text-[#DFB6B2] font-semibold text-lg mb-6 leading-snug">{item.degree}</p>

                                    <div className="space-y-3">
                                        {item.duration && (
                                            <div className="flex items-center gap-3 text-[#FBE4D8]/60 text-sm">
                                                <Calendar className="w-4 h-4 text-[#854F6C]" />
                                                <span>{item.duration}</span>
                                            </div>
                                        )}
                                        {item.location && (
                                            <div className="flex items-center gap-3 text-[#FBE4D8]/60 text-sm">
                                                <MapPin className="w-4 h-4 text-[#854F6C]" />
                                                <span>{item.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {item.percentage && (
                                    <div className="mt-10 flex items-center justify-between p-4 bg-[#050205]/40 rounded-2xl border border-[#FBE4D8]/5">
                                        <span className="text-[#FBE4D8]/40 uppercase tracking-widest text-xs font-bold">Performance</span>
                                        <div className="flex items-center gap-2">
                                            <Award className="w-4 h-4 text-[#DFB6B2]" />
                                            <span className="text-2xl font-bold text-[#FBE4D8]">{item.percentage}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
