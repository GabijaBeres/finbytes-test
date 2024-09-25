import { TextField } from "@mui/material";
import React from "react";

type Props = {
  label?: string;
  value: string | number | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<typeof TextField>;

const FBInput = ({ label, value, onChange, ...props }: Props) => {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      variant="outlined"
      onChange={onChange}
      {...props}
      sx={{
        marginBottom: 2,
      }}
    />
  );
};

export default FBInput;

