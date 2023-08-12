"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "@/components/app.header";
import Footer from "@/components/app.footer";
import Container from "react-bootstrap/Container";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ToastContainer />
        <Container style={{ minHeight: "calc(100vh - 50px)" }}>
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
