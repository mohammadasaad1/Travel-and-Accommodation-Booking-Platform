import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Button,
  Alert,
  Stack,
  Menu,
  ListItemButton,
  ListItemText,
  List,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../api/client"; // your axios instance

interface BookingPayload {
  customerName: string;
  hotelName: string;
  roomNumber: string;
  roomType: string;
  bookingDateTime: string;
  totalCost: number;
  paymentMethod: string;
}

const PAYMENT_METHODS = [
  { value: "Credit Card", label: "Credit Card" },
  { value: "PayPal", label: "PayPal" },
  { value: "Cash", label: "Cash on Arrival" },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state as Partial<BookingPayload>;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [form, setForm] = useState<BookingPayload>({
    customerName: booking?.customerName || "",
    hotelName: booking?.hotelName || "",
    roomNumber: booking?.roomNumber || "",
    roomType: booking?.roomType || "",
    bookingDateTime: booking?.bookingDateTime || new Date().toISOString(),
    totalCost: booking?.roomPrice || 0,
    paymentMethod: booking?.paymentMethod || "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await api.post("/api/bookings", form);
      setSuccess("Booking successful!");
      setTimeout(() => {
        navigate("/home"); // Go home or to confirmation page
      }, 1500);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Booking failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f8fb"
    >
      <Paper sx={{ p: 4, width: "100%", maxWidth: 430, boxShadow: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Confirm & Pay
        </Typography>

        <Stack spacing={1} mb={2}>
          <Typography>
            <strong>Hotel:</strong> {form.hotelName}
          </Typography>
          <Typography>
            <strong>Room:</strong> {form.roomType} #{form.roomNumber}
          </Typography>
          <Typography>
            <strong>Customer:</strong> {form.customerName}
          </Typography>
          <Typography>
            <strong>Total:</strong> ${form.totalCost}
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "primary.main" },
                "&.Mui-focused fieldset": { borderColor: "primary.main" },
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
              borderRadius: 5,
            }}
          />
          <List
            component="nav"
            aria-label="Device settings"
            sx={{ bgcolor: "background.paper" }}
          >
            <ListItemButton
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label="when device is locked"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
              sx={{ border: "1px solid #009688", borderRadius: 5 }}
            >
              <ListItemText primary={PAYMENT_METHODS[selectedIndex].value} />
            </ListItemButton>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "lock-button",
                role: "listbox",
              },
            }}
          >
            {PAYMENT_METHODS.map((option, idx) => (
              <MenuItem
                key={idx}
                selected={idx === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, idx)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={submitting}
            sx={{ py: 1.4, borderRadius: 2, fontWeight: 600 }}
          >
            {submitting ? "Processing..." : "Pay Now"}
          </Button>
        </form>

        {success && (
          <Alert sx={{ mt: 2 }} severity="success">
            {success}
          </Alert>
        )}
        {error && (
          <Alert sx={{ mt: 2 }} severity="error">
            {error}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
