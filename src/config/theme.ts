/**
 * Design tokens.
 *
 * The CSS values live in `src/styles/global.css` (the `:root` block) and are
 * wired into Tailwind by `tailwind.config.mjs`, which reads them as channel
 * triplets (`--color-foreground-rgb: 23 23 23`) so opacity modifiers work.
 * This file is only a typed mirror for JS-side logic — do not use it to
 * generate CSS, the palette used to drift out of sync that way.
 */
export const themeConfig = {
  // Colors — mirror of the :root block in global.css
  colors: {
    background: "#F7F5F0",
    foreground: "#171717",
    muted: "#777777",
    accent: "#8B6F47",
    accentLight: "#A68B5B",
    border: "#E5E5E5",
    secondary: "#EDEAE3",
    error: "#DC2626",
  },

  // Typography
  fonts: {
    heading: "Playfair Display, serif",
    body: "Inter, sans-serif",
  },

  // Font Sizes
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },

  // Spacing
  spacing: {
    container: "1280px", // matches max-w-7xl in .container-custom
    section: "6rem",
    sectionMobile: "4rem",
  },

  // Border Radius
  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },

  // Breakpoints (for reference in JS)
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Animation Durations
  animation: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "700ms",
  },

  // Z-Index Scale
  zIndex: {
    dropdown: "10",
    sticky: "20",
    fixed: "30",
    // Overlays above the navbar, which uses z-50.
    modal: "70",
    tooltip: "50",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
  },

  // Product Card
  productCard: {
    aspectRatio: "4/5",
    imageHoverScale: "1.05",
  },
} as const;