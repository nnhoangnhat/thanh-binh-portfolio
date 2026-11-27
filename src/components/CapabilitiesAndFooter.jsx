import React, { useState } from 'react';
import { Mail, Phone, Check, Copy, Globe2 } from 'lucide-react';

/**
 * CapabilitiesAndFooter — Hiển thị ma trận Chuyên môn cốt lõi, Kỹ năng, Ngôn ngữ, Công cụ số
 * và Phần kết trang (Executive Contact CTA)
 */
export default function CapabilitiesAndFooter({ capabilities, personal }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  return (
    <>
      {/* ====================================================================
          MA TRẬN CHUYÊN MÔN, KỸ NĂNG, NGÔN NGỮ & CÔNG CỤ SỐ
         ==================================================================== */}
      <section className="border-b border-white/[0.08] bg-[#07080b]">
        <div className="border-b border-white/[0.08]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.25em] text-white/85 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-ice)]" />
              <span>CORE EXPERTISE, LANGUAGES &amp; DIGITAL TOOLS</span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">
              EXECUTIVE COMPETENCIES
            </span>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          {/* Cột 1: Core Expertise & Professional Skills */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 space-y-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-ice)] font-semibold mb-4">
                CORE STRATEGIC EXPERTISE
              </p>
              <div className="flex flex-wrap gap-2.5">
                {capabilities.coreExpertise.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full text-xs sm:text-[13px] border border-white/14 bg-white/[0.03] hover:border-[var(--accent-ice)] hover:bg-white/[0.06] text-white/90 transition-all"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/[0.08]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-ice)] font-semibold mb-4">
                PROFESSIONAL SKILLS &amp; PROTOCOL EXECUTION
              </p>
              <div className="flex flex-wrap gap-2.5">
                {capabilities.professionalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-lg text-xs border border-white/10 bg-[#0d111a] text-white/75"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cột 2: Languages & Digital Tools */}
          <div className="lg:col-span-5 p-6 sm:p-10 md:p-14 space-y-10">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[var(--accent-ice)] font-semibold mb-5">
                <Globe2 className="w-3.5 h-3.5" />
                <span>LANGUAGES</span>
              </div>
              <div className="space-y-4">
                {capabilities.languages.map((lang) => (
                  <div
                    key={lang.language}
                    className="p-4 rounded-xl border border-white/[0.08] bg-[#0b0e15]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-editorial text-xl text-white">{lang.language}</span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-ice)] font-medium">
                        {lang.level}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">{lang.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--accent-ice)] font-semibold mb-4">
                DIGITAL &amp; AI WORKFLOW TOOLS
              </p>
              <div className="space-y-3">
                {capabilities.digitalTools.map((tool) => (
                  <div
                    key={tool.category}
                    className="p-4 rounded-xl border border-white/[0.08] bg-[#0b0e15]"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/55">{tool.category}</span>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-white/80">
                        {tool.level}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-white">{tool.items}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          EXECUTIVE CONTACT FOOTER
         ==================================================================== */}
      <footer id="contact" className="relative overflow-hidden bg-[#07080b] pt-24 pb-28">
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[720px] h-[340px] rounded-full blur-[150px] opacity-30"
          style={{
            background: 'radial-gradient(circle, var(--arch-surface) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--accent-ice)] font-semibold">
            {personal.eyebrowPillars}
          </p>

          <h2 className="mt-5 font-editorial text-5xl sm:text-6xl md:text-[78px] leading-[0.98] text-white max-w-4xl font-normal">
            Ready to lead high-stakes{' '}
            <span className="italic text-[var(--accent-ice)]">global communications</span> &amp;
            executive engagement.
          </h2>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-3 rounded-full bg-white text-[#07080b] hover:bg-white/90 px-7 py-3.5 text-xs sm:text-sm font-semibold transition-all shadow-[0_14px_40px_rgba(255,255,255,0.16)]"
            >
              <Mail className="w-4 h-4" />
              <span>{personal.email}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] px-5 py-3.5 text-xs sm:text-sm text-white/90 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[var(--accent-ice)]" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={`tel:${personal.phoneRaw}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] px-6 py-3.5 text-xs sm:text-sm text-white/90 transition-all"
            >
              <Phone className="w-4 h-4 text-[var(--accent-ice)]" />
              <span>{personal.phone}</span>
            </a>
          </div>

          <div className="mt-20 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-white/45">
            <div>
              <span className="font-editorial text-lg text-white mr-3">{personal.brandMark}</span>
              <span>
                {personal.fullName} &nbsp;|&nbsp; {personal.organization}
              </span>
            </div>
            <div className="uppercase tracking-[0.2em] text-[10px]">
              CURRICULUM VITAE &amp; EXECUTIVE PORTFOLIO
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
