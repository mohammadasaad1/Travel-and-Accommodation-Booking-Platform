import { api } from "./client";
export type Room = {
  id: number;
  roomNumber: string;
  cost: number;
};
export function fetchRooms(params: {
  roomNumber?: string;
  pageSize?: number;
  pageNumber?: number;
}) {
  return api.get<Room[]>("/api/rooms", { params }).then((res) => res.data);
}
export function createRoom(data: Partial<Room>) {
  return api.post<Room>("/api/rooms", data).then((res) => res.data);
}
export function updateRoom(id: number, data: Partial<Room>) {
  return api.put(`/api/rooms/${id}`, data);
}
export function deleteRoom(id: number) {
  return api.delete(`/api/rooms/${id}`);
}
