// src/app/utils/dieta.ts
import { Dieta } from '../app/interfaces/dieta.interface';

export function distribuirHorarios(
  dieta: Dieta[],
  horaInicial: string,      // ex: '08:00'
  intervaloHoras: number    // ex: 3
): Dieta[] {
  const [h0, m0] = horaInicial.split(':').map(Number);
  const base = new Date();
  base.setHours(h0, m0, 0, 0);

  return dieta.map((item, idx) => {
    const dt = new Date(base);
    dt.setHours(base.getHours() + idx * intervaloHoras);

    const hh = String(dt.getHours()).padStart(2, '0');
    const mm = String(dt.getMinutes()).padStart(2, '0');
    return { ...item, meal_times: `${hh}:${mm}` };
  });
}
