import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compass-BlackBox IQ",
  description:
    "The governance layer for an autonomous agent's memory & competence — grounded on Microsoft's F.A.M. intelligence layer, owned by the human, in plain text.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
