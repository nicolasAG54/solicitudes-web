import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;  
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private apiUrl = 'http://localhost:5235/api/Auth/login'; 
  private httpclient= inject(HttpClient);
  

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.httpclient.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }
}
