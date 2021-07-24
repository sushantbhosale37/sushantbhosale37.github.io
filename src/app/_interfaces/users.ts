export interface IUser {
  id: number;
  name: string;
  avatar: string;
  email: string;
  created_at: string;
  updated_at: string;
  owner_user_id: string;
  owner_name: string;
  status: any;
  confirmed: string;
  activated_on: string;
  last_login_at: string;
  role_id: string;
  role_name: string;
}
