import type { Metadata } from "next";
import "./globals.css";
import { type_display } from "@/functions/fonts";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para cachorros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={type_display.variable}>{children}</body>
    </html>
  );
}
