import { format } from "date-fns";
import { api } from "./client";

export function fetchHotelInfo(id: string | undefined) {
  return api.get(`/api/hotels/${id}`).then((res) => res.data);
}

export function fetchHotelRooms(
  id: string | undefined,
  checkIn: string,
  checkOut: string
) {
  const checkInDate = format(checkIn, "yyyy-MM-dd");
  const checkOutDate = format(checkOut, "yyyy-MM-dd");

  return api
    .get(`/api/hotels/${id}/rooms`, {
      params: {
        checkInDate,
        checkOutDate,
      },
    })
    .then((res) => res.data);
}

export function fetchHotelReviews(id: string | undefined) {
  return api.get(`/api/hotels/${id}/reviews`).then((res) => res.data);
}
