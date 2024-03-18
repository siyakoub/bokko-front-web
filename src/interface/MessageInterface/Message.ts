import {User} from "../UserInterface/User";

export interface Message {
    expediteur: User,
    destinataire: User,
    contenu: string,
    dateHeureEnvoi: string,
    lu: boolean,
    id: number
}
