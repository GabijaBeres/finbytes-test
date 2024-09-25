import React from "react";
import { Button, ButtonProps } from "@mui/material";

const FBButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="outlined" color="primary" sx={{ marginTop: 3 }} {...props}>
      {children}
    </Button>
  );
};

export default FBButton;

