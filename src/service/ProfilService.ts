import {Profil} from "../interface/ProfilInterface/Profil";
import {AddProfil} from "../interface/ProfilInterface/AddProfil";
import {ProfilRegister} from "../interface/ProfilInterface/ProfilRegister";

const baseUrl : string = 'http://localhost:2001/api/bokko/service/profil';

export async function getAll(token: string, page: number, size: number): Promise<Profil[]> {
    const response = await fetch(baseUrl + "/all?page="+ page.toString() +"&size=" + size.toString(), {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "token": token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun utilisateur trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de la liste des utilisateur...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data['content'] as Profil[];
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function get(token: string, email: string): Promise<Profil> {
    const response = await fetch(baseUrl + '/?email=' + email, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            "token": token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun profil trouvé avec ce token...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération du profil...")
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as Profil
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function create(token: string, email: string, addProfil: AddProfil): Promise<Profil> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Profil mail enregistré...")
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création")
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Profil;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function update(token: string, email: string, addProfil: AddProfil): Promise<Profil> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Profil mal mis à jour...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour du profil...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Profil;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function deleteProfil(token: string, email: string) : Promise<Profil> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Profil mal supprimé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression du profil...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Profil;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function register(profilRegister: ProfilRegister): Promise<Profil> {
    const response = await fetch(baseUrl + "/register", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(profilRegister)
    });
    if (response.status === 404) {
        throw new Error("Profil mal enregistré...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'enregistrement du nouveau profil...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as Profil;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}
