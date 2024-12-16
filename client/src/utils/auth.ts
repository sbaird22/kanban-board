import { JwtPayload, jwtDecode } from 'jwt-decode';

interface LocalJwtPayload {
  username: string;
  exp: number; // Expiration time of the token
}


class AuthService {
  // Decode the token to get user profile
  getProfile(): JwtPayload| null {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode<JwtPayload>(token);
  }

  // Check if the user is logged in
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    const decoded = jwtDecode<LocalJwtPayload>(token);
    if (!decoded.exp) return true; // If no expiry, treat as expired
    return Date.now() >= decoded.exp * 1000;
  }

  // Get the JWT from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Save the JWT to localStorage and redirect
  login(idToken: string): void {
    localStorage.setItem('token', idToken);
    window.location.href = '/kanban'; // Redirect to the Kanban board
  }

  // Clear the JWT and redirect to login
  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to the login page
  }
}

export default new AuthService();