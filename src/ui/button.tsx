import { Button, ButtonProps } from "@mantine/core";
import { ReactNode } from "react";

interface IMyButton extends ButtonProps {
  children: ReactNode;
  ariaLabel?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

const MyButton = ({
  children,
  size = "sm",
  variant = "filled",
  radius = "sm",
  fullWidth = true,
  ariaLabel,
  ...props
}: IMyButton) => {
  return (
    <Button
      size={size}
      variant={variant}
      radius={radius}
      fullWidth={fullWidth}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MyButton;
