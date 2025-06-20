import { Button, type ButtonProps } from "@mui/material";
import React, { type ReactNode } from "react";

interface GGButtonProps extends Omit<ButtonProps, "variant" | "fullWidth"> {
  htmlType?: "button" | "submit" | "reset";
  variant?: ButtonProps["variant"];
  children: React.ReactNode;
}
const GGButton: React.FC<GGButtonProps> = ({
  htmlType = "button",
  variant = "contained",
  children,
  sx,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      type={htmlType}
      variant={variant}
      sx={{
        backgroundColor: "#009688",
        mt: 4,
        borderRadius: 5,
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default GGButton;
