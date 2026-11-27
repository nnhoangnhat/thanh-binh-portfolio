# Nguyễn Thị Thanh Bình — Executive CV & 3D Portfolio

Trang CV & Hồ sơ Năng lực Trực tuyến phong cách **Editorial Luxury Dark (`Espresso Gold`)** tích hợp vòng cung dự án 3D và chân dung động Cinemagraph (`Living Portrait`).

## Cấu trúc thư mục (`E:\Portfolio\NTTB`)

- `src/data/cvData.js` — **Nơi chỉnh sửa toàn bộ nội dung chữ, số liệu KPI, sự kiện, kinh nghiệm và thông tin liên hệ** (chỉ cần sửa tại file này, giao diện tự động cập nhật).
- `src/components/` — Các thành phần giao diện:
  - `HeroSection.jsx` — Đầu trang, vòng xoay 3D 14 thẻ dự án và chân dung trung tâm.
  - `LivingPortraitCanvas.jsx` — Bộ phát chuỗi khung hình chân dung động mượt trên `<canvas>`.
  - `ImpactArchSection.jsx` — Thẻ vòm trung tâm và 4 chỉ số định lượng kèm đường nối 45°.
  - `FlagshipEventsSection.jsx` — 4 sự kiện & chương trình đối ngoại trọng điểm (`01.` – `04.`).
  - `PortfolioAndTimelineSection.jsx` — 3 trụ cột truyền thông & trục thời gian thăng tiến sự nghiệp.
  - `CapabilitiesAndFooter.jsx` — Kỹ năng chuyên môn, ngôn ngữ, công cụ số và chân trang liên hệ.
- `src/index.css` — Hệ thống màu sắc (`Espresso Gold`), font chữ và hiệu ứng hạt nhiễu điện ảnh.
- `public/images/` — Bộ ảnh minh họa sự kiện và ảnh tĩnh đại diện (`studio-portrait.png`).
- `public/portrait-seq/` — Chuỗi 121 khung hình `.webp` tách nền của chân dung động.
- `assets-raw/` — *(Chỉ lưu trên máy tính, không đẩy lên GitHub)* Chứa file video `.mp4` gốc và ảnh chân dung gốc để dự phòng khi cần biên tập lại sau này.
- `.github/workflows/deploy.yml` — Cấu hình tự động đóng gói và xuất bản lên **GitHub Pages**.

## Lệnh chạy chỉnh sửa trên máy tính

Mở PowerShell hoặc Terminal tại `E:\Portfolio\NTTB`:

```powershell
# Chạy máy chủ xem trực tiếp tại http://127.0.0.1:5173/
npm run dev

# Đóng gói kiểm tra bản Production (xuất ra thư mục dist/)
npm run build
```
