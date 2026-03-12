import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Star, Target, Zap } from 'lucide-react';
import { achievements } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".ach-header", {
                scrollTrigger: {
                    trigger: ".ach-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(".ach-item", {
                scrollTrigger: {
                    trigger: ".ach-list",
                    start: "top 80%",
                },
                x: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    const icons = [<Trophy />, <Star />, <Target />, <Zap />];

    return (
        <section id="achievements" ref={comp} className="ach-section relative z-10 py-32 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#522B5B]/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#854F6C]/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-4">
                <div className="ach-header mb-20 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-[#FBE4D8] mb-6 tracking-tight font-display">
                        Achievements
                    </h2>
                    <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-[#522B5B] via-[#DFB6B2] to-[#854F6C] rounded-full shadow-lg"></div>
                </div>

                <div className="ach-list grid grid-cols-1 gap-6 relative">
                    {achievements.map((ach, idx) => (
                        <div key={idx} className="ach-item group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#522B5B] via-[#854F6C] to-[#DFB6B2] rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                            <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 rounded-3xl bg-[#150B1F]/60 backdrop-blur-xl border border-[#522B5B]/30 hover:border-[#DFB6B2]/40 transition-all duration-500 shadow-2xl">
                                <div className="p-6 bg-[#050205] rounded-[2rem] text-[#DFB6B2] shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                    {React.cloneElement(icons[idx % icons.length], { className: "w-10 h-10" })}
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#FBE4D8] mb-4 font-display group-hover:text-[#DFB6B2] transition-colors tracking-tight">
                                        {ach}
                                    </h3>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <span className="px-4 py-1 rounded-full bg-[#DFB6B2]/10 text-[#DFB6B2] text-xs font-bold uppercase tracking-widest border border-[#DFB6B2]/20">Honored</span>
                                        <span className="px-4 py-1 rounded-full bg-[#854F6C]/10 text-[#854F6C] text-xs font-bold uppercase tracking-widest border border-[#854F6C]/20">Verified</span>
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <div className="w-16 h-16 rounded-full border-2 border-[#FBE4D8]/10 flex items-center justify-center group-hover:border-[#DFB6B2]/40 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-[#DFB6B2] animate-ping"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
