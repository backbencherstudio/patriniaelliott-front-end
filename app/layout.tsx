import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { AppConfig } from "@/config/app.config";
import { TokenProvider } from "@/hooks/useToken";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

// Font optimization with display=swap
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: AppConfig().app.slogan,
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TokenProvider>
          <CustomToastContainer />
          {children}
        </TokenProvider>
      </body>
    </html>
  );
}