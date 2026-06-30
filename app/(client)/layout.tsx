import Footer from "@/components/global-components/Footer";
import Navbar from "@/components/global-components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
      <Footer/>
    </>
  );
};

export default layout;
