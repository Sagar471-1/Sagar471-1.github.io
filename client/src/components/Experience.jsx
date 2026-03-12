import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".exp-header", {
                scrollTrigger: {
                    trigger: ".exp-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(".exp-item", {
                scrollTrigger: {
                    trigger: ".exp-list",
                    start: "top 80%",
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" ref={comp} className="exp-section relative z-10 py-32 bg-black/10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="exp-header mb-20 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-[#FBE4D8] mb-6 tracking-tight font-display">
                        Experience
                    </h2>
                    <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-[#522B5B] via-[#DFB6B2] to-[#854F6C] rounded-full"></div>
                </div>

                <div className="exp-list space-y-12 relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#522B5B] via-[#DFB6B2] to-[#854F6C] transform md:-translate-x-1/2 opacity-20 hidden md:block"></div>

                    {experience.map((item, idx) => (
                        <div key={idx} className={`exp-item relative flex flex-col md:flex-row items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            {/* Dot on timeline */}
                            <div className="absolute left-[-2px] md:left-1/2 w-5 h-5 bg-[#DFB6B2] rounded-full transform md:-translate-x-1/2 z-10 border-4 border-[#150B1F] shadow-[0_0_15px_#DFB6B2] hidden md:block"></div>

                            <div className="w-full md:w-[45%]">
                                <div className="p-8 rounded-[2rem] bg-[#150B1F]/60 backdrop-blur-md border border-[#522B5B]/30 hover:border-[#DFB6B2]/40 transition-all duration-500 group">
                                    <div className="flex items-center gap-3 text-[#DFB6B2] mb-4">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm font-medium tracking-widest">{item.duration}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#FBE4D8] mb-2 font-display group-hover:text-[#DFB6B2] transition-colors">{item.title}</h3>
                                    <div className="flex items-center gap-2 text-[#854F6C] mb-4 font-medium italic">
                                        <Briefcase className="w-4 h-4" />
                                        <span>{item.organization}</span>
                                    </div>
                                    <p className="text-[#FBE4D8]/70 leading-relaxed font-light">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:block w-[45%]"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
