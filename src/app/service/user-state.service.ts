import { Injectable } from '@angular/core';
import { UserState } from '../interfaces/userState.interface';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private tempUserData: Partial<UserState> = {};

  setPartialData(data: Partial<UserState>) {
    this.tempUserData = { ...this.tempUserData, ...data };
  }

  getCurrentData() {
    return this.tempUserData;
  }

  clearData() {
    this.tempUserData = {};
  }
}