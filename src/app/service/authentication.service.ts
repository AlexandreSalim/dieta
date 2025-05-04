import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  return this.http
    .post<CreateUserResponse>(`${this.base}/users`, payload)
    .pipe(
      tap(res => {
        // armazena o token para usar nas chamadas subsequentes
        localStorage.setItem('token', res.token);
      })
    );
}

createUserHealth(payload: CreateUserHealth): Observable<CreateUserHealth> {
  let token = localStorage.getItem('token') as string;
  return this.http.post<CreateUserHealth>(
    `${this.base}/users_health`,
    payload,
    { headers: {
      Authorization: token
      }
    }
  );
}

getUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `${token}`
  });

  return this.http.get<any>(`${this.base}/user-info`, { headers });
}

setDieta(id: number):Observable<any> {
  const token = localStorage.getItem('token')!;
  const headers = new HttpHeaders({
    Authorization: `${token}`
  });

    return this.http.post(`${this.base}/diet/users`, { diet_id: id }, { headers, responseType: 'text' })
}

getDieta():Observable<any> {
  const token = localStorage.getItem('token')!;
  const headers = new HttpHeaders({
    Authorization: `${token}`
  });

  return this.http.get<any>(`${this.base}/diet/users`,  { headers })
}

getGenerateDieta():Observable<any> {
  const token = localStorage.getItem('token')!;
  const headers = new HttpHeaders({
    Authorization: `${token}`
  });

  return this.http.get<any>(`${this.base}/diets/generate`, {headers})
}
}
