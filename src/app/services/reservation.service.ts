import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { collectionData } from '@angular/fire/firestore';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private firestore: Firestore) { }

  // Obtener todas las reservas
  getReservations(): Observable<Reservation[]> {
    const reservationsRef = collection(this.firestore, 'reservations');
    return collectionData(reservationsRef, { idField: 'id' }) as Observable<Reservation[]>;
  }

  // Crear una nueva reserva
  saveReservation(reservation: Reservation): Promise<void> {
    const reservationsRef = collection(this.firestore, 'reservations');
    return addDoc(reservationsRef, reservation) as unknown as Promise<void>;
  }

  // Cancelar una reserva
  cancelReservation(reservationId: string): Promise<void> {
    const reservationDoc = doc(this.firestore, `reservations/${reservationId}`);
    return deleteDoc(reservationDoc);
  }

  // Actualizar una reserva
  updateReservation(reservationId: string, updatedReservation: Partial<Reservation>): Promise<void> {
    const reservationDoc = doc(this.firestore, `reservations/${reservationId}`);
    return updateDoc(reservationDoc, updatedReservation);
  }
}
