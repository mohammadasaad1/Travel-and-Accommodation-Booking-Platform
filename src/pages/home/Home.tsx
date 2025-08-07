import React from "react";

import { Box, Typography } from "@mui/material";
import HotelSearchBar from "../../components/HotelSearchBar";
import FeaturedDealsSection from "./FeaturedDealsSection";
import TrendingDestinations from "./TrendingDestinations";

const Home: React.FC = () => {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          inset: 0, // this is shorthand for top:0, right:0, bottom:0, left:0
          width: "100%",
          height: { xs: "160vh", md: "85vh" },
          backgroundImage:
            "url(https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1600)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
          zIndex: 0,
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" }, // Responsive
              fontWeight: 700,
              mb: 2,
              mt: { xs: 20, s: 10, m: 0 },
            }}
          >
            Your Perfect Stay Awaits
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontSize: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
              fontWeight: 400,
              mb: 4,
            }}
          >
            Discover amazing hotels and accommodations around the world with
            unbeatable deals
          </Typography>
          <HotelSearchBar />
        </Box>
      </Box>
      <FeaturedDealsSection />
      {/* <RecentHotels userId={1} /> do not work... */}
      <TrendingDestinations />
    </Box>
  );
};

export default Home;
