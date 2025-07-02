import { api } from "./client";
export function fetchFeaturedDeals() {
  return api.get("/api/home/featured-deals").then((res) => res.data);
}

export function fetchTrendingDestinations() {
  return api.get("/api/home/destinations/trending").then((res) => res.data);
}

export function fetchRecentHotels(userId: string) {
  return api
    .get(`/api/home/users/${userId}/recent-hotels`)
    .then((res) => res.data);
}

export function searchHome(params: Record<string, any>) {
  return api.get("/api/home/search", { params }).then((res) => res.data);
}
