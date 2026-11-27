import React, { useEffect, useRef, useState } from 'react';

/**
 * LivingPortraitCanvas — Trình phát chuỗi khung hình Cinemagraph tách nền trong suốt trên <canvas>:
 * - Cả ảnh tĩnh <img> và <canvas> đều khóa cứng vị trí `absolute inset-0` chồng khít 100% tại chính giữa ngay từ mili-giây 0 (không bao giờ bị đẩy lệch sang bên khi đang tải trên mạng)
 * - Khởi chạy chuyển động mượt ngay khi nạp xong 24 khung đầu tiên (~0.3s), đồng thời nạp ngầm phần còn lại ở hậu cảnh
 * - Vùng nối vòng lặp đã tích hợp Premultiplied Cosine Crossfade -> Lặp vô tận 0.00ms độ trễ
 */
export default function LivingPortraitCanvas({
  manifestUrl = './portrait-seq/manifest.json',
  posterSrc = './images/studio-portrait.png',
  alt = 'Living Portrait',
  className = '',
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 680, height: 869 });

  useEffect(() => {
    let cancelled = false;
    let rafId = null;
    const bitmaps = [];
    let totalFrames = 0;
    let isVisible = true;
    let loopStarted = false;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    function startRenderLoop(fps, width, height) {
      if (loopStarted || cancelled) return;
      loopStarted = true;

      // Vẽ ngay khung đầu tiên lên canvas trước khi bật opacity để chuyển giao 0 độ trễ
      if (canvasRef.current && bitmaps[0]) {
        const initCtx = canvasRef.current.getContext('2d');
        if (initCtx) {
          initCtx.clearRect(0, 0, width, height);
          initCtx.drawImage(bitmaps[0], 0, 0, width, height);
        }
      }
      setIsReady(true);

      const frameDurationMs = 1000 / fps;
      let lastFrameIdx = 0;
      let startTime = performance.now();

      const renderLoop = (now) => {
        if (cancelled) return;

        if (isVisible && canvasRef.current && totalFrames > 0) {
          const elapsed = now - startTime;
          const desiredIdx = Math.floor(elapsed / frameDurationMs) % totalFrames;
          const bmp = bitmaps[desiredIdx];

          // Chỉ vẽ khi khung hình đích đã giải mã xong; nếu mạng rất chậm chưa kịp tải tới thì giữ êm khung hiện tại
          if (bmp && desiredIdx !== lastFrameIdx) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, width, height);
              ctx.drawImage(bmp, 0, 0, width, height);
              lastFrameIdx = desiredIdx;
            }
          }
        } else {
          startTime = now - Math.max(0, lastFrameIdx) * frameDurationMs;
        }

        rafId = requestAnimationFrame(renderLoop);
      };

      rafId = requestAnimationFrame(renderLoop);
    }

    async function loadSequence() {
      try {
        const res = await fetch(manifestUrl);
        if (!res.ok) return;
        const manifest = await res.json();
        if (cancelled) return;

        const { frameCount, fps = 24, width = 680, height = 869 } = manifest;
        totalFrames = frameCount;
        bitmaps.length = frameCount;
        setDimensions({ width, height });

        const batchSize = 16;
        // Nạp đủ 32 khung đầu (~1.3 giây chuyển động) là cho chạy mượt ngay lập tức không bắt người xem chờ tải hết 121 khung
        const initialBufferThreshold = Math.min(32, frameCount);

        for (let start = 0; start < frameCount; start += batchSize) {
          if (cancelled) return;
          const end = Math.min(frameCount, start + batchSize);
          await Promise.all(
            Array.from({ length: end - start }, async (_, offset) => {
              const idx = start + offset;
              const url = `./portrait-seq/frame_${String(idx).padStart(3, '0')}.webp?v=2`;
              const frameRes = await fetch(url);
              const blob = await frameRes.blob();
              const bmp = await createImageBitmap(blob);
              if (cancelled) {
                bmp.close?.();
                return;
              }
              bitmaps[idx] = bmp;
            })
          );

          if (!loopStarted && end >= initialBufferThreshold) {
            startRenderLoop(fps, width, height);
          }
        }

        if (!loopStarted && !cancelled) {
          startRenderLoop(fps, width, height);
        }
      } catch {
        // Nếu mạng lỗi thì giữ nguyên ảnh tĩnh chính giữa
      }
    }

    loadSequence();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      bitmaps.forEach((bmp) => bmp?.close?.());
    };
  }, [manifestUrl]);

  return (
    <div ref={wrapperRef} className={`relative overflow-hidden hero-portrait-entrance ${className}`}>
      {/* Ảnh tĩnh đặt cố định `absolute inset-0` chính giữa ngay từ mili-giây đầu tiên */}
      <img
        src={posterSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-500 ${
          isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Canvas cũng đặt cố định `absolute inset-0` trùng khít 100% tọa độ với ảnh tĩnh */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        aria-label={alt}
        className={`absolute inset-0 w-full h-full object-contain object-bottom transition-opacity duration-500 ${
          isReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </div>
  );
}
