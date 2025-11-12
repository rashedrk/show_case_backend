export interface IAuth {
  email: string;
  password: string;
}
export interface IJwtTokenPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}
