"use client";
import React from "react";
import FormTable from "@/components/app.table";
import useSWR from "swr";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (!data) {
    return <div>No data...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-between py-24">
      <div className="py-10 text-center font-mono text-sm">
        <h1>NextJS V13</h1>
      </div>
      {!data ? (
        <div className="py-10 text-center font-mono text-base">No data...</div>
      ) : (
        <FormTable blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
      )}
    </main>
  );
}
