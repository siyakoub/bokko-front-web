import {User} from "../UserInterface/User";

export interface UpdateVehicule {
    "userDTO": User,
    "marque": string,
    "modele": string,
    "couleur": string,
    "immatriculation": string,
    "annee": number,
    "id": number
}
