// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin
// SubhanAllah, Elhamdulillah, La ilahe illAllah, Allahu Ekber
// Estaxfurullah El Azim
// Allahu Ekber ve Lillahil Hamd
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "./api/uploadthing/core";
// @ts-ignore: side-effect import for global CSS
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
// Elhamdulillah Elhamdulillah Elhamdulillah
// El Hamdu Lillahi Rabbil Alemin


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
export const metadata: Metadata = {
  title: {
    template: "%s | Red Yapım ",
    default: " Red Yapım",
  },
  description: "Red Yapım · Productive Agency · İşler · Hizmetler · Kültür ",
  keywords: ["Red Yapım · Productive Agency · Strateji · Tasarım · Prodüksiyon · Medya"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}

          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}





// Elhamdulillah Elhamdulillah Elhamdulillah
// El Hamdu Lillahi Rabbil Alemin






function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-16 bg-gray-800 text-white">
      <p className="text-sm">© {new Date().getFullYear()} Red Yapım</p>
    </footer>
  );

}
// Elhamdulillah Elhamdulillah Elhamdulillah
// El Hamdu Lillahi Rabbil Alemin
// La îlahe îll Allah û vahdehû(Esma ul Husna) la şerîke leh, lehul-mülkü ve lehul-hamdü ,
// Yuhyî ve yumît
// Bîyadîhîl xayr
// ve hüve alâ külli şeyin kadîr.

 // Seyyidina Muhammeden abduhu ve resuluhu (s.a.v) ve habibihi

// ALLAH U EKBER VELİLLAHIL HAMD