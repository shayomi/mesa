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
      <html lang="en">
        <body>
          <div className="">
            <HomeNav />
          </div>
          <main> {children}</main>
          <div className="">
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
