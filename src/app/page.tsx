import Link from "next/link";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home page",
  description: "This is my project NextJS v13",
};
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between py-24">
      <div className="py-10 text-center font-mono text-sm">
        <h1>NextJS V13</h1>
        <p className="py-4 text-lg">
          Hiện tại chúng tôi chưa cập nhật giao diện bạn vào đây xem đỡ nhé^^
          <br />
          <Link href={"/blogs"}>Blogs!</Link>
        </p>
      </div>
    </main>
  );
}
