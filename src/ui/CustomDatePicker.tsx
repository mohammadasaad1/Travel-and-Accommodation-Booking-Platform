import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";

interface CustomDatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label = "Select date",
  value,
  onChange,
  minDate,
  maxDate,
  required,
}) => (
  <DesktopDatePicker
    label={label}
    value={value}
    onChange={onChange}
    minDate={minDate}
    maxDate={maxDate}
    slotProps={{
      textField: {
        fullWidth: true,
        required,
        sx: {
          "& .MuiInputBase-input": {
            color: "#222",
          },
          "& .MuiInputLabel-root": {
            color: "#999",
          },
        },
      },
    }}
  />
);

export default CustomDatePicker;
