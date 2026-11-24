import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds: Deep Midnight Navy from Design UI UX.pdf
        background: {
          DEFAULT: "#011024",
          alt: "#021126",
          surface: "#04162B",
          card: "#091B30",
          cardHover: "#0E223D",
        },
        // Geospatial Electric Cyan Brand Accent
        primary: {
          DEFAULT: "#00D2EE",
          foreground: "#011024",
          hover: "#00B8D4",
          muted: "rgba(0, 210, 238, 0.15)",
        },
        // Deep Ocean Blue Accent
        secondary: {
          DEFAULT: "#004090",
          foreground: "#FFFFFF",
          hover: "#0256B8",
          muted: "rgba(0, 64, 144, 0.2)",
        },
        // Semantic Geosphere Module Accents (Matches the 6 Sferas in Design UI UX.pdf)
        module: {
          litosfer: "#D9480F",   // Lava Red-Orange
          pedosfer: "#D97706",   // Soil Ochre / Amber
          atmosfer: "#38BDF8",   // Sky Cyan
          hidrosfer: "#0284C7",  // Oceanic Deep Blue
          biosfer: "#10B981",    // Rainforest Emerald
          antroposfer: "#8B5CF6",// Urban Violet
          spasial: "#06B6D4",    // Google Maps Teal
        },
        border: {
          DEFAULT: "rgba(0, 210, 238, 0.15)",
          bright: "rgba(0, 210, 238, 0.4)",
          card: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        display: ["Newsreader", "Playfair Display", "Georgia", "serif"],
        heading: ["Newsreader", "Playfair Display", "Poppins", "serif"],
        sans: ["Plus Jakarta Sans", "Poppins", "Noto Sans", "sans-serif"],
        body: ["Plus Jakarta Sans", "Noto Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 210, 238, 0.25)",
        "glow-lg": "0 0 35px rgba(0, 210, 238, 0.4)",
        "glow-litosfer": "0 0 25px rgba(217, 72, 15, 0.35)",
        "glow-pedosfer": "0 0 25px rgba(217, 119, 6, 0.35)",
        "glow-atmosfer": "0 0 25px rgba(56, 189, 248, 0.35)",
        "glow-hidrosfer": "0 0 25px rgba(2, 132, 199, 0.35)",
        "glow-biosfer": "0 0 25px rgba(16, 185, 129, 0.35)",
        "glow-antroposfer": "0 0 25px rgba(139, 92, 246, 0.35)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
