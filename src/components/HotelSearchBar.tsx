import React, { useState } from "react";
import { TextField, InputAdornment, Paper, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import CustomDatePicker from "../ui/CustomDatePicker";
import GGButton from "../ui/GGButton";
import CustomInput from "../ui/CustomInput";
import { useNavigate } from "react-router-dom";

export default function HotelSearchBar() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      destination,
      checkInDate: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
      checkOutDate: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
      adults: adults.toString(),
      children: children.toString(),
      rooms: rooms.toString(),
    }).toString();
    navigate(`/search?${query}`);
  };

  return (
    <Paper
      elevation={24}
      sx={{
        width: { xs: "80%", md: "100%" },
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        mt: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <TextField
              label="Destination"
              placeholder="Search for hotels, cities"
              size="medium"
              fullWidth
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnIcon sx={{ color: "#999" }} />
                  </InputAdornment>
                ),
                sx: {
                  color: "#222",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#999",
                  "&.Mui-focused": {
                    color: "#999",
                  },
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#999" },
                },

                "& .MuiInputBase-input::placeholder": {
                  color: "#999",
                  opacity: 1,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            />

            <CustomDatePicker
              label="Check In"
              value={checkIn}
              onChange={setCheckIn}
              minDate={new Date()}
              required
            />
            <CustomDatePicker
              label="Check Out"
              value={checkOut}
              onChange={setCheckOut}
              minDate={new Date()}
              required
            />
            <CustomInput label="Rooms" value={rooms} onChange={setRooms} />
            <CustomInput label="Adults" value={adults} onChange={setAdults} />
            <CustomInput
              label="Children"
              value={children}
              onChange={setChildren}
            />
          </Box>
        </LocalizationProvider>
        <GGButton
          htmlType="submit"
          sx={{ width: "100%", fontSize: "1.1rem", letterSpacing: 1 }}
        >
          Search Hotels
        </GGButton>
      </form>
    </Paper>
  );
}
