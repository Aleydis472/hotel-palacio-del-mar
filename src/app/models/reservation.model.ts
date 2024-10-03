export interface Reservation {
    id?: string;
    roomId: number;
    guestName: string;
    checkInDate: string; // Fecha de entrada en formato YYYY-MM-DD
    checkOutDate: string; // Fecha de salida en formato YYYY-MM-DD
}
