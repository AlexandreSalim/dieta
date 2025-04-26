import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, LoginRequest } from '../interfaces/login.interface';
import { CreateUserHealth, CreateUserRequest, CreateUserResponse } from '../interfaces/createUser.interface';


export interface CreateUser {
  full_name: string;
  email: string;
  age: number;
  gender: string;
  phone: string;
  password: string;
}

export interface login {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly base = environment.api;
  
  constructor(private http: HttpClient) { }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.base}/login`, payload)
      .pipe(
        tap(res => {
          // guarda o token para usar depois
          localStorage.setItem('token', res.token);
        })
      );
  }

  createUser(payload: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${this.base}/users`,  // ajuste para a rota exata que você viu no Postman
      payload
    );
  }

  createUserHealth(payload: CreateUserHealth): Observable<CreateUserHealth> {
    return this.http.post<CreateUserHealth>(
      `${this.base}/users_health`,
      payload
    );
  }

}
