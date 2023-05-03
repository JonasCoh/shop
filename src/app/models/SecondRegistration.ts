export class SecondRegistration {

    public firstName: string;
     public lastName: string;
      public city: string;
       public street: string;
        public isAdmin?: boolean = false
    constructor(secondregistration : SecondRegistration) {

        this.firstName = secondregistration.firstName;
        this.lastName = secondregistration.lastName;
        this.city = secondregistration.city;
        this.street = secondregistration.street;


    }
}
