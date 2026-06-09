import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1>navbar</h1>
      <main>{children}</main>
      <h1>footer</h1>
    </>
  );
};

export default layout;
