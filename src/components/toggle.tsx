import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type ToggleButtonOption<T> = {
  value: T;
  label: string | React.ReactNode;
};

type Props<T> = {
  options: ToggleButtonOption<T>[];
  value: T;
  onChange: (event: React.MouseEvent<HTMLElement>, newValue: T | null) => void;
};

const FBToggleButtonGroup = <T extends string | number>({
  options,
  value,
  onChange,
}: Props<T>) => {
  return (
    <ToggleButtonGroup
      fullWidth
      color="primary"
      value={value}
      exclusive
      onChange={onChange}
      aria-label="order type"
      sx={{
        marginBottom: 2,
      }}
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default FBToggleButtonGroup;

