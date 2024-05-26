import {Reservation} from "../interface/ReservationInterface/Reservation";
import {AddReservation} from "../interface/ReservationInterface/addReservation";
import {UpdateReservation} from "../interface/ReservationInterface/updateReservation";

// const baseUrl : string = 'http://localhost:2001/api/bokko/service/booking';
const baseUrl : string = 'http://35.203.45.227:2001/api/bokko/service/booking';
//pour la prod

export async function get(token: string, email: string) : Promise<Reservation> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun trajet trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de la réservation...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Reservation;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function getAllByUser(token: string, email: string) : Promise<Reservation[] | null> {
    const response = await fetch(baseUrl + '/bypassager?email=' + email, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json',
           'token': token
       }
    });
    if (response.status === 404) {
        throw new Error("Aucune réservation trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des réservations...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Reservation[];
        } else {
            return null;
        }
    }
}

export async function getAllByTrajet(token: string, email: string, idTrajet: number) : Promise<Reservation[] | null> {
    const response = await fetch(baseUrl + "/allbytrajet?email=" + email + "&idTrajet=" + idTrajet.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucune réservation trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des réservations...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Reservation[];
        } else {
            return null;
        }
    }
}

export async function getAll(token: string, page: number, size: number) : Promise<Reservation[]> {
    const response = await fetch(baseUrl + "/all?page="+ page.toString() +"&size=" + size.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucune réservation trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des réservations...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data['content'] as Reservation[];
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function create(token: string, addReservation: AddReservation): Promise<Reservation> {
    const response = await fetch(baseUrl + "/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(addReservation)
    });
    if (response.status === 404) {
        throw new Error("Problème lors de l'enregistrement de la réservation...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création de la réservation...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Reservation;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function update(token: string, email: string, updatedReservation: UpdateReservation): Promise<Reservation> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        },
        body: JSON.stringify(updatedReservation)
    });
    if (response.status === 404) {
        throw new Error("Mise à jour mal enregistré...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour de la réservation...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Reservation;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function deleteReservationById(token: string, email: string, idReservation: number) : Promise<Reservation> {
    const response = await fetch(baseUrl + "/byid?email=" + email + "&idReservation=" + idReservation.toString(), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucune réservation trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression de la réservation...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Reservation;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function deleteLastReservation(token: string, email: string): Promise<Reservation> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Problème de suppression de la réservation...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression de la réservation...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Reservation;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function getAllByTrajetInProgress(token: string, email: string, idTrajet: number) : Promise<Reservation[] | null> {
    const response = await fetch(baseUrl + "/allbytrajetinprogress?email=" + email + "&idTrajet=" + idTrajet.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error('Aucune réservation trouvé.');
    } else if (!response.ok) {
        throw new Error('Une erreur est survenue lors de la récupération des réservations en attente');
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Reservation[];
        } else {
            return null;
        }
    }
}


