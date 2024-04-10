import {User} from "../UserInterface/User";
import {AddUser} from "../UserInterface/AddUser";

export interface AddVehicule {
    "userDTO": {
        "name": string,
        "firstName": string,
        "email": string,
        "phoneNumber": string,
        "statut": string,
        "id": number
    },
    "marque": string,
    "modele": string,
    "couleur": string,
    "immatriculation": string,
    "annee": number,
    "used": number
}
