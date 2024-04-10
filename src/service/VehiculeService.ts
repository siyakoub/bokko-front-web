import {Vehicule} from "../interface/VehiculeInterface/Vehicule";
import {AddVehicule} from "../interface/VehiculeInterface/AddVehicule";
import {UpdateVehicule} from "../interface/VehiculeInterface/UpdateVehicule";

const baseUrl : string = 'http://localhost:2001/api/bokko/service/vehicule';


export async function get(token: string, email: string) : Promise<Vehicule> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun Vehicule trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération du véhicule...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Vehicule;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function getAll(token: string, page: number, size: number) : Promise<Vehicule[]> {
    const response = await fetch(baseUrl + "/all?page=" + page.toString() + "&size=" + size.toString(), {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun véhicule trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de la liste des véhicule...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Vehicule[];
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function create(token: string, addVehicule: AddVehicule): Promise<Vehicule> {
    const response = await fetch(baseUrl + "/", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'token': token
        },
        body: JSON.stringify(addVehicule)
    });
    if (response.status === 404){
        throw new Error("Vehicule mal enregistré...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création du vehicule...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Vehicule;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function update(token: string, updatedVehicule: UpdateVehicule, email: string) : Promise<Vehicule> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json',
            'token': token
        },
        body: JSON.stringify(updatedVehicule)
    });
    if (response.status === 404) {
        throw new Error("Mise à jour du vehicule mal effectué...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour du vehicule...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Vehicule;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function deleteLastActifVehicule(token: string, email: string): Promise<any> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Erreur lors de la suppression...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression du vehicule...");
    } else {
        return true;
    }
}

export async function getAllByDriver(token: string, email: string) : Promise<Vehicule[]> {
    const response = await fetch(baseUrl + "/bydriver?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    });
    if (response.status == 404) {
        throw new Error("Erreur lors de la récupération...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération des vehicule du conducteur...")
    } else {
        const data = await response.json();
        console.log(data);
        if (data['hasError'] === false) {
            return data['content'] as Vehicule[];
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}


