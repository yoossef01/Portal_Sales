export class Description {
    id: string;
    material: string;
    color: string;
    shortDescription: string;
    longDescription: string;
    product: {id:string};

    constructor(id: string, material: string, color: string, shortDescription: string, longDescription: string, product: { id: string }) {
        this.id = id;
        this.material = material;
        this.color = color;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.product = product;
      }
}
