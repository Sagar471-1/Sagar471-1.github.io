import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import { certifications } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".cert-header", {
                scrollTrigger: {
                    trigger: ".cert-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(".cert-card", {
                scrollTrigger: {
                    trigger: ".cert-grid",
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <section id="certifications" ref={comp} className="cert-section relative z-10 py-32 bg-black/20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="cert-header mb-20 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-[#FBE4D8] mb-6 tracking-tight font-display">
                        Certifications
                    </h2>
                    <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-[#522B5B] via-[#DFB6B2] to-[#854F6C] rounded-full"></div>
                </div>

                <div className="cert-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, idx) => (
                        <div key={idx} className="cert-card group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#522B5B] to-[#854F6C] rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                            <div className="relative p-8 rounded-3xl bg-[#150B1F]/60 backdrop-blur-md border border-[#522B5B]/30 hover:border-[#DFB6B2]/40 transition-all duration-500 h-full flex flex-col justify-between overflow-hidden shadow-xl">
                                {/* Watermark icon */}
                                <Award className="absolute -bottom-6 -right-6 w-32 h-32 text-[#DFB6B2]/5 group-hover:text-[#DFB6B2]/10 transition-colors transform group-hover:rotate-12 duration-700" />

                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-[#050205] rounded-xl text-[#DFB6B2] shadow-lg group-hover:scale-110 transition-transform duration-500">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[#854F6C] text-xs font-bold uppercase tracking-widest">{cert.issuer}</span>
                                            <span className="text-[#FBE4D8]/40 text-[10px] tracking-widest">{cert.date}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-[#FBE4D8] mb-6 font-display line-clamp-2 min-h-[3.5rem] group-hover:text-[#DFB6B2] transition-colors">{cert.title}</h3>
                                </div>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[#DFB6B2]/60 text-xs font-semibold uppercase tracking-widest">
                                        <Award className="w-3 h-3" />
                                        <span>Verified Entry</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#050205] flex items-center justify-center border border-[#FBE4D8]/10 group-hover:border-[#DFB6B2]/40 group-hover:bg-[#DFB6B2] group-hover:text-[#050205] transition-all duration-500">
                                        <ExternalLink className="w-4 h-4" />
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
