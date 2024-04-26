import {Trajet} from "../TrajetInterface/Trajet";
import {User} from "../UserInterface/User";

export interface AddReservation {
    trajetDTO: {
        userDTO: {
            name: string,
            firstName: string,
            email: string,
            phoneNumber: string,
            statut: string,
            id: number
        },
        depart: string,
        arrivee: string,
        dateHeureDepart: string,
        nbPlaces: number,
        prix: number,
        statut: string,
        id: number
    },
    userDTO: {
        name: string,
        firstName: string,
        email: string,
        phoneNumber: string,
        token: string,
        statut: string,
        id: number
    },
    nbPlacesReserv: number,
    dateReservation: string,
    statut: string
}
