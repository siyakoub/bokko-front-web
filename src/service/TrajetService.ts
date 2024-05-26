import {Trajet} from "../interface/TrajetInterface/Trajet";
import {AddTrajet} from "../interface/TrajetInterface/AddTrajet";
import {UpdateTrajet} from "../interface/TrajetInterface/UpdateTrajet";

//const baseUrl: string = 'http://localhost:2001/api/bokko/service/journey';
const baseUrl: string = 'http://35.203.45.227:2001/api/bokko/service/journey';
// pour la prod

export async function get(token: string, email: string): Promise<Trajet> {
    const response = await fetch(baseUrl + '/?email=' + email, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun Trajet n'a été trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération du trajet...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data['content'] as Trajet;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function getAllTrajetByDriver(token: string, email: string) : Promise<Trajet[]> {
    const response = await fetch(baseUrl + "/allbydriver?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun trajet n'as été trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des trajets...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Trajet[];
        } else{
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function getAll(token: string, page: number, size: number) : Promise<Trajet[]> {
    const response = await fetch(baseUrl + "/all?page="+ page.toString() +"&size=" + size.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun trajet n'a été trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des trajets...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Trajet[];
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function create(token: string, addTrajet: AddTrajet) : Promise<Trajet> {
    const response = await fetch(baseUrl + "/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(addTrajet)
    });
    if (response.status === 404) {
        throw new Error("Problème d'enregistrement du trajet...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création du trajet...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Trajet;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function update(token: string, email: string, trajet: UpdateTrajet): Promise<Trajet> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(trajet)
    });
    if (response.status === 404) {
        throw new Error("Mise à jour mal enregistré...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour du trajet...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Trajet;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function deleteTrajet(token: string, email: string): Promise<Trajet> {
    const response : Response = await fetch(baseUrl + "/?email=" + email, {
        method: 'DELETE',
        headers : {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Problème lors de la suppression du trajet...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression du trajet...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Trajet;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function deleteTrajetById(token: string, email: string, idTrajet: number) : Promise<Trajet> {
    const response = await fetch(baseUrl + '/?email=' + email + "&id=" + idTrajet.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error('Aucun trajet trouvé...');
    } else if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la récupération du trajet...');
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Trajet;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function getById(token: string, email: string, idTrajet: number) : Promise<Trajet> {
    const response = await fetch(baseUrl + '/?email=' + email + '&idTrajet=' + idTrajet.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error('Aucun trajet trouvé...');
    } else if (!response.ok) {
        throw new Error('Une erreur est surenue lors de la récupération du trajet...');
    } else {
        const data = await response.json();
        if (data['hasError'] === false){
            return data['content'] as Trajet;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

