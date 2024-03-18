import {Reservation} from "../ReservationInterface/Reservation";
import {User} from "../UserInterface/User";

export interface Paiement {
    reservationDTO: Reservation,
    userDTO: User,
    montant: number,
    dateHeurePaiement: string,
    methode: string,
    statut: string,
    id: number
}
