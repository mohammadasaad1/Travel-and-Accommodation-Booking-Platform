import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  fetchHotelInfo,
  fetchHotelReviews,
  fetchHotelRooms,
} from "../../api/hotel";
import Reviews from "./Reviews";

export default function HotelPage() {
  const navigate = useNavigate();
  const { hotelId } = useParams<{ hotelId?: string }>();
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    () => new Date(Date.now() + 86400000)
  ); // بكرا :  )

  const formatDate = (date: Date | null) =>
    date ? date.toISOString().split("T")[0] : "";

  const {
    data: hotel,
    isLoading: loadingHotel,
    error: errorHotel,
  } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => fetchHotelInfo(hotelId),
  });

  const {
    data: rooms,
    isLoading: loadingRooms,
    error: errorRooms,
    refetch: refetchRooms,
    isFetching: isFetchingRooms,
  } = useQuery({
    queryKey: [
      "hotelRooms",
      hotelId,
      formatDate(checkInDate),
      formatDate(checkOutDate),
    ],
    queryFn: () =>
      fetchHotelRooms(
        hotelId,
        formatDate(checkInDate),
        formatDate(checkOutDate)
      ),
    enabled: !!hotelId && !!checkInDate && !!checkOutDate,
  });

  const { data: reviews, isLoading: loadingReviews } = useQuery({
    queryKey: ["hotelReviews", hotelId],
    queryFn: () => fetchHotelReviews(hotelId),
  });

  if (loadingHotel || loadingReviews)
    return <Skeleton variant="rectangular" height={"100vh"} />;
  if (errorHotel || !hotel)
    return <Typography color="error">Hotel not found.</Typography>;

  return (
    <Box sx={{ p: { xs: 1, md: 4 } }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      {/* hotel.imageUrl not found so replace it, : ) */}
      <Box
        sx={{
          width: "100%",
          mb: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={
            "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
          }
          alt={"hotel image"}
          style={{
            width: "80%",
            height: "520px",
            objectFit: "cover",
            borderRadius: 3,
          }}
        />
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="flex-start"
      >
        <Box flex={2}>
          <Typography variant="h4" fontWeight={700} mb={0.5}>
            {hotel.hotelName}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            {Array.from({ length: hotel.starRating }).map((_, i) => (
              <StarIcon key={i} sx={{ color: "#ffd600", fontSize: 20 }} />
            ))}
            <span style={{ marginLeft: 8 }}>
              {hotel.starRating} star{hotel.starRating > 1 && "s"}
            </span>
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {hotel.description || "No description."}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <LocationOnIcon color="primary" />
            <Typography variant="body2">{hotel.location}</Typography>
          </Stack>

          <Box
            sx={{
              width: "100%",
              height: 260,
              borderRadius: 2,
              overflow: "hidden",
              mb: 3,
            }}
          >
            <MapContainer
              center={[hotel.latitude, hotel.longitude]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[hotel.latitude, hotel.longitude]}>
                <Popup>
                  {hotel.hotelName}
                  <br />
                  {hotel.cityName}
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
          <Reviews reviews={reviews} />
        </Box>
      </Stack>

      <Typography variant="h5" fontWeight={600} sx={{ mt: 5, mb: 2 }}>
        Available Rooms
      </Typography>
      {loadingRooms || isFetchingRooms ? (
        <Grid container spacing={2}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Skeleton variant="rectangular" height={160} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {(rooms ?? []).length === 0 ? (
            <Typography color="text.secondary">
              No rooms available for these dates.
            </Typography>
          ) : (
            <Box
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              gap={3}
            >
              {rooms.map((room: any) => (
                <Box key={room.roomId}>
                  <Card elevation={3} sx={{ display: "flex", borderRadius: 3 }}>
                    <CardMedia
                      component="img"
                      image={room.roomPhotoUrl}
                      alt={room.roomType}
                      sx={{
                        width: 240,
                        height: "inhirit",
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                    {console.log(room)}
                    <CardContent
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        {room.roomType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {room.capacityOfAdults} adults,{" "}
                        {room.capacityOfChildren} children
                      </Typography>
                      <Stack
                        direction="row"
                        sx={{ flexWrap: "wrap", gap: 1 }}
                        alignItems="center"
                        mt={2}
                      >
                        {room.roomAmenities.map((amenity: any, idx: number) => (
                          <Chip key={idx} label={amenity.name} size="small" />
                        ))}
                      </Stack>
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        color="primary"
                        mt={2}
                      >
                        ${room.price} / night
                      </Typography>
                      <Box display={"flex"} justifyContent={"end"}>
                        <Button
                          variant="contained"
                          sx={{ borderRadius: 2, width: "100%", mt: 1 }}
                          disabled={!room.availability}
                          onClick={() =>
                            navigate("/payment", {
                              state: {
                                roomId: room.roomId,
                                hotelName: hotel.hotelName,
                                hotelId,
                                checkInDate,
                                checkOutDate,
                                roomPrice: room.price,
                                roomNumber: room.roomNumber,
                              },
                            })
                          }
                        >
                          {room.availability ? "Book it" : "Not available"}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </Grid>
      )}
    </Box>
  );
}
