import Footer from "@/components/common/Footer";
import HomeNav from "@/components/layout/home-nav/homeNav";
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <body>
        <div className="">
          <HomeNav />
        </div>
        <body> {children}</body>
        <div className="">
          <Footer />
        </div>
      </body>
    </ClerkProvider>
  );
}
