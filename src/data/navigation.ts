import { siteConfig } from '../config/site';

export interface NavLink {
  href: string;
  label: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

// Main navigation
export const mainNavLinks: NavLink[] = siteConfig.navigation.main;

// Footer navigation
export const footerNav = {
  shop: siteConfig.navigation.footer.shop,
  company: siteConfig.navigation.footer.company,
  support: siteConfig.navigation.footer.support,
  legal: siteConfig.navigation.footer.legal,
};

// Mobile navigation (same as main but can be customized)
export const mobileNavLinks: NavLink[] = mainNavLinks;

// Desktop navigation with dropdown support
export const desktopNavGroups: NavGroup[] = [
  {
    label: "Shop",
    links: [
      { href: "/shop", label: "All Products" },
      { href: "/shop?category=women", label: "Women" },
      { href: "/shop?category=men", label: "Men" },
      { href: "/shop?category=accessories", label: "Accessories" },
      { href: "/shop?filter=new", label: "New Arrivals", isNew: true },
    ],
  },
];

// Breadcrumb helper
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function getBreadcrumbs(path: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
  
  const segments = path.split("/").filter(Boolean);
  
  if (segments.length === 0) return breadcrumbs;
  
  // Handle specific routes
  if (segments[0] === "products" && segments[1]) {
    breadcrumbs.push({ label: "Shop", href: "/shop" });
    breadcrumbs.push({ label: "Product" }); // Product name would be added dynamically
  } else if (segments[0] === "shop") {
    breadcrumbs.push({ label: "Shop" });
  } else if (segments[0] === "collections" && segments[1]) {
    breadcrumbs.push({ label: "Collections", href: "/collections" });
    breadcrumbs.push({ label: "Collection" }); // Collection name would be added dynamically
  } else {
    // Generic handling
    let currentPath = "";
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      breadcrumbs.push({ label, href: currentPath });
    }
  }
  
  return breadcrumbs;
}
