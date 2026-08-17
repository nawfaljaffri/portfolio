import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Nawfal Jaffri | Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-white text-black scroll-smooth">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <CursorProvider>
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
