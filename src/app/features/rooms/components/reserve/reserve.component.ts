import { Component, inject, Input, OnChanges, signal } from '@angular/core';
import { Room } from '../../../../models/room.model';
import { ReservationService } from '../../../../services/reservation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { Reservation } from '../../../../models/reservation.model';
import { Alerts } from '../../../../core/utils/alerts';

@Component({
  selector: 'app-reserve',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss'
})
export class ReserveComponent implements OnChanges {
  @Input({ required: true }) room!: Room;
  reservationForm!: FormGroup;
  minCheckInDate!: string;
  maxCheckInDate!: string;
  minCheckOutDate!: string;
  maxCheckOutDate!: string;
  currentReservationId?: string; // Para rastrear si estamos editando una reserva
  isDateOccupied: boolean = false;
  reservationService = inject(ReservationService);
  private fb = inject(FormBuilder)

  ngOnChanges(): void {
    this.initForm();
    this.setDateLimits();
    this.setRoom(this.room.id)
  }

  setRoom(roomId: string) {
    this.reservationService.setRoomId(roomId);
  }
  // Inicializar el formulario de reserva
  initForm(): void {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      idPerson: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });
    this.currentReservationId = ''
  }


  // Establecer límites de fechas para las reservas (mínimo, máximo)
  setDateLimits(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const maxAdvanceDate = new Date(today);
    maxAdvanceDate.setDate(today.getDate() + 30);

    // Limitar fecha de check-in desde mañana hasta 30 días en el futuro
    this.minCheckInDate = this.formatDate(tomorrow);
    this.maxCheckInDate = this.formatDate(maxAdvanceDate);
  }


  create(): void {
    if (this.currentReservationId) {
      //this.editReservation(reservation);
      console.log(this.reservationForm.value, 'editando');

      this.updateExistingReservation(this.currentReservationId, this.reservationForm.value);
    } else {
      this.createNewReservation()
    }
  }

  async createNewReservation(): Promise<void> {
    if (!this.checkDateAvailability(this.reservationForm.value.checkInDate, this.reservationForm.value.checkOutDate)) {
      this.isDateOccupied = false;
      await this.reservationService.createReservation(this.reservationForm.value);
      Alerts.customized({ title: 'Reserva creada', html: 'Se creó la reserva correctamente.', icon: 'success' });

      this.reservationForm.reset();
    } else {
      this.isDateOccupied = true;
      Alerts.customized({ title: 'ERROR', html: 'Ya existe reserva para esas fechas.', icon: 'error' })
    }
  }

  // Actualizar una reserva existente
  async updateExistingReservation(id: string, updatedReservation: Partial<Reservation>) {
    await this.reservationService.updateReservation(id, updatedReservation);
    this.currentReservationId = '';
    this.reservationForm.reset();
  }
  // Cargar los datos de una reserva para edición
  editReservation(reservation: Reservation): void {
    this.currentReservationId = reservation.id;
    this.reservationForm.patchValue({
      name: reservation.name,
      idPerson: reservation.idPerson,
      checkInDate: this.formatDate(reservation.checkInDate),
      checkOutDate: this.formatDate(reservation.checkOutDate),
    });
  }

  // Eliminar una reserva
  async deleteReservation(id: string): Promise<void> {
    await this.reservationService.deleteReservation(id);
    this.initForm();
  }


  // Actualizar límites de fecha de salida en función de la fecha de entrada
  onDateChange(): void {
    const checkInDate = new Date(this.reservationForm.get('checkInDate')?.value);
    const checkOutMinDate = new Date(checkInDate);
    checkOutMinDate.setDate(checkInDate.getDate() + 1); // Mínimo 1 día después del check-in

    const checkOutMaxDate = new Date(checkInDate);
    checkOutMaxDate.setDate(checkInDate.getDate() + 3); // Máximo 3 días de estancia

    this.minCheckOutDate = this.formatDate(checkOutMinDate);
    this.maxCheckOutDate = this.formatDate(checkOutMaxDate);
  }


  // Función para verificar la disponibilidad de las fechas
  checkDateAvailability(checkIn: string, checkOut: string): boolean {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Verificar que no haya superposición con las fechas reservadas
    return this.reservationService.reservations().some(reservation => {
      const reservedCheckIn = new Date(reservation.checkInDate);
      const reservedCheckOut = new Date(reservation.checkOutDate);
      return (
        (checkInDate < reservedCheckOut && checkOutDate > reservedCheckIn) // Superposición de fechas
      );
    });
  }



  // Formatear la fecha en formato YYYY-MM-DD
  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en');
  }
}
