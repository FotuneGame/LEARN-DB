import React from "react";

interface ScreenProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

function Screen({ children, ...props }: ScreenProps) {
  return <section {...props} className={"min-h-[200px] "+props.className}>{children}</section>;
}

export default Screen;