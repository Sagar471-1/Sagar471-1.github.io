import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaHtml5, FaCss3Alt, FaJs, FaPython, FaJava, FaReact, FaNodeJs,
    FaGitAlt, FaGithub, FaAws, FaLinux, FaDocker, FaFigma, FaUnity,
    FaBitcoin, FaGlobe
} from 'react-icons/fa';
import {
    SiCplusplus, SiNextdotjs, SiBlender, SiUnrealengine, SiPostgresql,
    SiGraphql, SiTypescript, SiTailwindcss
} from 'react-icons/si';
import { Award, Code, Sparkles } from 'lucide-react';
import DisplayCards from './ui/display-cards';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
    { name: "C++", icon: <SiCplusplus className="text-[#00599C]" />, glow: "#00599C" },
    { name: "Python", icon: <FaPython className="text-[#3776AB]" />, glow: "#3776AB" },
    { name: "SQL", icon: <SiPostgresql className="text-[#4169E1]" />, glow: "#4169E1" },
    { name: "Java", icon: <FaJava className="text-[#007396]" />, glow: "#007396" },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" />, glow: "#E34F26" },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" />, glow: "#1572B6" },
];

const technologies2 = [
    { name: "Pandas", icon: <FaPython className="text-[#150458]" />, glow: "#150458" },
    { name: "NumPy", icon: <FaPython className="text-[#4D77CF]" />, glow: "#4D77CF" },
    { name: "Scikit-learn", icon: <FaPython className="text-[#F7931E]" />, glow: "#F7931E" },
    { name: "Matplotlib", icon: <FaPython className="text-[#11557C]" />, glow: "#11557C" },
    { name: "GitHub", icon: <FaGithub className="text-white" />, glow: "#FFFFFF" },
    { name: "Power BI", icon: <FaPython className="text-[#F2C811]" />, glow: "#F2C811" },
];

export default function Skills() {
    const comp = useRef();
    const marquee1Ref = useRef();
    const marquee2Ref = useRef();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Header animation
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

            // Marquee 1 - scroll left
            const marquee1Width = marquee1Ref.current.scrollWidth / 2;
            gsap.to(marquee1Ref.current, {
                x: -marquee1Width,
                duration: 30,
                ease: "none",
                repeat: -1,
            });

            // Marquee 2 - scroll right
            const marquee2Width = marquee2Ref.current.scrollWidth / 2;
            gsap.fromTo(marquee2Ref.current,
                { x: -marquee2Width },
                {
                    x: 0,
                    duration: 30,
                    ease: "none",
                    repeat: -1,
                }
            );
        }, comp);

        return () => ctx.revert();
    }, []);

    const TechCard = ({ tech }) => {
        // Convert hex to rgba for shadow
        const hexToRgba = (hex, alpha = 0.5) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        return (
            <div className="flex-shrink-0 w-[180px] md:w-[200px] mx-3">
                <div
                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#150B1F] transition-all duration-300 h-[140px] group"
                    style={{
                        border: `1px solid ${hexToRgba(tech.glow, 0.4)}`,
                        boxShadow: `0 0 15px ${hexToRgba(tech.glow, 0.15)}, 0 0 30px ${hexToRgba(tech.glow, 0.08)}`,
                    }}
                >
                    <div className="text-4xl md:text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">
                        {tech.icon}
                    </div>
                    <span className="text-[#DFB6B2] font-medium text-sm text-center group-hover:text-[#FBE4D8] transition-colors">
                        {tech.name}
                    </span>
                </div>
            </div>
        );
    };

    const achievementCards = [
        {
            icon: <Award className="size-4 text-[#DFB6B2]" />,
            title: "HackerRank Badge",
            description: "Problem Solving (Basic)",
            date: "2024",
            iconClassName: "text-[#854F6C]",
            titleClassName: "text-[#FBE4D8]",
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[#522B5B]/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#050205]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            icon: <Code className="size-4 text-[#DFB6B2]" />,
            title: "LeetCode Rated",
            description: "Rating: 1625 (Top 10%)",
            date: "Expert",
            iconClassName: "text-[#854F6C]",
            titleClassName: "text-[#FBE4D8]",
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[#522B5B]/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#050205]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            icon: <Sparkles className="size-4 text-[#DFB6B2]" />,
            title: "Codeforces",
            description: "Rating: 1099 (Newbie)",
            date: "Competitive",
            iconClassName: "text-[#854F6C]",
            titleClassName: "text-[#FBE4D8]",
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        },
    ];

    return (
        <section ref={comp} className="skills-section relative z-10 py-20 overflow-hidden">
            <h2 className="skills-header text-4xl md:text-6xl font-bold text-[#FBE4D8] mb-16 text-center tracking-tighter text-shimmer px-4">
                Skills & Technologies
            </h2>

            <div className="space-y-8">
                {/* Top Row - Scroll Left */}
                <div className="relative overflow-hidden">
                    <div
                        ref={marquee1Ref}
                        className="flex hover:pause-animation"
                        style={{ width: 'max-content' }}
                    >
                        {/* Duplicate for seamless loop */}
                        {[...technologies, ...technologies].map((tech, index) => (
                            <TechCard key={`top-${index}`} tech={tech} />
                        ))}
                    </div>
                </div>

                {/* Bottom Row - Scroll Right */}
                <div className="relative overflow-hidden">
                    <div
                        ref={marquee2Ref}
                        className="flex hover:pause-animation"
                        style={{ width: 'max-content' }}
                    >
                        {/* Duplicate for seamless loop */}
                        {[...technologies2, ...technologies2].map((tech, index) => (
                            <TechCard key={`bottom-${index}`} tech={tech} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Achievement Cards */}
            <div className="w-full flex justify-center relative z-10 mt-20">
                <DisplayCards cards={achievementCards} />
            </div>
        </section>
    );
}
