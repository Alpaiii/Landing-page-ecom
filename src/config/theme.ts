export const themeConfig = {
  // Colors
  colors: {
    primary: "#1a1a1a",
    secondary: "#f5f5f5",
    accent: "#8b7355",
    background: "#ffffff",
    foreground: "#1a1a1a",
    muted: "#6b7280",
    border: "#e5e5e5",
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
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
    container: "1400px",
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
    modal: "40",
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
};

// CSS Variables Generator (for use in global styles)
export const cssVariables = `
  :root {
    --color-primary: ${themeConfig.colors.primary};
    --color-secondary: ${themeConfig.colors.secondary};
    --color-accent: ${themeConfig.colors.accent};
    --color-background: ${themeConfig.colors.background};
    --color-foreground: ${themeConfig.colors.foreground};
    --color-muted: ${themeConfig.colors.muted};
    --color-border: ${themeConfig.colors.border};
    --color-success: ${themeConfig.colors.success};
    --color-error: ${themeConfig.colors.error};
    --color-warning: ${themeConfig.colors.warning};
    
    --font-heading: ${themeConfig.fonts.heading};
    --font-body: ${themeConfig.fonts.body};
    
    --radius-sm: ${themeConfig.radius.sm};
    --radius-md: ${themeConfig.radius.md};
    --radius-lg: ${themeConfig.radius.lg};
    --radius-xl: ${themeConfig.radius.xl};
    
    --container-max: ${themeConfig.spacing.container};
    --section-padding: ${themeConfig.spacing.section};
    --section-padding-mobile: ${themeConfig.spacing.sectionMobile};
    
    --animation-fast: ${themeConfig.animation.fast};
    --animation-normal: ${themeConfig.animation.normal};
    --animation-slow: ${themeConfig.animation.slow};
    
    --z-dropdown: ${themeConfig.zIndex.dropdown};
    --z-sticky: ${themeConfig.zIndex.sticky};
    --z-fixed: ${themeConfig.zIndex.fixed};
    --z-modal: ${themeConfig.zIndex.modal};
    --z-tooltip: ${themeConfig.zIndex.tooltip};
  }
`;
