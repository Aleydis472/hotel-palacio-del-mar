export interface Room {
    id?: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    availability: boolean;  // Indica si está disponible o no
}
