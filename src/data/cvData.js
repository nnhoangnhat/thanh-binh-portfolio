// Dữ liệu CV chính thức được chuẩn hóa 100% từ hồ sơ PDF của Nguyễn Thị Thanh Bình
export const cvData = {
  personal: {
    brandMark: 'thanhbinh.',
    fullName: 'Nguyễn Thị Thanh Bình',
    shortName: 'Thanh Bình',
    signatureText: 'Thanh Binh',
    eyebrowPillars: 'COMMUNICATIONS  •  PUBLIC RELATIONS  •  INTERNATIONAL ENGAGEMENT',
    heroGreeting: "HI, I'M NGUYỄN THỊ THANH BÌNH",
    roleTitleLine1: 'Communications',
    roleTitleLine2: 'Team Leader',
    subHeadline: 'Corporate Communications  •  PR  •  International Relations',
    organization: 'TNI King Coffee',
    tenure: 'December 2020 – Present',
    birthDate: 'Born 23 December',
    availability: 'Principal Rep.',
    availabilitySub: 'Acting Lead Since 2023',
    locationLabel: 'Based in',
    locationValue: 'Viet Nam • Global Outreach',
    email: 'binhnguyen231298@gmail.com',
    phone: '+84 763 231 298',
    phoneRaw: '+84763231298',
    heroQuotePrefix: 'I partner with executive leadership and diplomatic missions to ',
    heroQuoteHighlight: 'craft authoritative narratives & high-protocol global events',
    heroQuoteSuffix: ', turning strategic vision into lasting international trust.',
    profileSummary:
      'Communications leader with nearly six years of progressive experience at TNI King Coffee, advancing from intern to Communications Team Leader. Since 2023, has served as the principal communications representative for the Group during a period without a department head. Leads executive, corporate and brand communications, media relations, diplomatic engagement and high-profile event delivery, combining strategic planning with hands-on coordination across local and international stakeholders.',
  },

  // 8 thẻ dự án hiển thị trên vòng cung 3D ở Hero Section
  orbitalCards: [
    {
      id: 'orb-1',
      tag: 'HANOI • MAR 2026',
      title: 'International Coffee Conference 2026',
      subtitle: 'Head of Organizing Committee • GCA Launch',
      image: './images/conference-2026.png',
    },
    {
      id: 'orb-2',
      tag: '81 DIPLOMATIC MISSIONS',
      title: 'Embassy & Diplomatic Engagement',
      subtitle: 'Bilateral Briefings & Protocol Focal Point',
      image: './images/diplomatic-missions.png',
    },
    {
      id: 'orb-3',
      tag: 'LAM DONG • DEC 2025',
      title: 'Global Coffee Heritage Festival',
      subtitle: 'Deputy Head of Organizing Committee',
      image: './images/heritage-festival.png',
    },
    {
      id: 'orb-4',
      tag: 'FORBES VN • STRAITS TIMES',
      title: 'CEO & Executive Positioning',
      subtitle: 'Founder Speeches, Profiles & Media Q&A',
      image: './images/executive-press.png',
    },
    {
      id: 'orb-5',
      tag: 'GCA • AI COFFEE ACADEMY',
      title: 'Global Alliance & Platform PR',
      subtitle: 'Origin, Sustainability & Innovation Narratives',
      image: './images/global-alliance.png',
    },
    {
      id: 'orb-6',
      tag: 'SINGAPORE • SHANGHAI 2025',
      title: 'International Brand Milestones',
      subtitle: 'Vietnam Coffee Festival & Hotelex Shanghai',
      image: './images/conference-2026.png',
    },
    {
      id: 'orb-7',
      tag: 'TNI KING COFFEE • 2023–PRESENT',
      title: 'Principal Group Representative',
      subtitle: 'Acting Departmental Lead & Annual PR Strategy',
      image: './images/diplomatic-missions.png',
    },
    {
      id: 'orb-8',
      tag: 'BILATERAL PROTOCOL',
      title: '~45 Diplomatic Meetings',
      subtitle: 'Vietnamese & English Stakeholder Relations',
      image: './images/executive-press.png',
    },
  ],

  // 4 chỉ số định lượng nổi bật kết nối vào thẻ Vòm (Arch Section - Tương ứng "WHY US" trên mẫu gốc)
  impactSection: {
    eyebrow: 'IMPACT & TRACK RECORD',
    watermark: 'IMPACT',
    heading: 'Communications that command global trust',
    body: 'Advancing from intern to acting departmental lead at TNI King Coffee — bridging executive vision, international press, and diplomatic protocol with calm precision.',
    metrics: [
      {
        id: 'kpi-1',
        position: 'top-left',
        prefix: '',
        target: 6,
        suffix: ' Yrs',
        displayOverride: '~6 Yrs',
        caption: 'PROGRESSIVE TENURE AT TNI KING COFFEE — ACTING DEPARTMENTAL LEAD SINCE 2023',
      },
      {
        id: 'kpi-2',
        position: 'top-right',
        prefix: '',
        target: 81,
        suffix: '',
        caption: 'DIPLOMATIC MISSIONS & EMBASSIES ENGAGED IN BILATERAL OUTREACH',
      },
      {
        id: 'kpi-3',
        position: 'bottom-left',
        prefix: '~',
        target: 45,
        suffix: '',
        caption: 'HIGH-LEVEL DIPLOMATIC & STAKEHOLDER MEETINGS DELIVERED BY NOV 2026',
      },
      {
        id: 'kpi-4',
        position: 'bottom-right',
        prefix: '0',
        target: 2,
        suffix: '',
        caption: 'FLAGSHIP INTERNATIONAL COFFEE EVENTS LED IN ORGANIZING COMMITTEE ROLES',
      },
    ],
  },

  // 4 sự kiện & chương trình trọng điểm (Bố cục so le 01. -> 04. chuẩn "HOW WE WORK" mẫu gốc)
  flagshipEvents: [
    {
      number: '01.',
      roleBadge: 'Head of the Organizing Committee',
      title: 'International Coffee Conference 2026',
      meta: '26 March 2026  •  Hanoi',
      description:
        'Head of the Organizing Committee for the flagship conference held alongside the official launch of the Global Coffee Alliance (GCA) and the Global Coffee Declaration. Led end-to-end communications and event coordination across program materials, VIP guest and stakeholder communications, diplomatic protocol, media preparation, and cross-team delivery.',
      highlights: ['Global Coffee Alliance (GCA)', 'Global Coffee Declaration', 'Protocol & Media Command'],
      image: './images/conference-2026.png',
    },
    {
      number: '02.',
      roleBadge: 'Communications Focal Point',
      title: 'Embassy & Diplomatic Engagement Program',
      meta: '2026  •  Viet Nam & 81 International Missions',
      description:
        'Coordinated strategic outreach to 81 diplomatic missions and served as the primary communications focal point for briefing materials, meeting objectives, leadership talking points, executive profiles, cooperation one-pagers, media permissions, bilingual follow-up, and consolidated reporting — with ~25 meetings completed by October 2026 and scaling to ~45 meetings by November 2026.',
      highlights: ['81 Missions Contacted', 'Bilingual Diplomatic Briefings', 'Executive Talking Points'],
      image: './images/diplomatic-missions.png',
    },
    {
      number: '03.',
      roleBadge: 'Deputy Head of the Organizing Committee',
      title: 'Global Coffee Heritage Festival 2025',
      meta: 'December 2025  •  Lam Dong',
      description:
        'Served as Deputy Head of the Organizing Committee for the landmark cultural and industry festival celebrating Vietnamese coffee heritage. Directed communications workflows and cross-partner coordination, encompassing domestic and international guest outreach, official program narratives, event information architecture, and stakeholder-facing materials.',
      highlights: ['Cultural & Heritage Positioning', 'International Partner Outreach', 'Program Direction'],
      image: './images/heritage-festival.png',
    },
    {
      number: '04.',
      roleBadge: 'Global Brand & Retail PR',
      title: 'Domestic & International Brand Communications',
      meta: 'Ongoing  •  Viet Nam, Singapore & Shanghai',
      description:
        'Architected omni-channel communications for King Coffee domestic initiatives and flagship retail milestones — authoring store-opening scripts, executive speeches, VIP invitations, internal notices, press releases, and social coverage — while driving international stakeholder communications at the Vietnam Coffee Festival in Singapore and Hotelex Shanghai 2025.',
      highlights: ['Vietnam Coffee Festival (Singapore)', 'Hotelex Shanghai 2025', 'Retail Milestone PR'],
      image: './images/global-alliance.png',
    },
  ],

  // 3 trụ cột chuyên môn trong danh mục Communications Portfolio (Trang 3 PDF)
  portfolioPillars: [
    {
      index: 'I',
      title: 'CEO & Executive Communications',
      subtitle: 'Leadership Positioning & International Media',
      image: './images/executive-press.png',
      points: [
        'Prepared executive profiles, keynote speeches, interview responses, Q&A, briefing notes, key messages, and formal correspondence for the Founder and CEO.',
        'Spearheaded interview preparation and editorial coordination for tier-one outlets including The Straits Times and Forbes Vietnam, alongside leadership-profile and recognition communications.',
        'Reviewed sensitive strategic messaging to ensure strict alignment with leadership direction, corporate positioning, and diplomatic protocol requirements.',
      ],
    },
    {
      index: 'II',
      title: 'Corporate, Brand & Platform Communications',
      subtitle: 'TNI King Coffee  •  King Coffee  •  GCA  •  ACA',
      image: './images/global-alliance.png',
      points: [
        'Created and edited authoritative corporate narratives, press releases, media kits, company profiles, executive presentations, event scripts, invitations, internal news, and digital content.',
        'Developed foundational profile and partnership materials for the Global Coffee Alliance (GCA) and AI Coffee Academy (ACA), articulating purpose, flagship programs, and global collaboration avenues.',
        'Connected brand storytelling with Vietnamese coffee heritage, origin excellence, AI innovation, sustainability, cultural tourism, and international cooperation.',
      ],
    },
    {
      index: 'III',
      title: 'Media, PR & Stakeholder Engagement',
      subtitle: 'Domestic & International Ecosystem',
      image: './images/diplomatic-missions.png',
      points: [
        'Coordinated high-trust communications across journalists, press agencies, embassies, trade offices, universities, industry associations, and event partners — managing interview logistics, press inquiries, approvals, and post-event follow-up.',
        'Authored audience-specific correspondence and bilateral materials in both Vietnamese and English to maintain unified brand voice across global markets.',
      ],
    },
  ],

  // Lộ trình thăng tiến sự nghiệp tại TNI King Coffee (Trang 1 & 2 PDF)
  experienceTimeline: [
    {
      period: '2024 – Present',
      badge: 'Acting Departmental Lead Since 2023',
      role: 'Communications Team Leader',
      organization: 'TNI King Coffee',
      summary: 'Principal communications representative for the Group during a period without a department head.',
      bullets: [
        'Lead planning and coordination of communications for TNI King Coffee, its executive leadership, the King Coffee brand, and Group-wide initiatives across domestic and international channels.',
        'Set strategic content direction and drive annual communications planning, PR priorities, press coordination, and cross-functional delivery aligned with corporate objectives.',
        'Represent the Communications Department directly with C-suite leadership, business units, journalists, embassies, and external stakeholders; govern materials from brief and sensitive review through final approval and follow-up.',
      ],
    },
    {
      period: '2022 – 2024',
      badge: 'Executive & Brand Scope Expansion',
      role: 'Senior Communication Executive',
      organization: 'TNI King Coffee',
      summary: 'Expanded responsibility for executive, corporate, and international brand communications.',
      bullets: [
        'Developed and delivered keynote speeches, media interview Q&A, executive profiles, press releases, corporate presentations, event scripts, and media kits for TNI King Coffee and King Coffee.',
        'Coordinated media engagement, diplomatic and stakeholder correspondence, international outreach, and multi-tier approvals across internal teams and external agencies.',
      ],
    },
    {
      period: '2022',
      badge: 'Corporate PR Execution',
      role: 'Communications Executive',
      organization: 'TNI King Coffee',
      summary: 'Core PR campaign delivery and cross-team content production.',
      bullets: [
        'Supported PR implementation and authored corporate and brand communications content while coordinating closely with internal departments and external service providers.',
      ],
    },
    {
      period: 'After Internship – 2022',
      badge: 'Foundation & Fast-Track Growth',
      role: 'Communications Staff',
      organization: 'TNI King Coffee',
      summary: 'Joined in December 2020; fast-tracked from intern to executive communications.',
      bullets: [
        'Progressed rapidly from hands-on support in market research, editorial preparation, event logistics, and daily communications operations into executive-level and department-wide leadership responsibilities.',
      ],
    },
  ],

  // Chuyên môn cốt lõi, Kỹ năng, Ngôn ngữ & Công cụ số (Trang 1 & 3 PDF)
  capabilities: {
    coreExpertise: [
      'Executive & CEO Communications',
      'Corporate & Brand PR',
      'Strategic Communications Planning',
      'Media Relations',
      'Embassy & Diplomatic Engagement',
      'Event Leadership & Protocol',
      'Editorial Development',
      'Internal Communications',
      'Cross-Functional Project Coordination',
    ],
    professionalSkills: [
      'Executive Writing & Editing',
      'PR Planning & Strategy',
      'Media Coordination',
      'Diplomatic Protocol',
      'Event & Project Management',
      'Briefing & Presentation Development',
      'Stakeholder Engagement',
      'Sensitive-Content Review',
      'Bilingual Correspondence',
    ],
    languages: [
      {
        language: 'Vietnamese',
        level: 'Native',
        detail: 'Executive editorial, speeches, press & governmental protocol',
      },
      {
        language: 'English',
        level: 'Professional Working Proficiency',
        detail: 'Written communications, diplomatic briefings & international stakeholder materials',
      },
      {
        language: 'Chinese',
        level: 'Basic',
        detail: 'Foundational conversational & cultural familiarity',
      },
    ],
    digitalTools: [
      {
        category: 'Creative, AI & Social Ecosystem',
        level: 'Proficient',
        items: 'Canva  •  ChatGPT  •  Meta Business Suite',
      },
      {
        category: 'Executive Documentation & Reporting',
        level: 'Professional',
        items: 'Microsoft Word  •  PowerPoint  •  Excel',
      },
    ],
  },
};
