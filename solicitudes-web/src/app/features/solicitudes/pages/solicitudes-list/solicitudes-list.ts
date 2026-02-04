import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

interface Solicitud {
  id: number;
  titulo: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
  fecha: string;
}

@Component({
  selector: 'app-solicitudes-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './solicitudes-list.html',
  styleUrls: ['./solicitudes-list.scss']
})
export class SolicitudesList {

  displayedColumns = ['id', 'titulo', 'estado', 'fecha', 'acciones'];

  solicitudes: Solicitud[] = [
    {
      id: 1,
      titulo: 'Solicitud de vacaciones',
      estado: 'Pendiente',
      fecha: '2025-01-10'
    },
    {
      id: 2,
      titulo: 'Compra de equipo',
      estado: 'Aprobada',
      fecha: '2025-01-08'
    }
  ];

}
