import {User} from "../interface/UserInterface/User";
import {AddUser} from "../interface/UserInterface/AddUser";
import {UserLogin} from "../interface/UserInterface/UserLogin";

const baseUrl : string = 'http://localhost:2001/api/bokko/service/user';
// const baseUrl : string = 'http://35.203.45.227:2001/api/bokko/service/user';
// pour la prod

export async function getAll(token: string, page: number, size: number): Promise<User[]> {
    const response = await fetch(baseUrl + "/all?page="+ page.toString() +"&size=" + size.toString(), {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun utilisateur trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de la liste des utilisateurs...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false){
            return data['content'] as User[];
        } else {
            throw new Error(data['errorMessage'])
        }
    }
}

export async function get(token: string, email: string): Promise<User> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error("Aucun utilisateur trouvé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la récupération de l'utilisateur...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as User;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function create(user: AddUser, token: string) : Promise<User> {
    const response = await fetch(baseUrl + "/", {
        method: 'POST',
        headers: {
            "Content-application": 'application/json',
            "token": token
        },
        body: JSON.stringify(user)
    });
    if (response.status === 404) {
        throw new Error("Enregistrement mal effectué...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la création de l'utilisateur...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data['content'] as User;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function update(updatedUser: AddUser, token: string, email: string) : Promise<User> {
    const response = await fetch(baseUrl + "/?email=" + email, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json",
            "token": token
        },
        body: JSON.stringify(updatedUser)
    });
    if (response.status === 404) {
        throw new Error("Mise à jour mal enregistré...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de mise à jour de l'utilisateur...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as User;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function deleteUser(token: string, email: string) : Promise<User> {
    const response = await fetch(baseUrl + '/?email=' + email, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
            "token": token
        }
    });
    if (response.status === 404) {
        throw new Error("Utilisateur mal supprimé...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression de l'utilisateur...");
    } else {
        const data = await response.json();
        if (data["hasError"] === false) {
            return data["content"] as User;
        } else {
            throw new Error(data["errorMessage"]);
        }
    }
}

export async function login(loginUser: UserLogin) : Promise<User> {
    const response = await fetch(baseUrl + '/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(loginUser)
    });
    if (response.status === 404) {
        throw new Error("Identifiant ou mot de passe incorrect...");
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la connexion utilisateur...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as User;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}

export async function logout(token: string): Promise<boolean> {
    const response = await fetch(baseUrl + '/logout', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'token': token
        }
    });
    if (response.status === 404) {
        throw new Error('Token incorrect...');
    } else if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la déconnexion utilisateur...");
    } else {
        const data = await response.json();
        if (data['hasError'] === false) {
            return data['content'] as boolean;
        } else {
            throw new Error(data['errorMessage']);
        }
    }
}
