export interface UserJson {
    firstname: string;
    lastname: string;
    username: string;
}

export default class User implements UserJson {
    firstname: string;
    lastname: string;
    username: string;

    constructor(json: UserJson) {
        this.firstname = json.firstname;
        this.lastname = json.lastname;
        this.username = json.username;
    }

    toJson(): UserJson {
        return {...this};
    }

    getFullName() {
        return this.firstname + " " + this.lastname;
    }
}
