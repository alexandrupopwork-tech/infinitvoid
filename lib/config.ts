export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://infinitvoid.com";

export const SITE_NAME = "INFINITVOID";

export const TAGLINE = "Built for the void between reps.";

export const TAGLINE_SUB = "Designed for those who move differently.";

/**
 * ISO 8601 timestamp. Override with NEXT_PUBLIC_LAUNCH_DATE to change the
 * drop date without a code change.
 */
export const LAUNCH_DATE =
  process.env.NEXT_PUBLIC_LAUNCH_DATE || "2026-10-01T00:00:00-04:00";

export const COPY = {
  hero: {
    headline: "ENTER THE VOID",
    sub: "The first collection is approaching.",
    subEmphasis: "Not everyone will make it inside.",
    emailPlaceholder: "your@email.com",
    cta: "NOTIFY ME",
    ctaPending: "OPENING…",
  },
  success: {
    headline: "WELCOME TO THE VOID.",
    body: "Your star is in the sky. We'll reach out when the door opens.",
  },
  philosophy: {
    eyebrow: "The Philosophy",
    lines: [
      "The void is not empty. It is unwritten.",
      "Not clothing. Identity. Not a trend. A direction.",
      "We build for the ones who move before the rest understand why.",
    ],
  },
  firstDrop: {
    eyebrow: "The First Drop",
    headline: "It won't return.",
    body: "Limited pieces. No mass production. No permanent collection. Once it's gone, it's gone — and it isn't coming back.",
    countdownLabel: "Doors open in",
  },
  firstWave: {
    eyebrow: "Join The First Wave",
    headline: "Be inside before it exists.",
    body: "Subscribers get in first — everyone else finds out after.",
    benefits: [
      "Early access before public release",
      "Exclusive drop announcements",
      "Behind-the-scenes from the studio",
      "First chance to purchase — before it sells out",
    ],
    cta: "CLAIM YOUR PLACE",
  },
} as const;

export const IMAGES = {
  logo: "/images/logo.png",
  hoodieJoggerSet:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3GlKKGrFEgrTveXDzx5pDsAUZ3y/hf_20260802_182652_e18e2c9f-2d6e-4861-b99e-6f041c2e04a6.png",
  tracksuitJoggerSet:
    "https://d8j0ntlcm91z4.cloudfront.net/user_3GlKKGrFEgrTveXDzx5pDsAUZ3y/hf_20260802_182659_2c72bfc0-c386-47ed-91bc-f100eaa90c31.png",
} as const;

/** Intrinsic pixel size of /public/images/logo.png, used to keep its aspect ratio. */
export const LOGO_DIMENSIONS = { width: 1652, height: 591 } as const;

export const SOCIALS = {
  instagram: "https://instagram.com/infinitvoid",
  tiktok: "https://tiktok.com/@infinitvoid",
} as const;

export const PRODUCTS = [
  {
    id: "hoodie-jogger",
    name: "Hoodie + Jogger Set",
    description: "Heavyweight cut-and-sew hoodie and tapered jogger, built as one silhouette.",
    image: IMAGES.hoodieJoggerSet,
  },
  {
    id: "tracksuit-jogger",
    name: "Tracksuit + Jogger Set",
    description: "Full-zip tracksuit jacket and matching jogger, engineered for movement.",
    image: IMAGES.tracksuitJoggerSet,
  },
] as const;
