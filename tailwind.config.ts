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
        // Brand colors
        brand: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },
        // Powerlifting specific colors
        powerlifting: {
          squat: "#ef4444",    // Red for squat
          bench: "#3b82f6",    // Blue for bench
          deadlift: "#10b981", // Green for deadlift
        },
        // Custom neutral palette
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        // Status colors
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "inner-lg": "inset 0 2px 4px 0 rgb(0 0 0 / 0.1)",
        "glow": "0 0 20px rgb(234 179 8 / 0.3)",
        "glow-lg": "0 0 40px rgb(234 179 8 / 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "bounce-in": "bounceIn 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        "scroll": "scroll 15s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        scroll: {
          "0%": { top: "100%" },
          "100%": { top: "-100%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        "xs": "475px",
        "3xl": "1600px",
      },
    },
  },
  plugins: [
    // Custom utility classes
    function({ addUtilities }: any) {
      const newUtilities = {
        // Text utilities
        ".text-gradient": {
          "background": "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-gradient-brand": {
          "background": "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        // Glass morphism
        ".glass": {
          "background": "rgba(255, 255, 255, 0.1)",
          "backdrop-filter": "blur(10px)",
          "border": "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          "background": "rgba(0, 0, 0, 0.1)",
          "backdrop-filter": "blur(10px)",
          "border": "1px solid rgba(255, 255, 255, 0.1)",
        },
        // Card styles
        ".card-elevated": {
          "box-shadow": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
        ".card-floating": {
          "box-shadow": "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
        },
        // Button styles
        ".btn-primary": {
          "background": "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
          "color": "#000",
          "font-weight": "600",
          "transition": "all 0.2s ease",
          "&:hover": {
            "transform": "translateY(-1px)",
            "box-shadow": "0 10px 20px rgba(234, 179, 8, 0.3)",
          },
        },
        ".btn-secondary": {
          "background": "rgba(255, 255, 255, 0.1)",
          "backdrop-filter": "blur(10px)",
          "border": "1px solid rgba(255, 255, 255, 0.2)",
          "color": "#fff",
          "transition": "all 0.2s ease",
          "&:hover": {
            "background": "rgba(255, 255, 255, 0.2)",
            "transform": "translateY(-1px)",
          },
        },
        // Layout utilities
        ".container-custom": {
          "max-width": "1200px",
          "margin": "0 auto",
          "padding": "0 1rem",
          "@screen sm": {
            "padding": "0 2rem",
          },
        },
        // Animation utilities
        ".animate-on-scroll": {
          "opacity": "0",
          "transform": "translateY(20px)",
          "transition": "all 0.6s ease-out",
          "&.visible": {
            "opacity": "1",
            "transform": "translateY(0)",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
