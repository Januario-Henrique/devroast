import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/lib/theme";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-secondary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "devroast - paste your code. get roasted.",
  description: "Drop your code below and we'll rate it — brutally honest or full roast mode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className={`${jetbrainsMono.variable} ${ibmPlexMono.variable} antialiased bg-bg-page min-h-screen`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
