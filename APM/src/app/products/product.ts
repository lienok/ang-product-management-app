export interface IProduct {
    id: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    price: number;
    tags?:string[];
    description: string;
    starRating: number;
    imageUrl: string;
  }
  