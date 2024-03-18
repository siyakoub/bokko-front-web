import {User} from "../UserInterface/User";

export interface Trajet {
    userDTO: User,
    depart: string,
    arrivee: string,
    dateHeureDepart: string,
    nbPlaces: number,
    prix: number,
    statut: string,
    id: number
}
