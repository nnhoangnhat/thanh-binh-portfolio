import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ImpactArchSection — Tái hiện hoàn hảo section "WHY US" của Dark Portfolio:
 * 1. Chữ chìm khổng lồ (Ghost Serif Watermark) phía sau
 * 2. Thẻ hình vòm cao (Tombstone Arch Card) với hiệu ứng thu phóng mượt từ rộng về trung tâm khi cuộn
 * 3. 4 chỉ số định lượng (KPI Callouts) ở 4 góc nối vào cạnh vòm bằng đường gấp khúc 45 độ + chấm sáng
 * 4. Hiệu ứng đếm số tăng dần (Count-up) khi cuộn tới
 */
export default function ImpactArchSection({ impact, profileSummary, signatureText }) {
  const sectionRef = useRef(null);
  const archRef = useRef(null);
  const [counts, setCounts] = useState(impact.metrics.map(() => 0));
  const hasCountedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hiệu ứng vòm trung tâm thu phóng mượt khi cuộn từ Hero xuống
      gsap.fromTo(
        archRef.current,
        {
          scale: 1.22,
          y: 45,
          opacity: 0.75,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            end: 'top 25%',
            scrub: 0.8,
          },
        }
      );

      // Hiệu ứng vẽ đường nối 45 độ từ thẻ vòm ra 4 chỉ số KPI
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

      // Hiệu ứng hiện dần 4 khối KPI và kích hoạt đếm số
      gsap.fromTo(
        '.kpi-callout-card',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
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
      className="relative py-28 md:py-36 overflow-hidden border-b border-white/[0.08] bg-[#07080b]"
    >
      {/* Chữ Serif khổng lồ mờ ảo phía sau thẻ vòm (Watermark "IMPACT") */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0"
      >
        <span className="font-editorial text-[26vw] leading-none tracking-[0.06em] text-white/[0.028] font-normal">
          {impact.watermark}
        </span>
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-6 md:px-12">
        {/* Khung bố cục 3 cột trên Desktop: KPI Trái — Vòm Trung tâm — KPI Phải */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-6">
          {/* Cột Trái: KPI Trên-Trái & Dưới-Trái */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-12 lg:h-[520px] lg:py-8 order-2 lg:order-1">
            {/* Top-Left Metric */}
            <div className="kpi-callout-card relative lg:text-right lg:pr-8">
              <div className="font-editorial text-5xl md:text-6xl text-[var(--accent-ice)] leading-none">
                ~{counts[0]}
                <span className="text-3xl md:text-4xl">{topLeft.suffix}</span>
              </div>
              <p className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.18em] leading-relaxed text-white/65 max-w-[260px] lg:ml-auto">
                {topLeft.caption}
              </p>
              {/* Đường kẻ gấp khúc 45 độ nối sang cạnh vòm (hiển thị trên màn lớn) */}
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

            {/* Bottom-Left Metric */}
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
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
            <div
              ref={archRef}
              className="relative w-full max-w-[380px] min-h-[520px] md:min-h-[560px] rounded-t-full rounded-b-2xl px-8 sm:px-10 pt-24 pb-12 flex flex-col items-center justify-between text-center border border-white/20 shadow-[0_35px_90px_rgba(0,0,0,0.85)] overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, var(--arch-surface) 0%, var(--arch-surface-deep) 100%)',
              }}
            >
              {/* Ánh sáng vòm trên đỉnh tạo chiều sâu 3D */}
              <div
                className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl opacity-40"
                style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
              />

              <div className="relative z-10 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/85 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>{impact.eyebrow}</span>
              </div>

              <div className="relative z-10 space-y-5 my-6">
                <h2 className="font-editorial text-4xl sm:text-[42px] leading-[1.06] text-white font-normal">
                  {impact.heading}
                </h2>
                <p className="text-xs sm:text-[13px] leading-relaxed text-white/80 font-light">
                  {impact.body}
                </p>
              </div>

              <div className="relative z-10 pt-2 flex flex-col items-center">
                <span className="font-signature text-3xl sm:text-4xl text-white/95 -rotate-2">
                  {signatureText}
                </span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.24em] text-white/55">
                  Principal Group Representative
                </span>
              </div>
            </div>
          </div>

          {/* Cột Phải: KPI Trên-Phải & Dưới-Phải */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-12 lg:h-[520px] lg:py-8 order-3">
            {/* Top-Right Metric */}
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

            {/* Bottom-Right Metric */}
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
        </div>

        {/* Khối Executive Profile nguyên bản từ CV đặt tinh tế bên dưới thẻ Vòm */}
        <div className="mt-20 pt-12 border-t border-white/[0.08] max-w-4xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.26em] text-[var(--accent-ice)] mb-4 font-semibold">
            EXECUTIVE PROFILE SUMMARY
          </p>
          <p className="font-editorial text-xl sm:text-2xl md:text-[26px] leading-[1.5] text-white/85 font-normal">
            {profileSummary}
          </p>
        </div>
      </div>
    </section>
  );
}
