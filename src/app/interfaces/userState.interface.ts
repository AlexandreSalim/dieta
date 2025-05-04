import { DietOption } from "../escolher-dieta/escolher-dieta.page";
import { Refeicao } from "../service/workout.service";

// src/app/models/user-state.model.ts
export interface UserState {
  name: string;
  email: string;
  password: string;
  age: string;               // agora vem como string, vamos converter depois
  gender: string;
  height: string;
  weight: string;
  exerciseFrequency: string; // se você tiver endpoint pra isso…
  training_level: string;    // idem
  goal: string;
  phone: string;
  dieta: number;  
}
