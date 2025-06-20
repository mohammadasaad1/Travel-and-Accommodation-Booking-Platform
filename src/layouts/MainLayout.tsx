import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default MainLayout;
