import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AskStella - I'll help you ask the right questions",
  description: "A guide service helping people find their right AI agent. Curated recommendations for ordinary people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}