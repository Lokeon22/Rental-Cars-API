export interface UserProps {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  drive_license: string;
  is_admin: boolean;
  created_at: Date;
}

export interface UserUpdate {
  name: string;
  email: string;
  username: string;
  drive_license: string;
  newpassword?: string;
  oldpassword?: string;
}
