import "../UserInterface/User";
import {User} from "../UserInterface/User";

export interface Profil {
    userDTO: User,
    bio: string,
    pictureProfil: string,
    id: number
}
