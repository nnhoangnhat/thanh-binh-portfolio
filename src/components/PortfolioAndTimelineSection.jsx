import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * PortfolioAndTimelineSection — Gồm 2 phần cốt lõi từ trang 1, 2 & 3 của CV:
 * 1. Communications Portfolio (3 trụ cột chuyên môn: CEO/Executive, Corporate/Platform GCA & ACA, Media & Diplomatic PR)
 * 2. Career Progression Timeline (Lộ trình thăng tiến xuyên suốt gần 6 năm tại TNI King Coffee)
 */
export default function PortfolioAndTimelineSection({ pillars, timeline }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pillar-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top 78%',
          },
        }
      );

      gsap.fromTo(
        '.timeline-item',
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#experience',
            start: 'top 78%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#07080b]">
      {/* ====================================================================
          PHẦN A: COMMUNICATIONS PORTFOLIO (3 Trụ cột Truyền thông & Đối ngoại)
         ==================================================================== */}
      <section id="portfolio" className="border-b border-white/[0.08]">
        <div className="border-b border-white/[0.08]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.25em] text-white/85 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-ice)]" />
              <span>COMMUNICATIONS PORTFOLIO</span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              EXECUTIVE  •  CORPORATE  •  DIPLOMATIC ECOSYSTEM
            </span>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-3xl mb-14">
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl leading-[1.04] text-white font-normal">
              Three pillars of strategic influence &amp; stakeholder trust
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {pillars.map((pillar) => (
              <div
                key={pillar.index}
                className="pillar-card group relative rounded-2xl border border-white/[0.1] bg-[#0b0e15]/90 hover:border-[var(--accent-ice)]/50 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Ảnh minh họa dải đầu thẻ */}
                <div className="relative h-48 overflow-hidden border-b border-white/[0.08]">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e15] via-[#0b0e15]/40 to-transparent" />
                  <span className="absolute top-4 left-5 font-editorial italic text-3xl text-[var(--accent-ice)]">
                    {pillar.index}.
                  </span>
                </div>

                {/* Nội dung chi tiết */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent-ice)] font-semibold">
                    {pillar.subtitle}
                  </p>
                  <h3 className="mt-2 font-editorial text-2xl sm:text-[28px] leading-tight text-white">
                    {pillar.title}
                  </h3>

                  <ul className="mt-6 space-y-4 flex-1">
                    {pillar.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-[13.5px] leading-relaxed text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-ice)] shrink-0 mt-0.5 opacity-80" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          PHẦN B: CAREER PROGRESSION TIMELINE (TNI King Coffee 2020 – Present)
         ==================================================================== */}
      <section id="experience" className="border-b border-white/[0.08]">
        <div className="border-b border-white/[0.08]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.25em] text-white/85 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-ice)]" />
              <span>PROFESSIONAL EXPERIENCE</span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              TNI KING COFFEE  •  DECEMBER 2020 – PRESENT
            </span>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cột Trái: Tiêu đề cố định khi cuộn */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/12 bg-white/[0.03] text-[11px] text-[var(--accent-ice)]">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Nearly 6 Years Progressive Leadership</span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl leading-[1.05] text-white font-normal">
                From Intern to Principal Group Representative
              </h2>
              <p className="text-sm leading-relaxed text-white/65 font-light">
                Continuous upward trajectory within TNI King Coffee — entrusted since 2023 as the
                acting departmental lead spearheading executive, brand, and diplomatic
                communications worldwide.
              </p>
            </div>
          </div>

          {/* Cột Phải: Dòng thời gian chi tiết */}
          <div className="lg:col-span-8 relative pl-6 sm:pl-10 border-l border-white/15 space-y-12">
            {timeline.map((item, index) => (
              <div
                key={item.role}
                className="timeline-item relative rounded-2xl border border-white/[0.09] bg-[#0b0e15]/75 p-6 sm:p-9 hover:border-white/20 transition-colors"
              >
                {/* Điểm nút phát sáng trên trục Timeline */}
                <span
                  className={`absolute -left-[31px] sm:-left-[47px] top-8 h-3.5 w-3.5 rounded-full border-2 ${
                    index === 0
                      ? 'bg-[var(--accent-ice)] border-white shadow-[0_0_16px_var(--accent-ice)]'
                      : 'bg-[#07080b] border-[var(--accent-ice)]'
                  }`}
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-editorial text-2xl sm:text-3xl text-[var(--accent-ice)]">
                    {item.period}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] border border-white/12 bg-white/[0.04] text-white/75">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-3 font-editorial text-2xl sm:text-3xl text-white">
                  {item.role}{' '}
                  <span className="text-white/45 font-normal text-xl sm:text-2xl">
                    — {item.organization}
                  </span>
                </h3>

                <p className="mt-2 text-xs sm:text-sm italic text-white/60">{item.summary}</p>

                <ul className="mt-5 space-y-3">
                  {item.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="relative pl-4 text-xs sm:text-[14px] leading-relaxed text-white/75 before:content-[''] before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent-ice)]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
