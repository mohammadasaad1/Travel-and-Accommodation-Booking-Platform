import { api } from "./client"; // Your configured Axios instance

// The city object shape according to your API docs
export interface City {
  id: number;
  name: string;
  description: string;
  // Add more fields if your API returns them (e.g. hotels?)
}

// List cities with filters, pagination
export function fetchCities(params: {
  name?: string;
  searchQuery?: string;
  pageSize?: number;
  pageNumber?: number;
}) {
  return api.get<City[]>("/api/cities", { params }).then((res) => res.data);
}

// Create new city
export function createCity(data: { name: string; description: string }) {
  return api.post<City>("/api/cities", data).then((res) => res.data);
}

// Update a city (PUT = full update)
export function updateCity(
  cityId: number,
  data: { name: string; description: string }
) {
  return api.put(`/api/cities/${cityId}`, data).then((res) => res.data);
}

// Delete a city
export function deleteCity(cityId: number) {
  return api.delete(`/api/cities/${cityId}`);
}

// Get a single city's details
export function getCity(cityId: number, includeHotels: boolean = false) {
  return api
    .get<City>(`/api/cities/${cityId}`, { params: { includeHotels } })
    .then((res) => res.data);
}
