export interface JwtPayload {
  email: string;
  sub: number; // This can be the user's ID
}
