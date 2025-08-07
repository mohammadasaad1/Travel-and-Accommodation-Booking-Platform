import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchTrendingDestinations } from "../../api/home";
import { Box, Grid, Typography } from "@mui/material";
import TrendingDestinationCard from "../../ui/TrendingDestinationCard";

const TrendingDestinations: React.FC = () => {
  const {
    data: trendingDestinations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trendingDestinations"],
    queryFn: fetchTrendingDestinations,
  });

  if (isLoading) return <div>loading...trend</div>;
  if (error) return <div>error occur...trend</div>;

  return (
    <Box mt={6} p={4}>
      <Typography variant="h4" fontWeight={700} color="text.primary" mb={8}>
        Trending Destination
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: { xs: "center", xl: "space-evenly" } }}
      >
        {(trendingDestinations ?? []).map((dest) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={dest.cityId}>
            <TrendingDestinationCard destination={dest} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingDestinations;
