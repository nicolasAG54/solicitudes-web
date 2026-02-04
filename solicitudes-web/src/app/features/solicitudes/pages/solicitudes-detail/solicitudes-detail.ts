import { Component, inject, signal, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolicitudesService } from '../../Services/solicitudes';
import { Solicitud, SolicitudUpdate } from '../../models/solicitud.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-solicitudes-detail',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogActions,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './solicitudes-detail.html',
  styleUrls: ['./solicitudes-detail.scss'],
})
export class SolicitudesDetail {
  // Servicios
  public authService = inject(AuthService);
  private service = inject(SolicitudesService);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<SolicitudesDetail>);
  private data = inject(MAT_DIALOG_DATA) as { solicitudId: number };

  // Signals
  solicitud = signal<Solicitud | null>(null);
  loading = signal(true);
  editMode = signal(false);

  form!: FormGroup;

  constructor() {
    this.form = this.fb.group({
      titulo: [{ value: '', disabled: true }, Validators.required],
      descripcion: [{ value: '', disabled: true }, Validators.required],
      prioridad: [{ value: '', disabled: true }],
    });

    this.getDataSolicitud();

    effect(() => {
      console.log('EditMode:', this.editMode());
      console.log('Solicitud cargada:', this.solicitud());
    });
  }

  getDataSolicitud() {
    this.service.getSolicitud(this.data.solicitudId).subscribe({
      next: (sol) => {
        if (!sol) return;

        this.solicitud.set(sol);
        this.form.patchValue({
          titulo: sol.titulo,
          descripcion: sol.descripcion,
          prioridad: sol.prioridad,
        });

        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  enableEdit() {
    this.editMode.set(true);
    this.form.get('titulo')?.enable();
    this.form.get('descripcion')?.enable();
    this.form.get('prioridad')?.enable();
  }

  save() {
    if (!this.form.valid || !this.solicitud()) return;

    const updateData: SolicitudUpdate = {
      titulo: this.form.value.titulo ?? this.solicitud()!.titulo,
      descripcion: this.form.value.descripcion ?? this.solicitud()!.descripcion,
      prioridad: this.form.value.prioridad ?? this.solicitud()!.prioridad,
    };
    console.log('Datos a actualizar:', updateData);

    this.service.updateSolicitud(this.solicitud()!.id, updateData).subscribe({
      next: (updated) => {
        this.form.patchValue({
          titulo: updateData.titulo,
          descripcion: updateData.descripcion,
          prioridad: updateData.prioridad,
        });

        this.solicitud.update((prev) => ({
          ...prev!,
          titulo: updateData.titulo,
          descripcion: updateData.descripcion,
          prioridad: updateData.prioridad,
        }));
        console.log('Solicitud actualizada:', this.solicitud());

        this.form.get('titulo')?.disable();
        this.form.get('descripcion')?.disable();
        this.form.get('prioridad')?.disable();
        this.editMode.set(false);
      },
      error: (err) => console.error(err),
    });
  }

  close() {
    this.dialogRef.close(true);
  }

  closeEdit() {
    this.getDataSolicitud();
    this.form.get('titulo')?.disable();
    this.form.get('descripcion')?.disable();
    this.form.get('prioridad')?.disable();
    this.editMode.set(false);
  }

  aceptar() {
    if (!this.solicitud()) return;
  }

  rechazar() {
    if (!this.solicitud()) return;
  }
}
