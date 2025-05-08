import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { NavBar } from "@/components/Nav";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
// import PromoSection from "@/components/PromoSection";
// import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Veste Ousadia",
  description: "Marca moçambicana de vestuário",
  icons: {
    icon: [
      { url: "/favicon.png" },
      // { url: "/favicon32x32.png", sizes: "32x32", type: "image/png" },
      // { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
  },
};

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${ubuntu.className} antialiased`}>
        <Providers session={session}>
          {/* <PromoSection /> */}
          <NavBar />
          {/* <Breadcrumbs withHome> */}
          <Toaster position="top-center" />
          {children}
          {/* </Breadcrumbs> */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
