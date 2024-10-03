import { Injectable } from '@angular/core';
import { collection, Firestore } from 'firebase/firestore';
import { Reservation } from '../models/reservation.model';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private firestore: Firestore) { }

  // Obtener todas las reservas
  getReservations(): Observable<Reservation[]> {
    const reservationsRef = collection(this.firestore, 'reservations');
    return collectionData(reservationsRef, { idField: 'id' }) as Observable<Reservation[]>;
  }
}
