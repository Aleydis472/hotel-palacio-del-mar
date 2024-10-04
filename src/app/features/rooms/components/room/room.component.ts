import { Component, inject, Input, input } from '@angular/core';
import { RoomService } from '../../../../services/room.service';
import { Room } from '../../../../models/room.model';
import { CommonModule } from '@angular/common';
import { ReserveComponent } from '../reserve/reserve.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, ReserveComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  @Input({ required: true }) room!: Room;
}
