import { computed, inject, Injectable, signal } from '@angular/core';

import { collection, deleteDoc, doc, Firestore, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _reservations = signal<Reservation[]>([]); // Signal privado para manejar las reservas
  private roomId: string | null = null; // Almacenar roomId

  // Computed signal para acceder a las reservas
  reservations = computed(() => this._reservations());

  private firestore = inject(Firestore);

  // Establecer el roomId y cargar reservas
  setRoomId(roomId: string): void {
    this.roomId = roomId;
    this.loadReservations(roomId); // Cargar reservas para la habitación específica
  }

  // Obtener reservas desde Firestore y actualizar el signal
  private async loadReservations(roomId: string): Promise<void> {
    const reservationQuery = query(collection(this.firestore, 'reservations'), where('roomId', '==', roomId));
    const querySnapshot = await getDocs(reservationQuery);

    const reservationsList: Reservation[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Reservation[];

    this._reservations.set(reservationsList); // Actualiza el signal privado con la nueva lista de reservas
  }

  // Crear una nueva reserva
  async createReservation(reservation: Reservation): Promise<void> {
    const reservationRef = collection(this.firestore, 'reservations');

    // Generar un ID único para la nueva reserva
    const newReservationId = doc(reservationRef).id; // Crea un nuevo documento para generar un ID único

    // Guardar la nueva reserva en Firestore
    await setDoc(doc(reservationRef, newReservationId), {
      ...reservation,
      roomId: this.roomId,
      id: newReservationId  // Asignar el nuevo ID a la reserva
    });

    // Actualizar el signal privado
    this._reservations.set([...this._reservations(), { ...reservation, id: newReservationId }]);
  }

  // Actualizar una reserva existente
  async updateReservation(id: string, updatedReservation: Partial<Reservation>): Promise<void> {
    const reservationRef = doc(this.firestore, 'reservations', id);

    // Actualizar la reserva en Firestore
    await updateDoc(reservationRef, {
      ...updatedReservation,
    });

    // Actualizar el signal privado
    this._reservations.set(this._reservations().map(res =>
      res.id === id ? { ...res, ...updatedReservation } : res
    ));
  }

  // Eliminar una reserva
  async deleteReservation(id: string): Promise<void> {
    const reservationRef = doc(this.firestore, 'reservations', id);

    // Eliminar la reserva en Firestore
    await deleteDoc(reservationRef);

    // Actualizar el signal privado
    this._reservations.set(this._reservations().filter(res => res.id !== id));
  }
}
