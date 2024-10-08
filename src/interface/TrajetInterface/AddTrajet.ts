import {User} from "../UserInterface/User";
import {AddUser} from "../UserInterface/AddUser";

export interface AddTrajet {
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
    statut: string
}
