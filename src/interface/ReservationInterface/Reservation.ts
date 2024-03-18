import {User} from "../UserInterface/User";
import {Trajet} from "../TrajetInterface/Trajet";

export interface Reservation {
    trajetDTO: Trajet,
    userDTO: User,
    nbPlacesReserv: number,
    dateReservation: string,
    statut: string,
    id: number
}
