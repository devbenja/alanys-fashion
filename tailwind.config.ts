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
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "container-margin": "32px",
        "sm": "8px",
        "md": "16px",
        "gutter": "20px",
        "unit": "4px",
        "lg": "24px",
        "xs": "4px",
        "xl": "48px"
      },
      fontFamily: {
        "body-lg": ["DM Sans", "sans-serif"],
        "h1": ["DM Sans", "sans-serif"],
        "body-md": ["DM Sans", "sans-serif"],
        "label-caps": ["DM Sans", "sans-serif"],
        "h2": ["DM Sans", "sans-serif"],
        "dm-sans": ["DM Sans", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "h1": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "700"}],
        "h2": ["32px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}]
      },
      colors: {
        "on-error-container": "#93000a",
        "primary-fixed-dim": "#eab9ce",
        "on-tertiary-fixed": "#211b05",
        "tertiary-fixed-dim": "#d2c6a3",
        "tertiary-fixed": "#efe2bd",
        "tertiary": "#675e41",
        "surface-container-high": "#e9e8e9",
        "on-tertiary-container": "#60583c",
        "on-surface-variant": "#4f4448",
        "surface-container-low": "#f5f3f4",
        "on-primary-fixed-variant": "#603c4d",
        "on-secondary": "#ffffff",
        "outline": "#817478",
        "secondary-fixed": "#c6e8f8",
        "inverse-surface": "#303031",
        "surface-container-lowest": "#ffffff",
        "surface-tint": "#7a5365",
        "surface-variant": "#e4e2e3",
        "primary-fixed": "#ffd8e7",
        "on-background": "#1b1c1d",
        "inverse-on-surface": "#f2f0f1",
        "tertiary-container": "#dbcfab",
        "background": "#fbf9fa",
        "on-secondary-fixed-variant": "#2a4b58",
        "surface-dim": "#dbd9da",
        "surface": "#fbf9fa",
        "on-error": "#ffffff",
        "outline-variant": "#d2c2c7",
        "on-tertiary": "#ffffff",
        "surface-bright": "#fbf9fa",
        "on-primary-fixed": "#2f1121",
        "on-primary": "#ffffff",
        "surface-container": "#efedee",
        "secondary": "#436370",
        "inverse-primary": "#eab9ce",
        "on-secondary-container": "#476775",
        "on-secondary-fixed": "#001f29",
        "secondary-fixed-dim": "#aaccdb",
        "error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#4e462b",
        "on-primary-container": "#734d5f",
        "primary-container": "#f4c2d7",
        "primary": "#7a5365",
        "on-surface": "#1b1c1d",
        "error": "#ba1a1a",
        "secondary-container": "#c3e5f5"
      }
    },
  },
  plugins: [],
};

export default config;