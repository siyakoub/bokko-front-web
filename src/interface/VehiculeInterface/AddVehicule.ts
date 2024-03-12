import {User} from "../UserInterface/User";
import {AddUser} from "../UserInterface/AddUser";

export interface AddVehicule {
    "userDTO": User,
    "marque": string,
    "modele": string,
    "couleur": string,
    "immatriculation": string,
    "annee": number,
    "used": number
}
