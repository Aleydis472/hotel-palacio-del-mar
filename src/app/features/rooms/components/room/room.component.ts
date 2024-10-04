import { Component, inject, Input, input } from '@angular/core';
import { RoomService } from '../../../../services/room.service';
import { Room } from '../../../../models/room.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  @Input({ required: true }) room!: Room;
}
