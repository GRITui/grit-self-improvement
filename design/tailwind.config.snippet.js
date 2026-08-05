/**
 * Tailwind v3 theme.extend snippet for GritDesk (working name).
 * Source of truth: design/tokens.md (TSK-003, UX-UI-Designer-Squad).
 *
 * Engineer-Squad: merge this `extend` block into the scaffolded app's
 * tailwind.config.js (TSK-005). Don't copy verbatim if the config already has
 * an `extend` block — merge key-by-key instead of overwriting.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#F7F8FA",
          100: "#EEF1F5",
          200: "#E2E6ED",
          300: "#C7CEDA",
          400: "#9AA5B8",
          500: "#6B7690",
          600: "#4C5670",
          700: "#333B52",
          800: "#1F2538",
          900: "#12151F",
        },
        brand: {
          50: "#ECFAF8",
          100: "#D2F1EC",
          300: "#7DD3C4",
          500: "#149685",
          600: "#0F7A6C",
          700: "#0C6255",
          900: "#053F36",
        },
        risk: {
          low: "#1A8A5F",
          "low-bg": "#E4F5EC",
          medium: "#B5790A",
          "medium-bg": "#FBF0DC",
          high: "#C23B3B",
          "high-bg": "#FBE6E6",
        },
        success: "#1A8A5F",
        warning: "#B5790A",
        danger: "#C23B3B",
        info: "#149685",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "16px", fontWeight: "500" }],
        sm: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        base: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        lg: ["18px", { lineHeight: "28px", fontWeight: "500" }],
        xl: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "2xl": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "3xl": ["30px", { lineHeight: "36px", fontWeight: "700" }],
        "4xl": ["36px", { lineHeight: "44px", fontWeight: "700" }],
        "5xl": ["48px", { lineHeight: "56px", fontWeight: "700" }],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(18 21 31 / 0.05)",
        md: "0 4px 8px -2px rgb(18 21 31 / 0.08)",
        lg: "0 12px 24px -4px rgb(18 21 31 / 0.12)",
      },
      maxWidth: {
        "7xl": "1280px",
      },
    },
  },
};
