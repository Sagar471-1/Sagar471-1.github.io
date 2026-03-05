import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlowingEffect } from './ui/glowing-effect';
import { Briefcase, Sparkles, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const comp = useRef();
    const profileRef = useRef();
    const bioCardsRef = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Animated title with split effect
            gsap.from(".about-title", {
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: "power4.out"
            });

            // Underline animation
            gsap.from(".about-underline", {
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                scaleX: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.inOut"
            });

            // Profile card with rotation
            gsap.from(".profile-card", {
                scrollTrigger: {
                    trigger: ".about-content",
                    start: "top 75%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                x: -100,
                opacity: 0,
                rotateY: -15,
                duration: 1,
                ease: "power3.out"
            });

            // Bio cards staggered animation
            gsap.from(".bio-card", {
                scrollTrigger: {
                    trigger: ".bio-cards-container",
                    start: "top 75%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                x: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });

            // Stats with counter animation
            gsap.from(".stat-card", {
                scrollTrigger: {
                    trigger: ".stats-container",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                y: 60,
                opacity: 0,
                scale: 0.8,
                duration: 0.7,
                stagger: 0.12,
                ease: "back.out(1.4)"
            });

            // Floating animation for profile
            gsap.to(".profile-circle", {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Parallax effect on scroll
            gsap.to(".bio-card", {
                scrollTrigger: {
                    trigger: ".bio-cards-container",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                y: (i) => -30 * (i + 1),
                ease: "none"
            });

        }, comp);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={comp} className="about-section min-h-screen flex flex-col items-center justify-center px-4 md:px-20 relative z-10 py-32 overflow-hidden bg-gradient-to-br from-[#522B5B]/10 via-[#150B1F]/20 to-[#854F6C]/10 rounded-3xl mx-4 md:mx-8 backdrop-blur-[2px] will-change-transform">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#522B5B]/10 rounded-full blur-2xl animate-pulse will-change-opacity"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#854F6C]/10 rounded-full blur-2xl animate-pulse will-change-opacity" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Section Header */}
            <div className="about-header text-center mb-20 relative z-10">
                <h2 className="about-title text-5xl md:text-7xl font-bold text-[#FBE4D8] mb-6 tracking-tight">
                    About Me
                </h2>
                <div className="about-underline w-32 h-1.5 mx-auto bg-gradient-to-r from-[#522B5B] via-[#DFB6B2] to-[#854F6C] rounded-full shadow-lg shadow-[#DFB6B2]/50"></div>
            </div>

            {/* Main Content Grid */}
            <div className="about-content w-full max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-10 mb-20 relative z-10">
                {/* Left Column - Enhanced Profile Card */}
                <div ref={profileRef} className="lg:col-span-2 flex flex-col items-center lg:items-start profile-card">
                    <div className="relative group w-full">
                        {/* Animated Gradient Ring */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#522B5B] via-[#854F6C] to-[#DFB6B2] rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>

                        {/* Profile Card Container */}
                        <div className="relative bg-[#150B1F]/60 backdrop-blur-md border border-[#522B5B]/30 rounded-3xl p-8 shadow-2xl will-change-transform">
                            <GlowingEffect
                                spread={50}
                                glow={true}
                                disabled={false}
                                proximity={80}
                                inactiveZone={0.01}
                                borderWidth={2}
                                movementDuration={0.4}
                            />

                            {/* Profile Circle with Float Animation */}
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="absolute -inset-3 bg-gradient-to-r from-[#522B5B] via-[#854F6C] to-[#DFB6B2] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                                    <div className="profile-circle relative w-32 h-32 rounded-full bg-gradient-to-br from-[#522B5B] via-[#854F6C] to-[#DFB6B2] flex items-center justify-center text-5xl font-bold text-[#FBE4D8] shadow-2xl transform hover:scale-110 transition-transform duration-300 will-change-transform">
                                        S
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-3xl font-bold text-[#FBE4D8] mb-3 text-center">
                                Sagar Kumar Prajapati
                            </h3>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center justify-center gap-2 text-[#DFB6B2] text-sm font-medium uppercase tracking-widest">
                                    <Briefcase className="w-4 h-4" />
                                    <span>Data Analyst</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-[#854F6C] text-sm font-medium uppercase tracking-widest">
                                    <Sparkles className="w-4 h-4" />
                                    <span>Python Developer</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-[#DFB6B2]/80 text-sm font-medium uppercase tracking-widest">
                                    <GraduationCap className="w-4 h-4" />
                                    <span>B.Tech Student</span>
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <div className="flex justify-center gap-2 mt-6">
                                <div className="w-2 h-2 rounded-full bg-[#522B5B] animate-pulse"></div>
                                <div className="w-2 h-2 rounded-full bg-[#854F6C] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 rounded-full bg-[#DFB6B2] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Enhanced Bio Cards */}
                <div ref={bioCardsRef} className="lg:col-span-3 space-y-5 bio-cards-container">
                    <div className="bio-card relative group will-change-transform">
                        <div className="relative bg-[#150B1F]/50 backdrop-blur-md border border-[#522B5B]/30 rounded-2xl p-8 hover:border-[#DFB6B2]/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#522B5B]/20">
                            <div className="relative z-10">
                                <p className="text-[#FBE4D8]/90 text-lg leading-relaxed">
                                    Dedicated <span className="text-[#DFB6B2] font-semibold">Data Analyst</span> and <span className="text-[#854F6C] font-semibold">Python Developer</span> at Lovely Professional University, focused on turning raw data into meaningful stories.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bio-card relative group will-change-transform">
                        <div className="relative bg-[#150B1F]/50 backdrop-blur-md border border-[#522B5B]/30 rounded-2xl p-8 hover:border-[#DFB6B2]/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#854F6C]/20">
                            <div className="relative z-10">
                                <p className="text-[#FBE4D8]/90 text-lg leading-relaxed">
                                    Specializing in <span className="text-[#DFB6B2] font-semibold">Data Structures and Algorithms</span> with a strong foundation in <span className="text-[#854F6C] font-semibold">Machine Learning</span> and statistical EDA.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bio-card relative group will-change-transform">
                        <div className="relative bg-[#150B1F]/50 backdrop-blur-md border border-[#522B5B]/30 rounded-2xl p-8 hover:border-[#DFB6B2]/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#DFB6B2]/20">
                            <div className="relative z-10">
                                <p className="text-[#FBE4D8]/90 text-lg leading-relaxed">
                                    Passionate about <span className="text-[#DFB6B2] font-semibold">C++, Python, and SQL</span> — always striving to optimize algorithms and solve complex problems with efficient code.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Stats Container */}
            <div className="stats-container w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative z-10">
                <div className="stat-card group relative overflow-hidden will-change-transform">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#522B5B] to-[#854F6C] rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                    <div className="relative bg-[#150B1F]/50 backdrop-blur-md border border-[#522B5B]/30 rounded-3xl p-10 hover:border-[#DFB6B2]/50 transition-all duration-500 transform hover:scale-105">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#522B5B]/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 text-center">
                            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FBE4D8] to-[#DFB6B2] mb-3">79.6%</div>
                            <div className="text-sm text-[#DFB6B2] uppercase tracking-widest font-semibold">Intermediate Score</div>
                        </div>
                    </div>
                </div>

                <div className="stat-card group relative overflow-hidden will-change-transform">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#854F6C] to-[#DFB6B2] rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                    <div className="relative bg-[#150B1F]/50 backdrop-blur-md border border-[#522B5B]/30 rounded-3xl p-10 hover:border-[#DFB6B2]/50 transition-all duration-500 transform hover:scale-105">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#854F6C]/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 text-center">
                            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FBE4D8] to-[#DFB6B2] mb-3">3</div>
                            <div className="text-sm text-[#DFB6B2] uppercase tracking-widest font-semibold">Key Projects</div>
                        </div>
                    </div>
                </div>

                <div className="stat-card group relative overflow-hidden will-change-transform">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DFB6B2] to-[#522B5B] rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                    <div className="relative bg-[#150B1F]/50 backdrop-blur-md border border-[#522B5B]/30 rounded-3xl p-10 hover:border-[#DFB6B2]/50 transition-all duration-500 transform hover:scale-105">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#DFB6B2]/30 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 text-center">
                            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FBE4D8] to-[#DFB6B2] mb-3">12+</div>
                            <div className="text-sm text-[#DFB6B2] uppercase tracking-widest font-semibold">Skills Mastered</div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
