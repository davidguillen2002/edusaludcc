import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          elevated: "hsl(var(--surface-elevated) / <alpha-value>)",
        },
        brand: {
          50: "hsl(var(--brand-50) / <alpha-value>)",
          100: "hsl(var(--brand-100) / <alpha-value>)",
          200: "hsl(var(--brand-200) / <alpha-value>)",
          400: "hsl(var(--brand-400) / <alpha-value>)",
          500: "hsl(var(--brand-500) / <alpha-value>)",
          600: "hsl(var(--brand-600) / <alpha-value>)",
          700: "hsl(var(--brand-700) / <alpha-value>)",
          900: "hsl(var(--brand-900) / <alpha-value>)",
          DEFAULT: "hsl(var(--brand-500) / <alpha-value>)",
        },
        coral: {
          50: "hsl(var(--coral-50) / <alpha-value>)",
          100: "hsl(var(--coral-100) / <alpha-value>)",
          200: "hsl(var(--coral-200) / <alpha-value>)",
          400: "hsl(var(--coral-400) / <alpha-value>)",
          500: "hsl(var(--coral-500) / <alpha-value>)",
          600: "hsl(var(--coral-600) / <alpha-value>)",
          700: "hsl(var(--coral-700) / <alpha-value>)",
          DEFAULT: "hsl(var(--coral-500) / <alpha-value>)",
        },
        leaf: "hsl(var(--leaf) / <alpha-value>)",
        sun: "hsl(var(--sun) / <alpha-value>)",
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        soft: "0 1px 2px hsl(var(--shadow-color) / 0.04), 0 2px 8px hsl(var(--shadow-color) / 0.06)",
        elevated: "0 8px 24px -8px hsl(var(--shadow-color) / 0.18), 0 2px 6px hsl(var(--shadow-color) / 0.06)",
        glow: "0 0 0 1px hsl(var(--brand-200) / 0.6), 0 12px 40px -10px hsl(var(--brand-500) / 0.35)",
        "glow-coral": "0 0 0 1px hsl(var(--coral-200) / 0.6), 0 12px 40px -10px hsl(var(--coral-500) / 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.75rem, 6vw, 4.75rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.25rem, 5vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(1.75rem, 3.5vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, hsl(var(--brand-600)) 0%, hsl(var(--brand-400)) 100%)",
        "coral-gradient":
          "linear-gradient(135deg, hsl(var(--coral-500)) 0%, hsl(var(--coral-400)) 100%)",
        "hero-gradient":
          "linear-gradient(135deg, hsl(var(--brand-900)) 0%, hsl(var(--brand-700)) 55%, hsl(var(--brand-600)) 100%)",
        "mesh-soft":
          "radial-gradient(at 20% 0%, hsl(var(--brand-100) / 0.6) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(var(--coral-100) / 0.5) 0px, transparent 50%), radial-gradient(at 40% 100%, hsl(var(--brand-50) / 0.8) 0px, transparent 50%)",
        "mesh-warm":
          "radial-gradient(at 0% 0%, hsl(var(--coral-100) / 0.6) 0px, transparent 50%), radial-gradient(at 100% 100%, hsl(var(--brand-100) / 0.7) 0px, transparent 50%)",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
