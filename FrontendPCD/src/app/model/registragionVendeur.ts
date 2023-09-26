export class RegistrationVendeur {
    id:number
    name:string
    email:string
    phonenumber:string
    password:string
    constructor(id: number, name: string, email: string, phonenumber: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phonenumber = phonenumber;
        this.password = password;
      }
}
