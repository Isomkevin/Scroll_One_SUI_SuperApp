import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Scroll.io theme colors
        background: {
          primary: "#FFF8F3",    // Seashell peach - main app background
          secondary: "#FFF3EA",  // subtle variation
          tertiary: "#FFE4CC",   // slightly deeper peach
          elevated: "#FFDEB5",   // elevated surfaces
        },
        surface: "#FFF8F3",      // Default surface for cards/containers
        border: {
          subtle: "#E5E7EB",
          medium: "#E5E7EB",
          strong: "#CBD5F5",
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          tertiary: "#94A3B8",
          muted: "#94A3B8",
        },
        accent: {
          primary: "#6E56CF",    // Primary Scroll accent
          secondary: "#4C3DF2",  // Secondary accent
          DEFAULT: "#6E56CF",
        },
        status: {
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#DC2626",
          info: "#4C3DF2",
        },
        // Legacy scroll colors (kept for compatibility)
        scroll: {
          DEFAULT: "#6E56CF",
          dark: "#4C3DF2",
          light: "#818CF8",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-scroll": "linear-gradient(135deg, #6E56CF 0%, #4C3DF2 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
