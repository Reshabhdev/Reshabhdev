import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rishabh Dev Singh | B.Tech CSE Student",
  description:
    "Minimal, engaging portfolio showcasing product-focused engineering, modern web apps, and Postgres-backed systems.",
  verification: {
    google: "24MuyQuAv16j5X8vFSHJUrFJG685rFiGU0cdSAX1q9A",
    other: {
      "msvalidate.01": "3E81E6D03D1681668C12B6DC4616A4CF",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        {children}
      </body>
    </html>
  );
}
