import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/theme-context";

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
    default: "Conan Malanaphy - Senior Front-end Developer | React & Next.js Expert | London",
    template: "%s | Conan Malanaphy - Front-end Developer"
  },
  description: "Conan Malanaphy (Malanaphy) is a Senior Front-end Developer with 8+ years experience building award-winning software. Expert in React, Next.js, TypeScript, and modern web development. Based in London, UK. Portfolio showcasing React, Next.js, and JavaScript expertise.",
  keywords: [
    // Name variations for maximum search coverage
    "Conan Malanaphy",
    "Malanaphy",
    "Conan",
    "Malanaphy Conan",
    "Conan Malanaphy developer",
    "Conan Malanaphy portfolio",
    "Conan Malanaphy London",
    "Conan Malanaphy React",
    "Conan Malanaphy Next.js",
    
    // Professional titles and skills
    "Front-end Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Web Developer London",
    "Senior Front-end Developer",
    "React Expert",
    "Next.js Expert",
    "Full Stack Developer",
    "UI Developer",
    "Frontend Engineer",
    "Web Developer UK",
    "London Web Developer",
    
    // Technical skills
    "Modern Web Development",
    "Responsive Web Design",
    "User Experience",
    "Web Accessibility",
    "Front-end Architecture",
    "Component Development",
    "State Management",
    "API Integration",
    "Performance Optimization",
    "SEO Optimization",
    "Framer Motion",
    "Tailwind CSS",
    "Redux",
    "Node.js",
    "GraphQL",
    "REST API",
    
    // Industry terms
    "Software Engineer",
    "Web Application Developer",
    "React Specialist",
    "Next.js Specialist",
    "JavaScript Expert",
    "Frontend Specialist",
    "UI/UX Developer",
    "Mobile Web Developer",
    "Progressive Web App Developer"
  ],
  authors: [{ name: "Conan Malanaphy" }],
  creator: "Conan Malanaphy",
  publisher: "Conan Malanaphy",
  applicationName: "Conan Malanaphy Portfolio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://malanaphy.co.uk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://malanaphy.co.uk',
    title: 'Conan Malanaphy - Senior Front-end Developer | React & Next.js Expert',
    description: 'Senior Front-end Developer with 8+ years experience building award-winning software. Expert in React, Next.js, TypeScript, and modern web development.',
    siteName: 'Conan Malanaphy Portfolio',
    images: [
      {
        url: 'https://malanaphy.co.uk/icon.png',
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
    images: ['https://malanaphy.co.uk/icon.png'],
    creator: '@conanmalanaphy',
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
    'name': 'Conan Malanaphy',
    'alternateName': 'Malanaphy',
    'givenName': 'Conan',
    'familyName': 'Malanaphy',
    'jobTitle': 'Senior Front-end Developer',
    'worksFor': 'Talent Funnel',
    'alumniOf': 'Loughborough University',
    'knowsAbout': 'React, Next.js, TypeScript, JavaScript, Front-end Development',
    'sameAs': 'https://github.com/conanmalanaphy/, https://www.linkedin.com/in/conan-malanaphy-946260a7/',
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
        
        {/* Additional SEO meta tags for name-based searches */}
        <meta name="author" content="Conan Malanaphy" />
        <meta name="owner" content="Conan Malanaphy" />
        <meta name="copyright" content="Conan Malanaphy" />
        <meta name="language" content="en-GB" />
        <meta name="geo.region" content="GB-LND" />
        <meta name="geo.placename" content="London" />
        <meta name="geo.position" content="51.5074;-0.1278" />
        <meta name="ICBM" content="51.5074, -0.1278" />
        
        {/* Name variations for search engines */}
        <meta name="alternate-name" content="Malanaphy" />
        <meta name="given-name" content="Conan" />
        <meta name="family-name" content="Malanaphy" />
        
        {/* Professional identifiers */}
        <meta name="job-title" content="Senior Front-end Developer" />
        <meta name="profession" content="Software Engineer" />
        <meta name="industry" content="Technology" />
        
        {/* Social media and professional links */}
        <link rel="me" href="https://github.com/conanmalanaphy/" />
        <link rel="me" href="https://www.linkedin.com/in/conan-malanaphy-946260a7/" />
        
        {/* Additional structured data hints */}
        <meta name="person-name" content="Conan Malanaphy" />
        <meta name="person-alternate-name" content="Malanaphy" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-slate-900 transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
