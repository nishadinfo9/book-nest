import Navbar from "@/components/global-components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
      <h1>footer</h1>
    </>
  );
};

export default layout;
