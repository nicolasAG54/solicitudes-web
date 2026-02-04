export type EstadoSolicitud = 'Pendiente' | 'En Proceso' | 'Resuelta' | 'Rechazada';
export type prioridad = 'Alta' | 'Media' | 'Baja';
export interface Solicitud {
  id: number;
  titulo: string;
  descripcion?: string;
  estado: EstadoSolicitud;
  prioridad: prioridad;
  fechaCreacion?: string;
  fechaActualizacion?: string | null;
}

export interface SolicitudUpdate {
  titulo: string;
  descripcion: string;
  prioridad: prioridad;
}
