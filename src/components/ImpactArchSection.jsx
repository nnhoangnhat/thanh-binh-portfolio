import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ImpactArchSection — Tối ưu hóa hiển thị trên cả Desktop & Mobile:
 * - Desktop: Thẻ Vòm ở trung tâm + 4 chỉ số KPI đối xứng 2 bên nối bằng đường gấp khúc 45 độ
 * - Mobile/Tablet: Thẻ Vòm thu phóng vừa vặn khung hình + Lưới KPI 2x2 chia ô sắc nét chuẩn tạp chí
 */
export default function ImpactArchSection({ impact, profileSummary, signatureText }) {
  const sectionRef = useRef(null);
  const archRef = useRef(null);
  const [counts, setCounts] = useState(impact.metrics.map(() => 0));
  const hasCountedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Giới hạn biên độ scale nhẹ (1.04) trên Mobile để thẻ Vòm không bao giờ tràn ngang màn hẹp
      gsap.fromTo(
        archRef.current,
        {
          scale: isMobile ? 1.04 : 1.22,
          y: isMobile ? 24 : 45,
          opacity: 0.8,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 84%',
            end: 'top 28%',
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        '.kpi-connector-line',
        { strokeDasharray: 260, strokeDashoffset: 260 },
        {
          strokeDashoffset: 0,
          duration: 1.3,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 58%',
          },
        }
      );

      gsap.fromTo(
        '.kpi-callout-card',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            onEnter: () => {
              if (hasCountedRef.current) return;
              hasCountedRef.current = true;
              const durationMs = 1500;
              const startTime = performance.now();
              const tick = (now) => {
                const progress = Math.min(1, (now - startTime) / durationMs);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCounts(impact.metrics.map((m) => Math.round(m.target * eased)));
                if (progress < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [impact.metrics]);

  const [topLeft, topRight, bottomLeft, bottomRight] = impact.metrics;

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-36 overflow-hidden border-b border-white/[0.08] bg-[#07080b]"
    >
      {/* Chữ Serif khổng lồ mờ ảo phía sau thẻ vòm */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0"
      >
        <span className="font-editorial text-[26vw] leading-none tracking-[0.06em] text-white/[0.028] font-normal">
          {impact.watermark}
        </span>
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-12">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6">
          {/* Cột Trái (Chỉ hiển thị trên Desktop >= 1024px) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between gap-12 lg:h-[520px] lg:py-8 lg:order-1">
            <div className="kpi-callout-card relative lg:text-right lg:pr-8">
              <div className="font-editorial text-5xl md:text-6xl text-[var(--accent-ice)] leading-none">
                ~{counts[0]}
                <span className="text-3xl md:text-4xl">{topLeft.suffix}</span>
              </div>
              <p className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.18em] leading-relaxed text-white/65 max-w-[260px] lg:ml-auto">
                {topLeft.caption}
              </p>
              <svg
                className="hidden lg:block absolute top-6 -right-10 w-20 h-14 overflow-visible pointer-events-none"
                viewBox="0 0 80 56"
                fill="none"
              >
                <polyline
                  className="kpi-connector-line"
                  points="0,8 46,8 76,38"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="1"
                />
                <circle cx="0" cy="8" r="2.5" fill="var(--accent-ice)" />
                <circle cx="76" cy="38" r="2.5" fill="rgba(255,255,255,0.65)" />
              </svg>
            </div>

            <div className="kpi-callout-card relative lg:text-right lg:pr-8">
              <div className="font-editorial text-5xl md:text-6xl text-[var(--accent-ice)] leading-none">
                {bottomLeft.prefix}
                {counts[2]}
              </div>
              <p className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.18em] leading-relaxed text-white/65 max-w-[260px] lg:ml-auto">
                {bottomLeft.caption}
              </p>
              <svg
                className="hidden lg:block absolute bottom-7 -right-10 w-20 h-14 overflow-visible pointer-events-none"
                viewBox="0 0 80 56"
                fill="none"
              >
                <polyline
                  className="kpi-connector-line"
                  points="0,48 46,48 76,18"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="1"
                />
                <circle cx="0" cy="48" r="2.5" fill="var(--accent-ice)" />
                <circle cx="76" cy="18" r="2.5" fill="rgba(255,255,255,0.65)" />
              </svg>
            </div>
          </div>

          {/* Cột Trung tâm: Thẻ Vòm (Tombstone Arch Card) */}
          <div className="lg:col-span-4 flex justify-center lg:order-2">
            <div
              ref={archRef}
              className="relative w-full max-w-[350px] sm:max-w-[380px] min-h-[440px] sm:min-h-[520px] md:min-h-[560px] rounded-t-full rounded-b-2xl px-7 sm:px-10 pt-20 sm:pt-24 pb-10 sm:pb-12 flex flex-col items-center justify-between text-center border border-white/20 shadow-[0_35px_90px_rgba(0,0,0,0.85)] overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, var(--arch-surface) 0%, var(--arch-surface-deep) 100%)',
              }}
            >
              <div
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-40"
                style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
              />

              <div className="relative z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-white/85 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>{impact.eyebrow}</span>
              </div>

              <div className="relative z-10 space-y-4 sm:space-y-5 my-5 sm:my-6">
                <h2 className="font-editorial text-[34px] sm:text-[42px] leading-[1.06] text-white font-normal">
                  {impact.heading}
                </h2>
                <p className="text-xs sm:text-[13px] leading-relaxed text-white/80 font-light">
                  {impact.body}
                </p>
              </div>

              <div className="relative z-10 pt-1 sm:pt-2 flex flex-col items-center">
                <span className="font-signature text-3xl sm:text-4xl text-white/95 -rotate-2">
                  {signatureText}
                </span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/55">
                  Principal Group Representative
                </span>
              </div>
            </div>
          </div>

          {/* Cột Phải (Chỉ hiển thị trên Desktop >= 1024px) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-between gap-12 lg:h-[520px] lg:py-8 lg:order-3">
            <div className="kpi-callout-card relative lg:text-left lg:pl-8">
              <svg
                className="hidden lg:block absolute top-6 -left-10 w-20 h-14 overflow-visible pointer-events-none"
                viewBox="0 0 80 56"
                fill="none"
              >
                <polyline
                  className="kpi-connector-line"
                  points="80,8 34,8 4,38"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="1"
                />
                <circle cx="80" cy="8" r="2.5" fill="var(--accent-ice)" />
                <circle cx="4" cy="38" r="2.5" fill="rgba(255,255,255,0.65)" />
              </svg>
              <div className="font-editorial text-5xl md:text-6xl text-[var(--accent-ice)] leading-none">
                {counts[1]}
              </div>
              <p className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.18em] leading-relaxed text-white/65 max-w-[260px]">
                {topRight.caption}
              </p>
            </div>

            <div className="kpi-callout-card relative lg:text-left lg:pl-8">
              <svg
                className="hidden lg:block absolute bottom-7 -left-10 w-20 h-14 overflow-visible pointer-events-none"
                viewBox="0 0 80 56"
                fill="none"
              >
                <polyline
                  className="kpi-connector-line"
                  points="80,48 34,48 4,18"
                  stroke="rgba(255,255,255,0.28)"
                  strokeWidth="1"
                />
                <circle cx="80" cy="48" r="2.5" fill="var(--accent-ice)" />
                <circle cx="4" cy="18" r="2.5" fill="rgba(255,255,255,0.65)" />
              </svg>
              <div className="font-editorial text-5xl md:text-6xl text-[var(--accent-ice)] leading-none">
                {counts[3] < 10 ? `0${counts[3]}` : counts[3]}
              </div>
              <p className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.18em] leading-relaxed text-white/65 max-w-[260px]">
                {bottomRight.caption}
              </p>
            </div>
          </div>

          {/* Lưới KPI 2x2 đối xứng dành riêng cho Mobile & Tablet (< 1024px) */}
          <div className="grid lg:hidden grid-cols-2 rounded-2xl border border-white/12 bg-[#0b0e15]/85 overflow-hidden divide-x divide-y divide-white/10">
            <div className="kpi-callout-card p-4 sm:p-6">
              <div className="font-editorial text-4xl sm:text-5xl text-[var(--accent-ice)] leading-none">
                ~{counts[0]}
                <span className="text-2xl sm:text-3xl">{topLeft.suffix}</span>
              </div>
              <p className="mt-2.5 text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.13em] leading-relaxed text-white/65">
                {topLeft.caption}
              </p>
            </div>

            <div className="kpi-callout-card p-4 sm:p-6">
              <div className="font-editorial text-4xl sm:text-5xl text-[var(--accent-ice)] leading-none">
                {counts[1]}
              </div>
              <p className="mt-2.5 text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.13em] leading-relaxed text-white/65">
                {topRight.caption}
              </p>
            </div>

            <div className="kpi-callout-card p-4 sm:p-6">
              <div className="font-editorial text-4xl sm:text-5xl text-[var(--accent-ice)] leading-none">
                {bottomLeft.prefix}
                {counts[2]}
              </div>
              <p className="mt-2.5 text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.13em] leading-relaxed text-white/65">
                {bottomLeft.caption}
              </p>
            </div>

            <div className="kpi-callout-card p-4 sm:p-6 !border-t !border-white/10">
              <div className="font-editorial text-4xl sm:text-5xl text-[var(--accent-ice)] leading-none">
                {counts[3] < 10 ? `0${counts[3]}` : counts[3]}
              </div>
              <p className="mt-2.5 text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.13em] leading-relaxed text-white/65">
                {bottomRight.caption}
              </p>
            </div>
          </div>
        </div>

        {/* Khối Executive Profile nguyên bản */}
        <div className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-white/[0.08] max-w-4xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-ice)] mb-3.5 font-semibold">
            EXECUTIVE PROFILE SUMMARY
          </p>
          <p className="font-editorial text-lg sm:text-2xl md:text-[26px] leading-[1.52] text-white/85 font-normal">
            {profileSummary}
          </p>
        </div>
      </div>
    </section>
  );
}
