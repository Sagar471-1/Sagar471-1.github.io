import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaHtml5, FaCss3Alt, FaPython, FaJava, FaGithub, FaDatabase, FaCode
} from 'react-icons/fa';
import {
    SiCplusplus, SiPandas, SiNumpy, SiScikitlearn, SiStreamlit,
    SiJupyter, SiMysql, SiGooglecolab
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { Award, Brain, BarChart3, Binary, Settings, Sparkles } from 'lucide-react';
import { skills } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const languages = [
    { name: "C++", icon: <SiCplusplus className="text-[#00599C]" />, glow: "#00599C" },
    { name: "C#", icon: <TbBrandCSharp className="text-[#239120]" />, glow: "#239120" },
    { name: "Python", icon: <FaPython className="text-[#3776AB]" />, glow: "#3776AB" },
    { name: "SQL", icon: <FaDatabase className="text-[#4479A1]" />, glow: "#4479A1" },
    { name: "Java", icon: <FaJava className="text-[#007396]" />, glow: "#007396" },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" />, glow: "#E34F26" },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" />, glow: "#1572B6" },
];

const frameworks = [
    { name: "Pandas", icon: <SiPandas className="text-[#150458]" />, glow: "#150458" },
    { name: "NumPy", icon: <SiNumpy className="text-[#4D77CF]" />, glow: "#4D77CF" },
    { name: "Scikit-learn", icon: <SiScikitlearn className="text-[#F7931E]" />, glow: "#F7931E" },
    { name: "Streamlit", icon: <SiStreamlit className="text-[#FF4B4B]" />, glow: "#FF4B4B" },
    { name: "Matplotlib", icon: <BarChart3 className="text-[#11557C]" />, glow: "#11557C" },
    { name: "GitHub", icon: <FaGithub className="text-white" />, glow: "#FFFFFF" },
];

export default function Skills() {
    const comp = useRef();
    const marquee1Ref = useRef();
    const marquee2Ref = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".skills-header", {
                scrollTrigger: {
                    trigger: ".skills-section",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            const marquee1Width = marquee1Ref.current.scrollWidth / 2;
            gsap.to(marquee1Ref.current, {
                x: -marquee1Width,
                duration: 30,
                ease: "none",
                repeat: -1,
            });

            const marquee2Width = marquee2Ref.current.scrollWidth / 2;
            gsap.fromTo(marquee2Ref.current,
                { x: -marquee2Width },
                {
                    x: 0,
                    duration: 25,
                    ease: "none",
                    repeat: -1,
                }
            );

            gsap.from(".skill-category", {
                scrollTrigger: {
                    trigger: ".skill-categories-grid",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, comp);

        return () => ctx.revert();
    }, []);

    const TechCard = ({ tech }) => {
        const hexToRgba = (hex, alpha = 0.5) => {
            const r = parseInt(hex.slice(1, 3), 16) || 255;
            const g = parseInt(hex.slice(3, 5), 16) || 255;
            const b = parseInt(hex.slice(5, 7), 16) || 255;
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        return (
            <div className="flex-shrink-0 w-[180px] md:w-[200px] mx-3">
                <div
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#150B1F]/60 backdrop-blur-md transition-all duration-300 h-[140px] group border border-[#522B5B]/30"
                    style={{
                        boxShadow: `0 0 15px ${hexToRgba(tech.glow, 0.1)}, 0 0 30px ${hexToRgba(tech.glow, 0.05)}`,
                    }}
                >
                    <div className="text-4xl md:text-5xl mb-3 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                        {tech.icon}
                    </div>
                    <span className="text-[#DFB6B2] font-medium text-sm text-center group-hover:text-[#FBE4D8] transition-colors tracking-widest uppercase">
                        {tech.name}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <section id="skills" ref={comp} className="skills-section relative z-10 py-32 overflow-hidden bg-black/20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="skills-header mb-20 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold text-[#FBE4D8] mb-6 tracking-tight font-display">
                        Skills & Tech
                    </h2>
                    <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-[#522B5B] via-[#DFB6B2] to-[#854F6C] rounded-full"></div>
                </div>

                <div className="space-y-12 mb-20">
                    <div className="relative overflow-hidden">
                        <div ref={marquee1Ref} className="flex" style={{ width: 'max-content' }}>
                            {[...languages, ...languages].map((tech, index) => (
                                <TechCard key={`lang-${index}`} tech={tech} />
                            ))}
                        </div>
                    </div>
                    <div className="relative overflow-hidden">
                        <div ref={marquee2Ref} className="flex" style={{ width: 'max-content' }}>
                            {[...frameworks, ...frameworks].map((tech, index) => (
                                <TechCard key={`frame-${index}`} tech={tech} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="skill-categories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {[
                        { title: "Core Skills", items: skills.core, icon: <Brain />, grad: "from-[#522B5B]/20 to-[#854F6C]/20" },
                        { title: "Tools & Platforms", items: skills.tools, icon: <Settings />, grad: "from-[#854F6C]/20 to-[#DFB6B2]/20" },
                        { title: "Soft Skills", items: skills.soft, icon: <Sparkles />, grad: "from-[#DFB6B2]/20 to-[#522B5B]/20" }
                    ].map((cat, i) => (
                        <div key={i} className={`skill-category p-8 rounded-[2rem] bg-gradient-to-br ${cat.grad} backdrop-blur-md border border-[#FBE4D8]/10 group hover:border-[#DFB6B2]/40 transition-all duration-500`}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-[#150B1F] rounded-2xl text-[#DFB6B2] group-hover:scale-110 transition-transform duration-500">
                                    {cat.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-[#FBE4D8] font-display">{cat.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {cat.items.map((skill, j) => (
                                    <span key={j} className="px-4 py-2 rounded-full bg-[#150B1F]/60 border border-[#522B5B]/30 text-[#DFB6B2] text-sm font-medium hover:bg-[#854F6C]/30 hover:text-[#FBE4D8] transition-all cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
