import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, FolderGit, GitPullRequest, Star, Share2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function OpenSource() {
    const comp = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".os-header", {
                scrollTrigger: {
                    trigger: ".os-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.from(".os-card", {
                scrollTrigger: {
                    trigger: ".os-content",
                    start: "top 80%",
                },
                scale: 0.95,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    const githubUser = personalInfo.github.split('/').pop();

    return (
        <section id="opensource" ref={comp} className="os-section relative z-10 py-32 bg-black/10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="os-header mb-20 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-[#FBE4D8] mb-6 tracking-tight font-display">
                        Open Source
                    </h2>
                    <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-[#522B5B] via-[#DFB6B2] to-[#854F6C] rounded-full"></div>
                </div>

                <div className="os-content grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* GitHub Stats Card */}
                    <div className="os-card flex flex-col gap-6">
                        <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#150B1F]/60 backdrop-blur-xl border border-[#522B5B]/30 shadow-2xl overflow-hidden relative group">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#522B5B]/10 rounded-full blur-3xl group-hover:bg-[#522B5B]/20 transition-all duration-700"></div>

                            <div className="flex items-center gap-6 mb-10">
                                <div className="p-5 bg-black rounded-3xl shadow-2xl border border-[#FBE4D8]/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                    <Github className="w-10 h-10 text-[#DFB6B2]" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-[#FBE4D8] font-display">GitHub Profile</h3>
                                    <p className="text-[#DFB6B2]/60 tracking-widest uppercase text-xs font-bold">@{githubUser}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col gap-4">
                                    <img
                                        src={`https://github-readme-stats.vercel.app/api?username=${githubUser}&show_icons=true&theme=vue-dark&bg_color=150B1F&title_color=DFB6B2&text_color=FBE4D8&icon_color=854F6C&hide_border=true&include_all_commits=true&count_private=true`}
                                        alt="GitHub Stats"
                                        className="w-full rounded-2xl border border-[#522B5B]/20"
                                    />
                                    <img
                                        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUser}&layout=compact&theme=vue-dark&bg_color=150B1F&title_color=DFB6B2&text_color=FBE4D8&icon_color=854F6C&hide_border=true`}
                                        alt="Top Languages"
                                        className="w-full rounded-2xl border border-[#522B5B]/20"
                                    />
                                </div>
                            </div>
                        </div>

                        <a
                            href={personalInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-6 rounded-2xl bg-gradient-to-r from-[#522B5B] to-[#854F6C] text-[#FBE4D8] font-bold text-center flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform duration-300 shadow-xl tracking-widest uppercase text-sm"
                        >
                            <Github className="w-5 h-5" />
                            Visit GitHub Workspace
                        </a>
                    </div>

                    {/* Contributions & Repos Section */}
                    <div className="os-card flex flex-col gap-6">
                        <div className="p-8 md:p-10 rounded-[2.5rem] bg-[#150B1F]/60 backdrop-blur-xl border border-[#522B5B]/30 shadow-2xl overflow-hidden relative group h-full">
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#854F6C]/10 rounded-full blur-3xl group-hover:bg-[#854F6C]/20 transition-all duration-700"></div>

                            <h4 className="text-xl font-bold text-[#FBE4D8] mb-8 flex items-center gap-3 font-display">
                                <FolderGit className="text-[#DFB6B2] w-6 h-6" />
                                Contribution Activity
                            </h4>

                            <div className="space-y-8">
                                <img
                                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUser}&theme=vue-dark&background=150B1F&currStreakLabel=DFB6B2&fire=854F6C&ring=DFB6B2&sideNums=FBE4D8&sideLabels=DFB6B2&dates=FBE4D8&hide_border=true`}
                                    alt="GitHub Streak"
                                    className="w-full rounded-2xl border border-[#522B5B]/20"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 rounded-3xl bg-black/40 border border-[#FBE4D8]/5 flex flex-col items-center justify-center gap-2 group/stat">
                                        <GitPullRequest className="w-6 h-6 text-[#854F6C] group-hover/stat:scale-110 transition-transform" />
                                        <span className="text-[#DFB6B2] text-xs font-bold uppercase tracking-widest">Active PRs</span>
                                    </div>
                                    <div className="p-6 rounded-3xl bg-black/40 border border-[#FBE4D8]/5 flex flex-col items-center justify-center gap-2 group/stat">
                                        <Star className="w-6 h-6 text-[#DFB6B2] group-hover/stat:scale-110 transition-transform" />
                                        <span className="text-[#DFB6B2] text-xs font-bold uppercase tracking-widest">Total Stars</span>
                                    </div>
                                </div>

                                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#150B1F] to-[#050205] border border-[#522B5B]/30 relative overflow-hidden">
                                    <Share2 className="absolute -top-4 -right-4 w-20 h-20 text-[#DFB6B2]/5" />
                                    <p className="text-[#FBE4D8]/70 text-sm leading-relaxed relative z-10 italic">
                                        "Actively contributing to open source projects and building community-driven tools to solve real-world problems."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
