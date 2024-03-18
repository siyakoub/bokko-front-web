import {User} from "../UserInterface/User";
import {Reservation} from "../ReservationInterface/Reservation";

export interface AddAvis {
    userDTO: User,
    reservationDTO: Reservation
    note: number,
    commentaire: string,
    dateHeureAvis: string
}
