import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs Lists",
  description: "Blogs my Daniel",
};

const BlogsLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default BlogsLayout;
