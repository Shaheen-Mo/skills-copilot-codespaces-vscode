import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChaChaCha Ops",
  description: "Internal furniture retail operations system",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
