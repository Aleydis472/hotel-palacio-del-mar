import { Component, inject, OnInit } from '@angular/core';
import { RoomService } from '../../../../services/room.service';
import { Room } from '../../../../models/room.model';
import { RoomComponent } from '../../components/room/room.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RoomComponent],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export default class RoomListComponent implements OnInit {

  roomList: Room[] = [];
  roomService = inject(RoomService);
  spinner = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.getRoomList();
  }

  getRoomList(): void {
    this.spinner.show();
    this.roomService.getRooms().subscribe(answer => {
      this.roomList = answer; 
      this.spinner.hide();     
    })
  }

}
