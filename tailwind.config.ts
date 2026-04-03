import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Semantic Tokens
        "background-primary": "var(--background-primary)",
        "background-surface": "var(--background-surface)",
        "background-elevated": "var(--background-elevated)",
        "sidebar-background": "var(--sidebar-background)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "accent-primary": "var(--accent-primary)",
        "accent-success": "var(--accent-success)",
        "accent-danger": "var(--accent-danger)",

        // Legacy / Existing mappings (kept for compatibility during refactor)
        background: "var(--background-primary)", 
        foreground: "var(--text-primary)", 
        primary: {
          DEFAULT: "var(--accent-primary)", 
          hover: "#1D4ED8",   
        },
        secondary: "#1D4ED8", 
        navy: "#1E3A8A",      
        surface: "var(--background-surface)",   
        muted: "#9CA3AF", // Updated to a lighter gray for better dark mode text 
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px rgba(79, 70, 229, 0.15)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};
export default config;
