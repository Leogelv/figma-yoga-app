/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "400px",
      },
    },
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#171717",
        primary: "#337FFF",
        "primary-foreground": "#ffffff",
        secondary: "#F5F5F5",
        "secondary-foreground": "#171717",
        muted: "#F5F5F5",
        "muted-foreground": "#737373",
        accent: "#F5F5F5",
        "accent-foreground": "#171717",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        card: "#ffffff",
        "card-foreground": "#171717",
        popover: "#ffffff",
        "popover-foreground": "#171717",
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#337FFF",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        ripple: {
          to: {
            transform: "scale(4)",
            opacity: "0",
          },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        ripple: "ripple 0.7s linear",
        fadeIn: "fadeIn 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss/nesting")],
}; 