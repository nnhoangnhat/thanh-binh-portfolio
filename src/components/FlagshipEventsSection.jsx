import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * FlagshipEventsSection — Tái hiện section "HOW WE WORK" của mẫu Dark Portfolio:
 * - Đường lưới kiến trúc mảnh (Architectural Hairline Grid)
 * - Con số Serif cỡ lớn màu xanh băng (01., 02., 03., 04.)
 * - Bố cục so le Trái - Phải giữa khung ảnh showcase dự án và nội dung lãnh đạo sự kiện
 */
export default function FlagshipEventsSection({ events }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.flagship-row').forEach((row) => {
        gsap.fromTo(
          row,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="flagships"
      ref={sectionRef}
      className="relative border-b border-white/[0.08] bg-[#07080b]"
    >
      {/* Thanh tiêu đề phân khu chuẩn đường kẻ mảnh của mẫu gốc */}
      <div className="border-b border-white/[0.08]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.25em] text-white/85 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-ice)]" />
            <span>SELECTED LEADERSHIP &amp; FLAGSHIP EVENTS</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">
            ORGANIZING COMMITTEE &amp; DIPLOMATIC PROTOCOL
          </span>
        </div>
      </div>

      {/* Các hàng sự kiện so le 01 -> 04 */}
      <div className="max-w-[1440px] mx-auto divide-y divide-white/[0.08]">
        {events.map((item, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <article
              key={item.number}
              className="flagship-row grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              {/* Khối Khung hình Showcase (Bên trái ở hàng lẻ, bên phải ở hàng chẵn) */}
              <div
                className={`lg:col-span-7 p-6 sm:p-10 md:p-14 flex items-center ${
                  isEven
                    ? 'lg:order-2 lg:border-l border-white/[0.08]'
                    : 'lg:order-1 lg:border-r border-white/[0.08]'
                }`}
              >
                <div className="group relative w-full rounded-2xl overflow-hidden border border-white/12 bg-[#0d111a] shadow-[0_30px_80px_rgba(0,0,0,0.75)]">
                  {/* Thanh giả lập cửa sổ Editorial Showcase giống mẫu Dark Portfolio */}
                  <div className="px-4 py-3 border-b border-white/[0.08] bg-[#0b0e15] flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-white/50">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                    </div>
                    <span className="truncate max-w-[240px] sm:max-w-none">{item.meta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-ice)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Khung ảnh với hiệu ứng zoom chậm tinh tế */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07080b]/90 via-[#07080b]/20 to-transparent" />

                    {/* Nhãn vai trò nổi trên mặt ảnh */}
                    <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] bg-black/65 backdrop-blur-md border border-white/15 text-[var(--accent-ice)] font-medium">
                          {item.roleBadge}
                        </span>
                        <h4 className="mt-2 font-editorial text-2xl sm:text-3xl text-white">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Khối Nội dung & Số thứ tự Serif lớn */}
              <div
                className={`lg:col-span-5 p-6 sm:p-10 md:p-14 flex flex-col justify-center ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <span className="font-editorial text-6xl sm:text-7xl md:text-[84px] leading-none text-[var(--accent-ice)] font-normal select-none">
                  {item.number}
                </span>

                <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-white/45 font-medium">
                  {item.meta}
                </p>

                <h3 className="mt-2 font-editorial text-3xl sm:text-4xl md:text-[42px] leading-[1.08] text-white font-normal">
                  {item.title}
                </h3>

                <p className="mt-5 text-sm md:text-[15px] leading-[1.75] text-white/70 font-light">
                  {item.description}
                </p>

                {/* Các từ khóa điểm nhấn của sự kiện */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {item.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] border border-white/12 bg-white/[0.03] text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
