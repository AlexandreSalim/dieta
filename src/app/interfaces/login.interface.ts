// Payload enviado para login
export interface LoginRequest {
    email: string;
    password: string;
  }
  
  // Resposta do login (você disse que retorna um token 200 OK)
  export interface AuthResponse {
    token: string;
  }