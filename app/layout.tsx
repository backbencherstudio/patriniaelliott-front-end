import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import { AppConfig } from "@/config/app.config";
import { TokenProvider } from "@/hooks/useToken";
import { LanguageProvider } from "@/provider/LanguageProvider";
import QueryProvider from "@/provider/QueryProvider";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Script from "next/script";
import "./globals.css";

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
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,zh-CN,es,fr,de,it,pt,ru,ja,ar,ko,hi,bn,tr,pl,nl,sv,no,da,fi,cs,sk,el,ro,hu,sr,he,id,th,vi,ms,tl,uk,fa,mr,ta,te,gu,pa,kn,ml,or,ur,sw',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>

        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <QueryProvider>
          <TokenProvider>
            <LanguageProvider>
            <CustomToastContainer />
            {children}
            </LanguageProvider>
          </TokenProvider>
        </QueryProvider>
      </body>
    </html>
  );
}