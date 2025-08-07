import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchRecentHotels } from "../../api/home";

const RecentHotels: React.FC<{ userId: number }> = ({
  userId,
}: {
  userId: number;
}) => {
  const {
    data: recentHotels,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentHotels", userId],
    queryFn: () => fetchRecentHotels(userId),
  });

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <div>{error.message}</div>;
  return <Box>{recentHotels}</Box>;
};

export default RecentHotels;
