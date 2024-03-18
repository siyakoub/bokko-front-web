import {User} from "../UserInterface/User";

export interface AddMessage {
    expediteur: User,
    destinataire: User,
    contenu: string,
    dateHeureEnvoi: string,
    lu: boolean
}
