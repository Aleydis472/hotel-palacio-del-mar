import { Injectable } from '@angular/core';
import { collection, Firestore } from 'firebase/firestore';
import { Reservation } from '../models/reservation.model';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private firestore: Firestore) { }

   // Obtener todas las habitaciones
   getRooms(): Observable<Room[]> {
    const roomsRef = collection(this.firestore, 'rooms');
    return collectionData(roomsRef, { idField: 'id' }) as Observable<Room[]>;
  }

}
