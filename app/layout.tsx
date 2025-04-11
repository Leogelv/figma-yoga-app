import type { Metadata } from "next";
import "./globals.css";
import { QuizProvider } from "../context/QuizContext";

export const metadata: Metadata = {
  title: "Figma Yoga",
  description: "Figma MCP integration with Next.js",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=SF+Pro+Text:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ maxWidth: '375px', margin: '0 auto' }}>
        <QuizProvider>
          {children}
        </QuizProvider>
      </body>
    </html>
  );
}
