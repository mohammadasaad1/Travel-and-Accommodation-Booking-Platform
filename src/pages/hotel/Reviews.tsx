import {
  Avatar,
  Divider,
  Paper,
  Rating,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

export interface GuestReviewsProps {
  reviews: {
    reviewId: number;
    customerName: string;
    rating: number;
    description: string;
  }[];
}

const Reviews: React.FC<GuestReviewsProps> = ({ reviews }) => {
  console.log(reviews);
  function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 20) - hash);
    }
    const color = `hsl(${hash % 360}, 65%, 70%)`;
    return color;
  }
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Guest Reviews
      </Typography>
      {(!reviews || reviews.length === 0) && (
        <Typography color="text.secondary">No reviews yet.</Typography>
      )}
      {reviews.map((rev) => (
        <Paper key={rev.reviewId} sx={{ p: 2, mb: 2, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={1}>
            <Avatar
              sx={{
                bgcolor: stringToColor(rev.customerName || ""),

                width: 48,
                height: 48,
                fontSize: 24,
              }}
            >
              {rev.customerName.charAt(0)}
            </Avatar>
            <Box>
              <Typography fontWeight={600}>{rev.customerName}</Typography>
            </Box>
            <Box flexGrow={1} />
            <Rating value={rev.rating} readOnly size="medium" />
          </Stack>
          <Divider sx={{ mb: 1 }} />
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {rev.description}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Reviews;
