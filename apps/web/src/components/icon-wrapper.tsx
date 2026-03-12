import { IconContext } from "react-icons";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";

const iconStyles = cva([""], {
  variants: {
    size: {
      xs: ["1.0em"],
      sm: ["1.5em"],
      md: ["2.0em"],
      lg: ["3.0em"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface IconWrapperProps {
  icon: ReactNode;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export default function IconWrapper({
  icon,
  color,
  size,
  className,
}: IconWrapperProps) {
  return (
    <IconContext.Provider
      value={{
        size: iconStyles({ size }),
        color: color,
      }}
    >
      <div className={className}>{icon}</div>
    </IconContext.Provider>
  );
}
