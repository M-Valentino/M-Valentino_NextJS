import React, { ReactNode } from "react";
import { COLORS, SHADOWS } from "../../consts/stylingValues";

interface LinkInfoWrapperProps {
  children: ReactNode;
  rootDomain: string;
}

export const LinkInfoWrapper: React.FC<LinkInfoWrapperProps> = ({
  children,
  rootDomain,
}) => {
  return (
    <div style={{ height: 55 }}>
      <div
        style={{
          backgroundColor: COLORS.offWhiteColor,
          height: 22,
          width: 22,
          padding: 6,
          borderRadius: "50%",
          margin: "auto",
          boxShadow: SHADOWS.minute,
        }}
      >
        {children}
      </div>
      <div style={{ marginTop: 5 }}>{rootDomain}</div>
    </div>
  );
};
