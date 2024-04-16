export interface UpdateTrajet {
    userDTO : {
        name: string,
        firstName: string,
        email: string,
        phoneNumber: string,
        statut: string,
        id: number
    },
    depart: string,
    arrivee: string,
    dateHeureDepart: string,
    nbPlaces: number,
    prix: number,
    statut: string,
    id: number
}
