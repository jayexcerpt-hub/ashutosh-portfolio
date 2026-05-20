import type { Metadata } from "next";
import "./globals.css";
import { AdminProvider } from "../components/AdminContext";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Ashutosh Dey | Wildlife Researcher & Conservation Biologist",
  description:
    "Portfolio of Ashutosh Dey — Project Biologist, Firefly Ecology researcher, and Conservation Biologist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ background: "#081c15", color: "#fefae0", overflowX: "hidden" }}
      >
        <AdminProvider>
          {/* <CustomCursor /> */}
          <Navbar />
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}
