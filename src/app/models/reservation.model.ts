export interface Reservation {
    id: string;
    roomId: number;
    name: string;
    idPerson: string;
    checkInDate: Date; // Fecha de entrada en formato YYYY-MM-DD
    checkOutDate: Date; // Fecha de salida en formato YYYY-MM-DD
}
