import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedDeals } from "../../api/home";
import CustomCard from "../../ui/CustomCard";
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
export default function FeaturedDealsSection() {
  const {
    data: deals,
    isLoading,
    error,
  } = useQuery<FeaturedDeal[]>({
    queryKey: ["featuredDeals"],
    queryFn: fetchFeaturedDeals,
  });

  if (isLoading) {
    return (
      <Typography align="center" mt={4}>
        Loading...
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error.message}
      </Typography>
    );
  }

  return (
    <Box component="section" mt={8} p={2}>
      <Box display="flex" mb={5} flexWrap="wrap" gap={2}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Featured Deals
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: { xs: "center", sm: "center", xl: "space-between" },
          alignItems: "center",
        }}
      >
        {(deals ?? []).map((deal) => (
          <CustomCard deal={deal} />
        ))}
      </Grid>
    </Box>
  );
}
