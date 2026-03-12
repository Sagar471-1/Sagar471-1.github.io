import React, { useState, lazy, Suspense } from 'react';
const Background3D = lazy(() => import('./components/Background3D'));
import Navbar from './components/Navbar';
import LogoSplash from './components/LogoSplash';
import Hero from './components/Hero';
import Work from './components/Work';
import AngledMarquee from './components/AngledMarquee';
import About from './components/About';
import AnimatedFooter from './components/AnimatedFooter';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import OpenSource from './components/OpenSource';
import { ZoomParallax } from './components/ui/zoom-parallax';
import { projects } from './data/portfolioData';
import { useTheme } from './context/ThemeContext';
import Contact from './components/Contact';

function App() {
    const [showSplash, setShowSplash] = useState(true);
    const { isDayMode } = useTheme();

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    const parallaxImages = [
        {
            src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Code on laptop screen',
        },
        {
            src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Developer workspace',
        },
        {
            src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Technology and innovation',
        },
        {
            src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Digital world',
        },
        {
            src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Cloud computing',
        },
        {
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Data visualization',
        },
        {
            src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1280&h=720&fit=crop&auto=format&q=80',
            alt: 'Creative development',
        },
    ];

    return (
        <div className={`relative w-full min-h-screen text-[#FBE4D8] font-sans selection:bg-[#DFB6B2] selection:text-[#050205] bg-[#050205] ${!isDayMode ? 'no-animations' : ''}`}>
            {showSplash && <LogoSplash onComplete={handleSplashComplete} />}

            <Suspense fallback={<div className="fixed inset-0 z-0 bg-[#050205]" />}>
                <Background3D />
            </Suspense>
            <Navbar />

            <main className="relative z-10">
                <Hero />
                <About />
                <Skills />
                <Work projects={projects} />
                <Experience />
                <Education />
                <Certifications />
                <Achievements />
                <OpenSource />
                <ZoomParallax images={parallaxImages} />
                <AngledMarquee />
                <Contact />
            </main>

            <AnimatedFooter />
        </div>
    );
}

export default App;
