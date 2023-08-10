"use client";
import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import FormTable from "@/components/app.table";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Container>
        <div className="z-10 max-w-5xl space-y-10 w-full items-center justify-between font-mono text-sm flex-col lg:flex">
          <ul className="flex gap-5 justify-between">
            <li className="text-gray-600 hover:text-gray-200  px-4 py-2 border border-gray-400 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 ease-linear">
              <Link className="no-underline text-gray-600" href="/facebook">
                Facebook
              </Link>
            </li>
            <li className="hover:text-gray-200 text-gray-600 px-4 py-2 border border-gray-400 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 ease-linear">
              <Link className="no-underline text-gray-600" href="/tiktok">
                Tiktok
              </Link>
            </li>
            <li className="hover:text-gray-200 text-gray-600 px-4 py-2 border border-gray-400 rounded-lg hover:bg-slate-800 cursor-pointer transition-all duration-300 ease-linear">
              <Link className="no-underline text-gray-600" href="/youtube">
                Youtube
              </Link>
            </li>
          </ul>
        </div>
        <FormTable />
      </Container>
    </main>
  );
}
