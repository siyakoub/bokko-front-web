import {Avis} from "../interface/AvisInterface/Avis";
import {AddAvis} from "../interface/AvisInterface/AddAvis";

const baseUrl: string = 'http://localhost:2001/api/bokko/service/review';
// const baseUrl: string = 'http://35.203.45.227:2001/api/bokko/service/review';
//Pour la prod

export async function get(token: string, email: string): Promise<Avis> {
    const response = await fetch(baseUrl + '/?email=' + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun avis trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de l'avis...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Avis;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function getAllAvisByReservation(token: string, email: string, idReservation: number) : Promise<Avis[] | null> {
    const response = await fetch(baseUrl + "/allbybooking?email=" + email + "&idReservation=" + idReservation, {
        method: 'GET',
        headers : {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error('Aucun avis trouvé...');
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des avis de la réservation...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Avis[];
        } else {
            return null;
        }
    }
}

export async function getAllAvisByUser(token: string, email: string) : Promise<Avis[] | null> {
    const response = await fetch(baseUrl + "/allbyuser?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun avis trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des avis de l'utilisateur...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Avis[];
        } else {
            return null;
        }
    }
}

export async function getAll(token: string, page: number, size: number) : Promise<Avis[]> {
    const response = await fetch(baseUrl + "/all?page="+ page.toString() +"&size=" + size.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun avis trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de la liste des avis...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Avis[];
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function create(token: string, addAvis: AddAvis): Promise<Avis> {
    const response = await fetch(baseUrl + "/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(addAvis)
    });
    if (response.status === 404) {
        throw new Error("Problème lors de l'enregistrement de l'avis...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création de l'avis...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Avis;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function update(token: string, email: string, updatedAvis: Avis): Promise<Avis> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(updatedAvis)
    });
    if (response.status === 404) {
        throw new Error("Problème lors de la mise à jour de l'avis...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour de l'avis...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Avis;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function deleteAvis(token: string, email: string): Promise<Avis> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Problème lors de la suppression de l'avis...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression de l'avis...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Avis;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}
