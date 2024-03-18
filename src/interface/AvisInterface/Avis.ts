import {User} from "../UserInterface/User";
import {Reservation} from "../ReservationInterface/Reservation";

export interface Avis {
    userDTO: User,
    reservationDTO: Reservation
    note: number,
    commentaire: string,
    dateHeureAvis: string,
    id: number
}
