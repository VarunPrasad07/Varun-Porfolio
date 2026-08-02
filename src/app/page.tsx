'use client';

import { useState } from 'react';
import Loader from '@/components/ui/Loader';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/ui/Navbar';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Robotics from '@/components/sections/Robotics';
import Cleanroom from '@/components/sections/Cleanroom';
import Timeline from '@/components/sections/Timeline';
import Achievements from '@/components/sections/Achievements';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <main className="relative min-h-screen">
          <BackgroundEffects />
          <CustomCursor />
          <Navbar />
          
          <div className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Robotics />
            <Cleanroom />
            <Timeline />
            <Achievements />
            <Resume />
            <Contact />
          </div>
        </main>
      )}
    </>
  );
}
