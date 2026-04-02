import type { Config } from "tailwindcss";

export default {
  darkMode: ["class", ".dark"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(79, 70, 229, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3)",
      },
    },
  },
} satisfies Config;
