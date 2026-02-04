import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-solicitudes-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './solicitudes-form.html',
  styleUrls: ['./solicitudes-form.scss']
})
export class SolicitudesForm {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private dialogRef = inject(MatDialogRef<SolicitudesForm>);

  loading = false;
  error?: string;

  form = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    prioridad: ['Media', Validators.required] // Default a "Media"
  });

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = undefined;

    this.http.post('http://localhost:5235/api/solicitudes', this.form.getRawValue())
      .subscribe({
        next: () => this.dialogRef.close(true), // true = refrescar la lista
        error: (err) => {
          this.error = 'No se pudo crear la solicitud';
          console.error(err);
          this.loading = false;
        }
      });
  }

  close() {
    this.dialogRef.close(false);
  }
}
