import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kandyroar7.aiesec.lk"),
  title: "Kandy Roar 7.0 | The Kandyan Kingdom • AIESEC in Kandy LDS",
  description:
    "A Royal Proclamation to all villagers of the Kingdom of Kandy! Join us as we celebrate 10 glorious years of AIESEC in Kandy at Kandy Roar 7.0. Registrations open soon.",
  keywords: [
    "Kandy Roar 7.0",
    "AIESEC in Kandy",
    "LDS",
    "Leadership Development Seminar",
    "Kandyan Kingdom",
    "AIESEC Sri Lanka",
    "Registrations",
  ],
  authors: [{ name: "AIESEC in Kandy" }],
  openGraph: {
    title: "Kandy Roar 7.0 | A Royal Proclamation • Registrations Open Soon",
    description:
      "Answer the royal call, fulfil your royal duty, and become part of this grand gathering celebrating 10 glorious years of AIESEC in Kandy.",
    images: ["/images/kandy-roar-poster.jpg"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#110609] text-[#f6eedb] font-sans antialiased selection:bg-[#d4af37] selection:text-[#110609]">
        {children}
      </body>
    </html>
  );
}
