import { inject, Injectable, signal, Signal } from '@angular/core';

import { Reservation } from '../models/reservation.model';
import { Observable } from 'rxjs';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  firestore = inject(Firestore);
  roomsSignal: Signal<Room[]> = signal<Room[]>([]);
   // Obtener todas las habitaciones
   getRooms(): Observable<Room[]> {
    const roomsRef = collection(this.firestore, 'rooms');
    return collectionData(roomsRef, { idField: 'id' }) as Observable<Room[]>;
  }

}
