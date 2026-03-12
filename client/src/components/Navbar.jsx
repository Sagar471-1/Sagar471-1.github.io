import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { HiHome, HiUser, HiCodeBracket, HiBriefcase, HiEnvelope, HiAcademicCap, HiStar, HiCube, HiTrophy, HiCommandLine } from 'react-icons/hi2';
import { cn } from '../lib/utils';
import SkyToggle from './ui/sky-toggle';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
    { name: 'Home', section: '#home', icon: HiHome },
    { name: 'About', section: '#about', icon: HiUser },
    { name: 'Skills', section: '#skills', icon: HiCodeBracket },
    { name: 'Work', section: '#work', icon: HiBriefcase },
    { name: 'Exp', section: '#experience', icon: HiCube },
    { name: 'Edu', section: '#education', icon: HiAcademicCap },
    { name: 'Certs', section: '#certifications', icon: HiStar },
    { name: 'Stats', section: '#opensource', icon: HiCommandLine },
    { name: 'Contact', section: '.contact-section', icon: HiEnvelope },
];

export default function Navbar() {
    const [activeTab, setActiveTab] = useState(navItems[0].name);
    const [isMobile, setIsMobile] = useState(false);
    const { isDayMode, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        const handleScroll = () => setScrolled(window.scrollY > 50);

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (sectionId, itemName) => {
        const element = document.querySelector(sectionId);
        if (element) {
            const offset = element.offsetTop - 100;
            gsap.to(window, {
                scrollTo: { y: offset, autoKill: false },
                duration: 1.2,
                ease: "power3.inOut",
            });
            setActiveTab(itemName);
        }
    };

    return (
        <nav className={cn(
            "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 transition-all duration-500",
            scrolled ? "top-2" : "top-4"
        )}>
            <div className="flex items-center justify-between gap-4 bg-[#150B1F]/60 border border-[#FBE4D8]/10 backdrop-blur-2xl py-2 px-4 md:px-8 rounded-full shadow-2xl relative overflow-hidden group">
                {/* Brand */}
                <button
                    onClick={() => scrollToSection('.hero-section', 'Home')}
                    className="relative z-10 text-xl md:text-2xl font-bold tracking-tighter transition-all duration-300 hover:scale-105 hidden sm:block"
                >
                    <span className="bg-gradient-to-r from-[#FBE4D8] via-[#DFB6B2] to-[#854F6C] bg-clip-text text-transparent">
                        Sagar
                    </span>
                </button>

                {/* Nav Items */}
                <div className="flex items-center gap-1 md:gap-2 relative z-10 overflow-x-auto no-scrollbar py-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.name;

                        return (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.section, item.name)}
                                className={cn(
                                    "relative flex items-center gap-2 px-3 md:px-4 py-2 rounded-full transition-all duration-300 group/item",
                                    isActive ? "text-[#FBE4D8]" : "text-[#FBE4D8]/50 hover:text-[#FBE4D8]"
                                )}
                            >
                                <Icon className={cn("w-5 h-5 md:w-4 md:h-4", isActive && "text-[#DFB6B2]")} />
                                <span className="hidden xl:inline text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
                                    {item.name}
                                </span>

                                {isActive && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-[#522B5B]/30 rounded-full -z-10 border border-[#DFB6B2]/20 shadow-[0_0_15px_rgba(82,43,91,0.3)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <SkyToggle checked={!isDayMode} onChange={toggleTheme} />
                </div>
            </div>
        </nav>
    );
}
