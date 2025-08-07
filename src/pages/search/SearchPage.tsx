import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchHome } from "../../api/home";
import { useLocation, useNavigate } from "react-router-dom";
import HotelCard from "../../ui/HotelCard";
import SideBarFilters from "./SideBarFilters";
import type { SearchHotel } from "../../types";
import { useEffect, useState } from "react";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResultsPage() {
  const query = useQueryParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    destination: query.get("destination") || "",
    checkInDate: query.get("checkInDate") || "",
    checkOutDate: query.get("checkOutDate") || "",
    adults: Number(query.get("adults") || 2),
    children: Number(query.get("children") || 0),
    rooms: Number(query.get("rooms") || 1),
  });
  useEffect(() => {
    setFilters({
      destination: query.get("destination") || "",
      checkInDate: query.get("checkInDate") || "",
      checkOutDate: query.get("checkOutDate") || "",
      adults: Number(query.get("adults") || 2),
      children: Number(query.get("children") || 0),
      rooms: Number(query.get("rooms") || 1),
    });
  }, [window.location.search]);
  const handleFilterChange = (updated: Partial<typeof filters>) => {
    const newFilters = { ...filters, ...updated };
    const params = new URLSearchParams({
      ...Object.fromEntries(
        Object.entries(newFilters).map(([k, v]) => [
          k,
          Array.isArray(v) ? v.join(",") : v.toString(),
        ])
      ),
    }).toString();
    navigate(`/search?${params}`);
    setFilters(newFilters);
  };
  const {
    data: hotels,
    isLoading,
    error,
  } = useQuery<SearchHotel[]>({
    queryKey: ["searchResults", filters],
    queryFn: () => searchHome(filters),
  });

  return (
    <Box
      sx={{
        px: { xs: 1, md: 4 },
        py: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        mb={3}
        fontSize={{ xs: 18, sm: 20, md: 22 }}
      >
        Search Results ({hotels?.length || 0} hotels found)
      </Typography>
      <Grid container spacing={2}>
        <Box
          width={{ xs: "100%", md: "25%" }}
          sx={{
            "@media (max-width:1255px)": {
              width: "100%",
            },
          }}
        >
          <SideBarFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Box>
        <Grid
          flexWrap={"wrap"}
          justifyContent={"center"}
          flexDirection={{ xs: "row", md: "column" }}
          gap={2}
          flexGrow={1}
        >
          {isLoading && <Typography>Loading...</Typography>}
          {error && (
            <Typography color="error">Failed to load hotels.</Typography>
          )}

          {(hotels ?? []).map((hotel) => (
            <HotelCard hotel={hotel} key={hotel.hotelId} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
