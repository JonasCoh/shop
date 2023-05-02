export class CredentialsModel { 

    public userName:string;
    public password:string;

    constructor(credentials : CredentialsModel){
        this.userName = credentials.userName;
        this.password = credentials.password
    }
}
