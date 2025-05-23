import { Injectable } from '@angular/core';
import { UserState } from '../interfaces/userState.interface';

const STORAGE_KEY = 'tempUserData';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private tempUserData: Partial<UserState> = {};
  
  private readonly PAID_KEY = 'hasPaid';
  private readonly DIET_KEY = 'hasSelectedDiet';

  constructor() {
    // Ao instanciar, tenta carregar do localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        this.tempUserData = JSON.parse(saved);
      } catch {
        this.tempUserData = {};
      }
    }
  }

  /** Atualiza o estado parcial e grava no localStorage */
  setPartialData(data: Partial<UserState>) {
    this.tempUserData = { ...this.tempUserData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tempUserData));
  }

  /** Retorna o estado atual (carregado da memória) */
  getCurrentData(): Partial<UserState> {
    return this.tempUserData;
  }

  /** Limpa o estado em memória e no localStorage */
  clearData() {
    this.tempUserData = {};
    localStorage.removeItem(STORAGE_KEY);
  }

  setHasPaid(v: boolean) { localStorage.setItem(this.PAID_KEY, String(v)); }
  getHasPaid(): boolean { return localStorage.getItem(this.PAID_KEY) === 'true'; }

  setHasSelectedDiet(v: boolean) { localStorage.setItem(this.DIET_KEY, String(v)); }
  getHasSelectedDiet(): boolean { return localStorage.getItem(this.DIET_KEY) === 'true'; }
}
