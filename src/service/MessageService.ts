import {Message} from "../interface/MessageInterface/Message";
import {AddMessage} from "../interface/MessageInterface/AddMessage";

const baseUrl: string = 'http://localhost:2001/api/bokko/service/message';
//const baseUrl: string = 'http://35.203.45.227:2001/api/bokko/service/message';
//pour la prod

export async function get(token: string, email: string): Promise<Message> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun message trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Message;
        } else {
            throw new Error("Une erreur est survenue lors de la récupération du message...");
        }
    }
}

export async function getAll(token: string, page: number, size: number) : Promise<Message[]> {
    const response = await fetch(baseUrl + "/all?page="+ page.toString() +"&size=" + size.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun message trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des réservation...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Message[];
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function create(token: string, addMessage: AddMessage): Promise<Message> {
    const response = await fetch(baseUrl + "/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(addMessage)
    });
    if (response.status === 404) {
        throw new Error("Problème lors de l'enregistrement du message...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création du message...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Message;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function update(token: string, email: string, updatedMessage: Message) : Promise<Message> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(updatedMessage)
    });
    if (response.status === 404) {
        throw new Error("Problème lors de la mise à jour du message...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour du message...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Message;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function deleteMessage(token: string, email: string): Promise<Message> {
    const response = await fetch(baseUrl + '/?email=' + email, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Problème lors de la suppression du message...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression du message...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Message;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}
