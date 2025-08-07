import { api } from "./client";
export type Hotel = {
  id: number;
  name: string;
  description: string;
  hotelType?: number;
  starRating?: number;
  latitude?: number;
  longitude?: number;
};
export function fetchHotels(params: {
  name?: string;
  pageSize?: number;
  pageNumber?: number;
}) {
  return api.get<Hotel[]>("/api/hotels", { params }).then((res) => res.data);
}
export function createHotel(data: Partial<Hotel>) {
  return api.post<Hotel>("/api/hotels", data).then((res) => res.data);
}
export function updateHotel(id: number, data: Partial<Hotel>) {
  return api.put(`/api/hotels/${id}`, data);
}
export function deleteHotel(id: number) {
  return api.delete(`/api/hotels/${id}`);
}
