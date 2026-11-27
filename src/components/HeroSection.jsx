import React, { useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Mail } from 'lucide-react';
import LivingPortraitCanvas from './LivingPortraitCanvas';

/**
 * HeroSection — Phiên bản Production chính thức khóa tông màu Imperial Espresso Gold:
 * 1. Thanh Top Bar tối giản hiển thị định vị chuyên ngành & đơn vị công tác (đã gỡ bỏ hoàn toàn cụm nút công cụ chỉnh sửa)
 * 2. Thanh Header 4 cột chuẩn tạp chí quốc tế
 * 3. Vòng cung 3D lòng chảo 14 thẻ dự án xoay mượt phía sau chân dung động
 * 4. Chân dung động Cinemagraph (LivingPortraitCanvas) lặp vô tận mượt 100%
 * 5. Góc trái dưới (Chức danh + CTA) & Góc phải dưới (Tuyên ngôn + Chữ ký tay) vừa khít trên màn hình đầu tiên
 */
export default function HeroSection({ data, orbitalCards, portraitSrc }) {
  const cardsContainerRef = useRef(null);
  const mouseOffsetRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    let rafId;
    let angleOffset = 0;

    const totalSlots = 14;
    const stepDeg = 360 / totalSlots;

    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseOffsetRef.current.targetX = nx * 7;
      mouseOffsetRef.current.targetY = ny * 3.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animateRing = () => {
      angleOffset -= 0.08;
      const m = mouseOffsetRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;

      const container = cardsContainerRef.current;
      if (container) {
        const isMobile = window.innerWidth < 768;
        const radius = isMobile ? 440 : 750;
        const children = container.children;

        for (let i = 0; i < children.length; i++) {
          const el = children[i];
          let theta = ((i * stepDeg + angleOffset + m.x * 0.55) % 360 + 540) % 360 - 180;
          const rad = (theta * Math.PI) / 180;

          const visibility = Math.cos(rad * 1.02);
          if (visibility <= 0.02) {
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
          } else {
            const smoothOpacity = Math.min(1, Math.pow(visibility, 0.65) * 1.12);
            el.style.opacity = smoothOpacity.toFixed(3);
            el.style.pointerEvents = 'auto';
            el.style.transform = `rotateX(${(-1.2 + m.y * 0.3).toFixed(2)}deg) rotateY(${theta.toFixed(
              2
            )}deg) translateZ(${-radius}px)`;
          }
        }
      }

      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const ringItems = Array.from({ length: 14 }, (_, idx) => orbitalCards[idx % orbitalCards.length]);

  return (
    <section
      id="top"
      className="relative min-h-screen lg:h-screen lg:min-h-[780px] lg:max-h-[980px] w-full flex flex-col justify-between overflow-hidden border-b border-white/[0.08] bg-[#07080b]"
    >
      {/* Thanh Top Bar sạch sẽ dành cho bản Public Website (không còn cụm nút điều chỉnh) */}
      <div className="relative z-40 w-full border-b border-white/[0.07] bg-[#07080b]/85 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-[var(--accent-ice)]/90 font-medium">
            {data.eyebrowPillars}
          </span>
          <span className="hidden sm:inline text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-white/45">
            {data.organization} &nbsp;•&nbsp; {data.tenure}
          </span>
        </div>
      </div>

      {/* Thanh Header 4 cột chuẩn tạp chí cao cấp */}
      <header className="relative z-30 max-w-[1440px] w-full mx-auto px-6 md:px-12 pt-4 md:pt-5 grid grid-cols-2 md:grid-cols-4 items-start gap-4">
        {/* Cột 1: Wordmark chữ thường kèm dấu chấm */}
        <div>
          <a
            href="#top"
            className="font-editorial text-2xl md:text-[30px] leading-none font-medium tracking-tight text-white hover:opacity-85 transition-opacity"
          >
            {data.brandMark}
          </a>
          <p className="mt-1 text-[11px] text-white/45 tracking-wide">
            {data.fullName} &nbsp;•&nbsp; {data.organization}
          </p>
        </div>

        {/* Cột 2: Trạng thái đại diện lãnh đạo */}
        <div className="hidden md:flex items-center gap-2 text-xs text-white/75 pt-1 whitespace-nowrap">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent-ice)] shadow-[0_0_10px_var(--accent-ice)] animate-pulse shrink-0" />
          <span className="text-white/60">{data.availability}</span>
          <span className="text-white/25">/</span>
          <strong className="font-medium text-white">{data.availabilitySub}</strong>
        </div>

        {/* Cột 3: Vị trí & Phạm vi hoạt động */}
        <div className="hidden md:flex items-center gap-2 text-xs text-white/75 pt-1 justify-center whitespace-nowrap">
          <MapPin className="w-3.5 h-3.5 text-[var(--accent-ice)] shrink-0" />
          <span className="text-white/55">{data.locationLabel}</span>
          <span className="text-white/25">/</span>
          <strong className="font-medium text-white">{data.locationValue}</strong>
        </div>

        {/* Cột 4: Menu điều hướng xếp dọc gọn bên phải */}
        <nav className="justify-self-end flex flex-col items-end space-y-1 text-xs md:text-[13px] font-medium text-white/80">
          <a href="#impact" className="hover:text-[var(--accent-ice)] transition-colors">
            Impact
          </a>
          <a href="#flagships" className="hover:text-[var(--accent-ice)] transition-colors">
            Flagships
          </a>
          <a href="#portfolio" className="hover:text-[var(--accent-ice)] transition-colors">
            Portfolio
          </a>
          <a href="#experience" className="hover:text-[var(--accent-ice)] transition-colors">
            Career
          </a>
          <a href="#contact" className="hover:text-[var(--accent-ice)] transition-colors">
            Contact
          </a>
        </nav>
      </header>

      {/* Sân khấu trung tâm: Vòng cung 3D dự án xoay ngang vai + Chân dung động Cinemagraph */}
      <div className="relative flex-1 flex items-end justify-center min-h-[430px] lg:min-h-0">
        {/* Ánh sáng vòm ấm Espresso Gold tôn đường viền tóc & vai */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[520px] rounded-full blur-[135px] opacity-40"
          style={{
            background: 'radial-gradient(circle, var(--arch-surface) 0%, transparent 70%)',
          }}
        />

        {/* Lớp Hậu cảnh (z-10): Vòng cung 3D gồm 14 thẻ dự án */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
          style={{ perspective: '1120px', perspectiveOrigin: '50% 42%' }}
        >
          <div
            ref={cardsContainerRef}
            className="relative w-[220px] h-[138px] md:w-[295px] md:h-[184px] -mt-20 md:-mt-28"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {ringItems.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="absolute inset-0 rounded-xl overflow-hidden border border-white/20 bg-[#0e131d] shadow-[0_24px_60px_rgba(0,0,0,0.88)]"
                style={{ willChange: 'transform, opacity' }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-90 brightness-105 contrast-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080b]/92 via-[#07080b]/20 to-transparent p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[8px] tracking-[0.2em] uppercase text-[var(--accent-ice)] font-semibold">
                    <span>{card.tag}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-ice)]" />
                  </div>
                  <div>
                    <p className="font-editorial text-sm md:text-[16px] leading-tight text-white font-medium">
                      {card.title}
                    </p>
                    <p className="text-[9px] text-white/65 truncate mt-0.5">{card.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lớp Tiền cảnh Trung tâm (z-20): Chân dung động tóc bay nhẹ lặp vô tận */}
        <div className="relative z-20 flex flex-col items-center justify-end pointer-events-none">
          <div className="relative w-[320px] sm:w-[400px] md:w-[500px] lg:w-[545px] h-[395px] sm:h-[475px] md:h-[585px] lg:h-[645px] flex items-end justify-center select-none">
            <LivingPortraitCanvas
              manifestUrl="./portrait-seq/manifest.json"
              posterSrc={portraitSrc}
              alt={data.fullName}
              className="w-full h-full portrait-fade-mask drop-shadow-[0_24px_55px_rgba(0,0,0,0.98)]"
            />
          </div>
        </div>

        {/* Lớp Phủ Bóng Chân Hero giúp chữ 2 bên nổi bật tuyệt đối */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07080b] via-[#07080b]/65 to-transparent z-20" />

        {/* Hàng Nội dung Dưới cùng (z-30) */}
        <div className="lg:absolute lg:inset-x-0 lg:bottom-7 relative z-30 max-w-[1440px] w-full mx-auto px-6 md:px-12 pb-8 lg:pb-0 grid grid-cols-1 lg:grid-cols-12 items-end gap-6">
          {/* Góc Trái Dưới */}
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.26em] text-[var(--accent-ice)] font-semibold">
              {data.heroGreeting}
            </p>
            <h1 className="font-editorial text-5xl sm:text-6xl xl:text-[68px] leading-[0.94] tracking-[-0.02em] text-white font-normal">
              {data.roleTitleLine1}
              <br />
              <span className="italic font-normal text-white/95">{data.roleTitleLine2}</span>
            </h1>
            <p className="text-xs text-white/65 tracking-wide pt-0.5">{data.subHeadline}</p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#f5f6f8] hover:bg-white text-[#090a0f] pr-5 pl-1.5 py-1.5 text-xs md:text-[13px] font-semibold transition-all duration-300 shadow-[0_12px_35px_rgba(255,255,255,0.16)]"
              >
                <span className="h-7 w-7 rounded-full bg-[#090a0f] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span>Connect for Engagement</span>
              </a>

              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 hover:bg-white/[0.1] hover:border-white/30 px-4 py-2 text-xs text-white/85 backdrop-blur-md transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--accent-ice)]" />
                <span>{data.email}</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-3" />

          {/* Góc Phải Dưới */}
          <div className="lg:col-span-4 max-w-md lg:ml-auto space-y-2">
            <blockquote className="font-editorial text-base sm:text-lg xl:text-[20px] leading-[1.34] text-white/85">
              &ldquo;{data.heroQuotePrefix}
              <strong className="font-semibold text-white">{data.heroQuoteHighlight}</strong>
              {data.heroQuoteSuffix}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between pt-1">
              <span className="font-signature text-3xl xl:text-[38px] leading-none text-[var(--accent-ice)] tracking-wide select-none -rotate-2">
                {data.signatureText}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                {data.birthDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
