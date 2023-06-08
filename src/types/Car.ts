export interface Car {
  id: number;
  name: string;
  description: string;
  daily_rate: number;
  available: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  created_at: Date;
  category_name: string;
  category_description: string;
}

export interface CarImage {
  id: number;
  car_id: number;
  image_name: string;
  created_at: Date;
}

export interface CarCategorie {
  car_id: number;
  category_name: string;
  category_description: string;
  created_at: Date;
}
