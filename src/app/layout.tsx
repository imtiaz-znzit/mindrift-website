import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AOSProvider } from "@/components/providers/aos-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ParticleField } from "@/components/ui/particle-field";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mindrift Agency — Enterprise Software, AI & Cloud Engineering",
    template: "%s | Mindrift Agency",
  },
  description: siteConfig.description,
  keywords: [
    "Enterprise Software Development",
    "AI Solutions",
    "Cloud Architecture",
    "Cybersecurity Engineering",
    "GIS Location Intelligence",
    "Custom Web Applications",
    "DevOps Automation",
    "PostgreSQL Optimization",
  ],
  authors: [{ name: "Mindrift Agency", url: siteConfig.url }],
  creator: "Mindrift Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: "Mindrift Agency — Enterprise Software, AI & Cloud Engineering",
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindrift Agency — Enterprise Software, AI & Cloud Engineering",
    description: siteConfig.description,
  },
  icons: {
    icon: "/assets/logos/Favlogo.jpg",
    shortcut: "/assets/logos/Favlogo.jpg",
    apple: "/assets/logos/Favlogo.jpg",
  },
};

const themeScript = `
  (function() {
    try {
      var storedTheme = localStorage.getItem('mindrift-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[#1877F2] selection:text-white relative w-full max-w-full overflow-x-clip"
      >
        <ThemeProvider>
          <AOSProvider>
            {/* Full-Site Living Dynamic Particle Field */}
            <ParticleField
              fixed={true}
              particleCount={85}
              interactive={true}
              className="opacity-40 dark:opacity-55 pointer-events-none z-[12]"
            />
            <Header />
            <main className="flex-1 relative z-10 w-full max-w-full overflow-x-clip">{children}</main>
            <Footer />

            {/* Smooth Scroll to Top with Circular Depth Ring */}
            <ScrollToTop />
          </AOSProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
