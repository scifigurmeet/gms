import React from "react";

function TopMarginContainer({ children }: { children: React.ReactNode }) {
  return <div className="mt-20">{children}</div>;
}

export default TopMarginContainer;
