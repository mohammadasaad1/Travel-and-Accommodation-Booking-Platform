import { TextField } from "@mui/material";
import React, { useState } from "react";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const CustomInput: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      type="number"
      value={value}
      fullWidth
      inputProps={{ min: label === "Rooms" ? 1 : label === "Adults" ? 2 : 0 }}
      onChange={(e) => onChange(Number(e.target.value))}
      sx={{
        // Border color for outlined input
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "gray" },
          "&:hover fieldset": { borderColor: "primary.main" }, // pink on hover
          "&.Mui-focused fieldset": { borderColor: "#333" },
        },
        // Input text color
        "& .MuiInputBase-input": {
          color: "#333",
        },
        // Label color
        "& .MuiInputLabel-root": {
          color: "#333",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#333",
        },
      }}
    />
  );
};

export default CustomInput;
