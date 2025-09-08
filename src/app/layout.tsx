import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Conan Malanaphy - Senior Front-end Developer | React & Next.js Expert",
    template: "%s | Conan Malanaphy - Front-end Developer"
  },
  description: "Conan Malanaphy is a Senior Front-end Developer with 8+ years experience building award-winning software. Expert in React, Next.js, TypeScript, and modern web development. Based in London, UK.",
  keywords: [
    "Conan Malanaphy",
    "Front-end Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Web Developer London",
    "Senior Front-end Developer",
    "React Expert",
    "Next.js Expert",
    "Modern Web Development",
    "Responsive Web Design",
    "User Experience",
    "Web Accessibility",
    "Front-end Architecture",
    "Component Development",
    "State Management",
    "API Integration",
    "Performance Optimization",
    "SEO Optimization"
  ],
  authors: [{ name: "Conan Malanaphy" }],
  creator: "Conan Malanaphy",
  publisher: "Conan Malanaphy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://conanmalanaphy.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://conanmalanaphy.dev',
    title: 'Conan Malanaphy - Senior Front-end Developer | React & Next.js Expert',
    description: 'Senior Front-end Developer with 8+ years experience building award-winning software. Expert in React, Next.js, TypeScript, and modern web development.',
    siteName: 'Conan Malanaphy Portfolio',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Conan Malanaphy - Senior Front-end Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conan Malanaphy - Senior Front-end Developer | React & Next.js Expert',
    description: 'Senior Front-end Developer with 8+ years experience building award-winning software. Expert in React, Next.js, TypeScript.',
    images: ['/icon.png'],
    creator: '@conanmalanaphy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual Google Search Console verification code
  },
  category: 'technology',
  classification: 'Portfolio Website',
  other: {
    'geo.region': 'GB-LND',
    'geo.placename': 'London',
    'geo.position': '51.5074;-0.1278',
    'ICBM': '51.5074, -0.1278',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
