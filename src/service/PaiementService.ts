import {Paiement} from "../interface/PaiementInterface/Paiement";
import {AddPaiement} from "../interface/PaiementInterface/AddPaiement";

const baseUrl: string = 'http://localhost:2001/api/bokko/service/payment';
// const baseUrl: string = 'http://35.203.45.227:2001/api/bokko/service/payment';
//pour la prod

export async function get(token: string, email: string) : Promise<Paiement> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun paiement trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Paiement;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function getAll(token: string, page: string, size: number): Promise<Paiement[]> {
    const response = await fetch(baseUrl + "/all?page="+ page.toString() +"&size=" + size.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun paiement trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des paiements...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Paiement[];
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function create(token: string, addPaiement: AddPaiement): Promise<Paiement> {
    const response = await fetch(baseUrl + "/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(addPaiement)
    });
    if (response.status === 404) {
        throw new Error("Problème lors de l'enregistrement du paiement...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des paiements...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Paiement;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function update(token: string, email: number, updatedPaiement: Paiement): Promise<Paiement> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(updatedPaiement)
    });
    if (response.status === 404) {
        throw new Error("Problème durant la mise à jour du paiement...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour du paiement...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Paiement;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function deletePaiement(token: string, email: string): Promise<Paiement> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Problème durant la suppression du paiement...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression du paiement...")
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Paiement;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

