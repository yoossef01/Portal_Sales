import { Description } from "./description";

export class TemplateContent {
    id:number;
    description:string;
    photo:string;
    text1:string;
    text2:string;
    vendeur:{id:number};
    constructor(id:number,description:string,photo:string,text1:string,text2:string,vendeur:{ id: number }){
        this.id=id;
        this.description=description;
        this.photo=photo;
        this.text1=text1;
        this.text2= text2;
        this.vendeur=vendeur;
    }
}
