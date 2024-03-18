import {Trajet} from "../TrajetInterface/Trajet";
import {User} from "../UserInterface/User";

export interface AddReservation {
    trajetDTO: Trajet,
    userDTO: User,
    nbPlacesReserv: number,
    dateReservation: string,
    statut: string
}
