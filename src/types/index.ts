export interface HotelAmenity {
  id: number;
  name: string;
  description: string;
}

export interface SearchHotel {
  hotelId: number;
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: number;
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  discount: number;
  amenities: HotelAmenity[];
}
