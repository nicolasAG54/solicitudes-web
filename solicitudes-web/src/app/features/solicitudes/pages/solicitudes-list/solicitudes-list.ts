import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { SolicitudesService } from '../../Services/solicitudes';
import { Solicitud } from '../../models/solicitud.model';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudesForm } from '../solicitudes-form/solicitudes-form';
import { SolicitudesDetail } from '../solicitudes-detail/solicitudes-detail';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-solicitudes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltip,
  ],
  templateUrl: './solicitudes-list.html',
  styleUrls: ['./solicitudes-list.scss'],
})
export class SolicitudesList implements OnInit {
  private solicitudesService = inject(SolicitudesService);
  private dialog = inject(MatDialog);
  public authService = inject(AuthService);
  // Signals inicializados una sola vez
  solicitudes = signal<Solicitud[]>([]);
  isLoading = signal(true);

  displayedColumns = computed(() =>
    this.authService.getRole() === 'agente'
      ? ['titulo', 'estado', 'fecha', 'acciones']
      : ['titulo','estado','prioridad', 'fecha', 'acciones'],
  );

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  loadSolicitudes() {
    this.isLoading.set(true);

    this.solicitudesService.getAll().subscribe({
      next: (response) => {
        console.log(response);
        const mapped = response.data.map((item) => ({
          id: item.id,
          titulo: item.titulo,
          estado: item.estado,
          fechaCreacion: item.fechaCreacion,
          prioridad: item.prioridad,
        }));

        setTimeout(() => {
          this.solicitudes.set(mapped);
          this.isLoading.set(false);
        });
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(SolicitudesForm, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Refrescar lista después de cerrar modal
        this.loadSolicitudes();
      }
    });
  }

  openDetalle(solicitudId: number) {
    this.dialog.open(SolicitudesDetail, {
      width: '500px',
      data: { solicitudId },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadSolicitudes();
    });
  }
  toggleRole() {
    const nuevo = this.authService.getRole() === 'agente' ? 'supervisor' : 'agente';
    this.authService.setRole(nuevo);
  }
}
