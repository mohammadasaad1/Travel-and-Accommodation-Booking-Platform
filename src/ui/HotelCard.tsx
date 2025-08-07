import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import type { SearchHotel } from "../types/index";
import { Link } from "react-router-dom";

interface Props {
  hotel: SearchHotel;
}

const HotelCard: React.FC<Props> = ({ hotel }) => {
  const maxAmenities = 4;
  const amenitiesToShow = hotel.amenities.slice(0, maxAmenities);
  const extraCount = hotel.amenities.length - maxAmenities;

  return (
    <Card
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        mb: 3,
        p: 1.8,
        borderRadius: 3,
        boxShadow: 2,
        minHeight: 200,
        transition: "box-shadow 0.2s, transform 0.2s",
        "&:hover": {
          boxShadow: 5,
        },
        "&:hover .MuiCardMedia-root": {
          transform: "scale(1.04)",
          transition: "transform 0.3s",
        },
      }}
    >
      <CardMedia
        component="img"
        image={hotel.roomPhotoUrl}
        alt={hotel.hotelName}
        sx={{
          width: { xs: "100%", md: 280 },
          height: 200,
          borderRadius: 3,
          mr: 2,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flex: 1, pl: 0, pr: 2, py: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" fontWeight={700}>
            {hotel.hotelName}
          </Typography>
          <Stack direction="row" spacing={0.2}>
            {[...Array(hotel.starRating)].map((_, i) => (
              <StarIcon key={i} sx={{ color: "#ffd600", fontSize: 18 }} />
            ))}
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <LocationOnIcon sx={{ fontSize: 17, color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary">
            {hotel.cityName}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} mb={1}>
          {amenitiesToShow.map((amenity) => (
            <Chip key={amenity.id} label={amenity.name} size="small" />
          ))}
          {extraCount > 0 && (
            <Chip label={`+${extraCount} more`} size="small" />
          )}
        </Stack>
      </CardContent>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={3}
        sx={{ minWidth: 150, p: 2 }}
      >
        <Box>
          {hotel.discount > 0 && (
            <Typography
              sx={{
                textAlign: "right",
                textDecoration: "line-through",
                color: "text.disabled",
                fontSize: "1rem",
              }}
            >
              ${hotel.roomPrice}
            </Typography>
          )}
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography
              variant="h5"
              fontWeight={600}
              color="primary.main"
              sx={{ textAlign: "right" }}
            >
              ${Math.round(hotel.roomPrice - hotel.roomPrice * hotel.discount)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              /night
            </Typography>
          </Stack>
        </Box>
        <Button
          variant="contained"
          component={Link}
          to={`/hotels/${hotel.hotelId}`}
          sx={{ borderRadius: 5 }}
        >
          View Details
        </Button>
      </Stack>
    </Card>
  );
};

export default HotelCard;
