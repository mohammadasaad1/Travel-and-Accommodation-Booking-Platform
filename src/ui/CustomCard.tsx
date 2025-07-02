import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";
import PlaceIcon from "@mui/icons-material/Place";
import { Link as RouterLink } from "react-router-dom";

export interface FeaturedDeal {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

type Props = {
  deal: FeaturedDeal;
};

const CustomCard: React.FC<Props> = ({ deal }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={deal.hotelId}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          maxWidth: 670,
          transition: "box-shadow 0.2s, transform 0.2s",
          "&:hover": {
            boxShadow: 8,
            transform: "translateY(-4px) scale(1.01)",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={deal.roomPhotoUrl}
            alt={deal.hotelName}
            sx={{
              height: 210,
              objectFit: "cover",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.04)" },
            }}
          />
          <Chip
            label={`${deal.discount}% OFF`}
            color="error"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            mb={1}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              color="text.primary"
              noWrap
            >
              {deal.hotelName}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <StarIcon sx={{ color: "#ffd600", fontSize: 18 }} />
              <Typography variant="body2" color="text.secondary">
                {deal.hotelStarRating}
              </Typography>
            </Stack>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            color="text.secondary"
            mb={1}
            spacing={1}
          >
            <PlaceIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{deal.cityName}</Typography>
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={2}
            sx={{ minHeight: 48 }}
          >
            {deal.description}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="baseline" gap={1}>
              <Typography variant="h6" color="primary.main" fontWeight={700}>
                ${deal.finalPrice}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "text.disabled",
                }}
              >
                ${deal.originalRoomPrice}
              </Typography>
            </Box>
            <Button
              component={RouterLink}
              to={`/hotels/${deal.hotelId}`}
              variant="contained"
              size="small"
              sx={{
                borderRadius: 2,
                bgcolor: "primary.main",
                fontWeight: 600,
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              View Deal
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CustomCard;
