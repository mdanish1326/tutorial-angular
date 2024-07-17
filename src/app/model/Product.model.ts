export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: {
        rate: number;
        count: number
    };
    category: string;
    image: string;
}