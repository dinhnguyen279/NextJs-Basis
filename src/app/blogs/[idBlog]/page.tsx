"use client";
import Link from "next/link";
import React from "react";
import useSWR, { Fetcher } from "swr";

const ViewDetail = ({ params }: { params: { idBlog: string } }) => {
  const fetcher: Fetcher<IBlogs, string> = (url: string) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.idBlog}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-24">
      <div className="w-1/6">
        <Link href={"/blogs"} className="btn btn-warning">
          Go Back
        </Link>
      </div>
      <div className="py-4">
        <ul className="w-full py-4 px-6 rounded-xl bg-slate-500">
          <li className="flex justify-between bg-white px-6 py-4 items-center rounded-xl">
            <p className="m-0">
              Title: <b>{data?.title}</b>
            </p>
            <p className="m-0">
              Author: <b>{data?.author}</b>
            </p>
          </li>
          <li className="text-center mt-3 bg-white px-6 py-4 rounded-xl">
            {data?.content}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ViewDetail;
