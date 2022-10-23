export interface Bar {
    nuis: string;
    businessName: string;
    logo: string;
    categories: Category[];
}
export interface Category {
    id: number;
    name: string;
    products: Product[];
}
export interface Product {
    name: string;
    unitPrice: number;
    backgroundColor?:string;
}
export interface OrderedProduct {
    name: string;
    price: number;
    quantity: number;
}



