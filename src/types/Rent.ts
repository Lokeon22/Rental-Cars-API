export interface Rent {
  id: number;
  car_id: number;
  user_id: number;
  start_date: Date;
  end_date: Date;
  expected_return_date: Date;
  total: number;
  created_at: Date;
  updated_at: Date;
}

export interface RentCreateProps {
  car_id: string;
  user_id: number;
  start_date: Date;
  end_date: Date;
  total_price: number;
}
