export interface Reservation {
  id_reserva: number;
  fecha: string;  
  hora: string;
  estado: string;
  id_usuario: number;
  id_negocio: number;
  id_servicio: number;
  created_at: string;
  updated_at: string;
}
