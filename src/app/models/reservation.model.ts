export interface Reservation {
  id?: number;
  fecha: string;
  hora: string;
  estado: string;
  usuarioId: number;
  negocioId: number;
  servicioId: number;
}
