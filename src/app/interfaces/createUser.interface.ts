// Payload enviado para criar usuário
export interface CreateUserRequest {
    full_name: string;
    email: string;
    phone: string;
    password: string;
  }
  
  export interface CreateUserResponse {
    id: number;
    full_name: string;
    email: string;
    age: number;
    gender: string;
    phone: string;
    token: string;
  }

  export interface CreateUserHealth {
    age: number;
    gender: string;
    height_cm: number;
    weight_kg: number;
    goal: string;
  }
