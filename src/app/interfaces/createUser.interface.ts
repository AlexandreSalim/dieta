// Payload enviado para criar usuário
export interface CreateUserRequest {
    full_name: string;
    email: string;
    age: number;
    gender: string;
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
  }

  export interface CreateUserHealth {
    age: string;
    gender: string;
    user_id: string;
    height_cm: string;
    weight_kg: string;
    goal: string;
  }
