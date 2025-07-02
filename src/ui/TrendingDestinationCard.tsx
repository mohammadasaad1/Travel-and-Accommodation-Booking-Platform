import React from "react";
import {
  Card,
  CardMedia,
  Box,
  Typography,
  CardActionArea,
} from "@mui/material";
export interface TrendingDestination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}

type Props = {
  destination: TrendingDestination;
};

const TrendingDestinationCard: React.FC<Props> = ({ destination }) => (
  <Card
    elevation={4}
    sx={{
      borderRadius: 3,
      boxShadow: 3,
      overflow: "hidden",
      width: 390,
      height: 240,
      position: "relative",
      bgcolor: "transparent",
      mx: "auto",
      transition: "box-shadow 0.2s, transform 0.2s",
      "&:hover": {
        boxShadow: 8,
        transform: "translateY(-2px) scale(1.03)",
      },
    }}
  >
    <CardActionArea sx={{ height: "100%" }}>
      <CardMedia
        component="img"
        src={destination.thumbnailUrl}
        alt={destination.cityName}
        sx={{
          height: 240,
          filter: "brightness(0.66)",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          p: 2,
          color: "#fff",
          width: "100%",
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.00) 100%)",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {destination.cityName}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.85 }}>
          {destination.countryName}
        </Typography>
      </Box>
    </CardActionArea>
  </Card>
);

export default TrendingDestinationCard;
