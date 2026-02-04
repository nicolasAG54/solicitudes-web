import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = signal<string | null>(null);
  private mockRole = signal<'agente' | 'supervisor'>('agente');
  // Guardar token en signal + localStorage
  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('token', token);
  }

  // Obtener token, desde signal o localStorage
  getToken(): string | null {
    return this.token() ?? localStorage.getItem('token');
  }

  // Eliminar token (logout)
  clear() {
    this.token.set(null);
    localStorage.removeItem('token');
  }

  // ✅ Método que revisa si hay token para saber si está logueado
  isLogged(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decodificar payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Comparar exp con el tiempo actual
      return payload.exp * 1000 > Date.now();
    } catch (e) {
      // Token inválido o corrupto
      return false;
    }
  }

  getRole(): 'agente' | 'supervisor' {
    return this.mockRole();
  }

  setRole(role: 'agente' | 'supervisor') {
    this.mockRole.set(role);
  }
}
