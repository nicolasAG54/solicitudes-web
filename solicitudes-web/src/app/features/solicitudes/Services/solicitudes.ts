import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud, SolicitudUpdate } from '../models/solicitud.model';

interface PagedResponse<T> {
  total: number;
  page: number;
  pageSize: number;
  data: T[];
}

@Injectable({
  providedIn: 'root',
})

export class SolicitudesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5235/api/solicitudes';

  getAll(): Observable<PagedResponse<Solicitud>> {
    return this.http.get<PagedResponse<Solicitud>>(this.apiUrl);
  }
  getSolicitud(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`);
  }

  updateSolicitud(id: number, data: SolicitudUpdate): Observable<Solicitud> {
    return this.http.put<Solicitud>(`${this.apiUrl}/${id}`, data);
  }
}
