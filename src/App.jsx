import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cvData } from './data/cvData';
import HeroSection from './components/HeroSection';
import ImpactArchSection from './components/ImpactArchSection';
import FlagshipEventsSection from './components/FlagshipEventsSection';
import PortfolioAndTimelineSection from './components/PortfolioAndTimelineSection';
import CapabilitiesAndFooter from './components/CapabilitiesAndFooter';

gsap.registerPlugin(ScrollTrigger);

/**
 * Ứng dụng chính CV & Executive Portfolio — Nguyễn Thị Thanh Bình
 * Bản Production: Cố định tông màu Espresso Gold & Chân dung động Living 3D, không hiển thị thanh công cụ chỉnh sửa
 */
export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'gold');

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080b] text-[#f5f6f8] font-sans-clean">
      {/* Hiệu ứng hạt nhiễu điện ảnh & Lưới cột kiến trúc xuyên suốt */}
      <div className="film-grain" />
      <div className="architectural-columns" aria-hidden="true">
        <div />
        <div />
        <div />
        <div />
      </div>

      <main className="relative z-10">
        <HeroSection
          data={cvData.personal}
          orbitalCards={cvData.orbitalCards}
          portraitSrc="./images/studio-portrait.png"
        />

        <ImpactArchSection
          impact={cvData.impactSection}
          profileSummary={cvData.personal.profileSummary}
          signatureText={cvData.personal.signatureText}
        />

        <FlagshipEventsSection events={cvData.flagshipEvents} />

        <PortfolioAndTimelineSection
          pillars={cvData.portfolioPillars}
          timeline={cvData.experienceTimeline}
        />

        <CapabilitiesAndFooter
          capabilities={cvData.capabilities}
          personal={cvData.personal}
        />
      </main>
    </div>
  );
}
