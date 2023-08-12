import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Deital Blog",
  description: "Detail blog",
};

const ViewDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ViewDetailLayout;
