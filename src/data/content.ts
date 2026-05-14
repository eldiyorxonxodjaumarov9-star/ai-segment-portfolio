export const socialLinks = {
  /** AI SEGMENT | PROYEKTLAR — asosiy kanal */
  telegram: "https://t.me/segment_ai",
  instagram: "https://www.instagram.com/ai_segment",
  youtube: "https://www.youtube.com/@ai_segment/shorts",
  /** Hamkorlik — @segment_admin */
  telegramPartner: "https://t.me/segment_admin",
} as const;

export const brands = [
  { name: "NEXORA", tone: "from-cyan-500/30 to-violet-600/40" },
  { name: "VELTRIX", tone: "from-fuchsia-500/30 to-cyan-500/30" },
  { name: "ORBITLY", tone: "from-emerald-400/25 to-cyan-500/35" },
  { name: "LUMINA", tone: "from-violet-500/35 to-fuchsia-500/25" },
  { name: "SYNapse", tone: "from-sky-400/30 to-indigo-600/35" },
  { name: "PRISM", tone: "from-rose-500/25 to-cyan-400/30" },
  { name: "NOVALABS", tone: "from-cyan-400/30 to-purple-600/35" },
  { name: "FLUX", tone: "from-amber-400/20 to-cyan-500/35" },
];

export const topVideos = [
  {
    id: "v1",
    title: "AI reklama — 24 soatda 10M ko‘rish",
    description: "Generativ vizual + sinematograf montaj, brend ovozi bilan sinxron.",
    views: 12_400_000,
    likes: 892_000,
    uploadedAt: "2026-03-02",
    thumbSeed: "ai-segment-1",
  },
  {
    id: "v2",
    title: "Viral Shorts seriyasi — 8 qism",
    description: "Hook → AI B-roll → motion titrlar. Retention 78%.",
    views: 8_920_000,
    likes: 541_000,
    uploadedAt: "2026-02-18",
    thumbSeed: "ai-segment-2",
  },
  {
    id: "v3",
    title: "Cyber-launch trailer",
    description: "Neon HUD, 3D partikullar, Apple-grade minimal typography.",
    views: 5_100_000,
    likes: 312_000,
    uploadedAt: "2026-01-09",
    thumbSeed: "ai-segment-3",
  },
  {
    id: "v4",
    title: "AI avatar + ovoz — UGC kampaniya",
    description: "Real vaqt rejimida sozlangan AI presenter + brand safety.",
    views: 3_760_000,
    likes: 198_000,
    uploadedAt: "2025-12-21",
    thumbSeed: "ai-segment-4",
  },
  {
    id: "v5",
    title: "Dokumenter uslubida brend hikoya",
    description: "Grain, film color, archival AI upscale, orchestral mix.",
    views: 2_050_000,
    likes: 124_000,
    uploadedAt: "2025-11-04",
    thumbSeed: "ai-segment-5",
  },
  {
    id: "v6",
    title: "Motion-first product reveal",
    description: "Macro shots + procedural particles + sinxron beat design.",
    views: 1_480_000,
    likes: 96_000,
    uploadedAt: "2025-10-12",
    thumbSeed: "ai-segment-6",
  },
];

export const clientWorks = [
  {
    id: "c1",
    client: "NEXORA Mobility",
    beforeSeed: "ba-before-1",
    afterSeed: "ba-after-1",
    stats: [
      { label: "Ko‘rishlar", value: "+420%" },
      { label: "CTR", value: "+2.8x" },
      { label: "Saqlanish", value: "+64%" },
    ],
    caption: "AI generatsiya + real suratlar aralashmasi, Cinematic grade.",
  },
  {
    id: "c2",
    client: "VELTRIX Finance",
    beforeSeed: "ba-before-2",
    afterSeed: "ba-after-2",
    stats: [
      { label: "Viral seriya", value: "12M" },
      { label: "Lead", value: "+31%" },
      { label: "CPM", value: "-38%" },
    ],
    caption: "HUD dashboard UI, neon glass, investor pitch toni.",
  },
  {
    id: "c3",
    client: "LUMINA Beauty",
    beforeSeed: "ba-before-3",
    afterSeed: "ba-after-3",
    stats: [
      { label: "TikTok", value: "Top 3" },
      { label: "UGC", value: "840+" },
      { label: "ROI", value: "4.1x" },
    ],
    caption: "Before/After vizual hook + AI skin-safe retouch pipeline.",
  },
];

export const dashboardStats = [
  { key: "views", label: "Jami ko‘rishlar", value: 128_400_000, suffix: "", prefix: "" },
  { key: "projects", label: "Ishlangan loyihalar", value: 342, suffix: "", prefix: "" },
  { key: "revenue", label: "Jamg‘arilgan mablag‘", value: 2_450_000_000, suffix: " so‘m", prefix: "" },
  { key: "aiSpend", label: "AI uchun sarflangan", value: 186_000_000, suffix: " so‘m", prefix: "" },
  { key: "editSpend", label: "Montaj uchun sarflangan", value: 94_000_000, suffix: " so‘m", prefix: "" },
  { key: "tools", label: "AI tools soni", value: 28, suffix: "", prefix: "" },
] as const;

export const videoComments = [
  {
    videoId: "v1",
    videoTitle: "AI reklama — 24 soatda 10M ko‘rish",
    comments: [
      {
        id: "cm1",
        user: "sarvar.media",
        avatarSeed: "cm-1",
        text: "Grade va pacing juda toza. Qaysi AI stack ishlatilgan?",
        likes: 3421,
        time: "2 soat oldin",
      },
      {
        id: "cm2",
        user: "dilshod.cuts",
        avatarSeed: "cm-2",
        text: "Brend ovozi bilan vizual sinxron — bu premium daraja.",
        likes: 1204,
        time: "5 soat oldin",
      },
      {
        id: "cm3",
        user: "investor.uz",
        avatarSeed: "cm-3",
        text: "Pitch deck emas, to‘g‘ridan-to‘g‘ri WOW. Hamkorlik uchun yozaman.",
        likes: 892,
        time: "1 kun oldin",
      },
    ],
  },
  {
    videoId: "v2",
    videoTitle: "Viral Shorts seriyasi — 8 qism",
    comments: [
      {
        id: "cm4",
        user: "shorts_lab",
        avatarSeed: "cm-4",
        text: "Hook 0.4s — to‘g‘ri. Keyingi qism qachon?",
        likes: 2102,
        time: "3 soat oldin",
      },
      {
        id: "cm5",
        user: "maya.motion",
        avatarSeed: "cm-5",
        text: "Motion titrlar juda silliq, qora fonda neon ideal ketgan.",
        likes: 876,
        time: "8 soat oldin",
      },
    ],
  },
];
