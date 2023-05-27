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
