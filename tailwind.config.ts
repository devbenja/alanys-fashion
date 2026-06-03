import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        /* Base dark palette */
        background: "#09090b",
        surface: "#18181b",
        "surface-elevated": "#27272a",
        "surface-high": "#3f3f46",
        border: "#3f3f46",
        "border-subtle": "#27272a",

        /* Text */
        "text-primary": "#fafafa",
        "text-secondary": "#a1a1aa",
        "text-muted": "#52525b",

        /* Accent — Amber Gold */
        accent: "#d97706",
        "accent-hover": "#b45309",
        "accent-light": "#fef3c7",
        "accent-subtle": "#451a03",
        "accent-muted": "#78350f",

        /* Semantic tokens (backward compat) */
        primary: "#d97706",
        "on-primary": "#09090b",
        "primary-container": "#451a03",
        "on-primary-container": "#fef3c7",
        "primary-fixed": "#fef9ee",
        "primary-fixed-dim": "#f59e0b",
        "on-primary-fixed": "#09090b",
        "on-primary-fixed-variant": "#78350f",

        secondary: "#a1a1aa",
        "on-secondary": "#09090b",
        "secondary-container": "#27272a",
        "on-secondary-container": "#d4d4d8",
        "secondary-fixed": "#3f3f46",
        "secondary-fixed-dim": "#52525b",
        "on-secondary-fixed": "#fafafa",
        "on-secondary-fixed-variant": "#a1a1aa",

        tertiary: "#71717a",
        "on-tertiary": "#fafafa",
        "tertiary-container": "#27272a",
        "on-tertiary-container": "#d4d4d8",
        "tertiary-fixed": "#3f3f46",
        "tertiary-fixed-dim": "#52525b",
        "on-tertiary-fixed": "#fafafa",
        "on-tertiary-fixed-variant": "#a1a1aa",

        "on-background": "#fafafa",
        "on-surface": "#fafafa",
        "on-surface-variant": "#a1a1aa",
        "surface-variant": "#27272a",
        "surface-container-lowest": "#09090b",
        "surface-container-low": "#18181b",
        "surface-container": "#1c1c1f",
        "surface-container-high": "#27272a",
        "surface-container-highest": "#27272a",
        "surface-dim": "#09090b",
        "surface-bright": "#3f3f46",
        "surface-tint": "#d97706",

        outline: "#52525b",
        "outline-variant": "#3f3f46",
        "inverse-surface": "#fafafa",
        "inverse-on-surface": "#18181b",
        "inverse-primary": "#78350f",

        error: "#f87171",
        "on-error": "#09090b",
        "error-container": "#450a0a",
        "on-error-container": "#fecaca",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;