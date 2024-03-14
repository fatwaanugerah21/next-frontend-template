// Requests
export interface IApiLoginParams {
  username: string;
  password: string;
}

// Responses
export interface IApiBaseResponse<T> {
  data?: T;
  errors?: IErorResponse[];
  success: boolean;
}

export interface IApiLoginResponse {
  token: string;
}

export interface IApiUser {
  id: number; // 2;
  organization_id: number; // 1;
  username: string; // "admin";
  name: string; // "Admin";
  email: string; // null;
  phone_number: string; // null;
  created_at: Date; // "2024-02-19T13:01:37.248787+08:00";
}

export interface IApiMeResponse {
  user: IApiUser;
}

export interface IErorResponse {
  code: number; // 400,
  detail: string; // "invalid username or password"
}
