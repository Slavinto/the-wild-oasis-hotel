export interface Cabin {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    imageUrl: string;
    image?: string;
}

export interface SupabaseCabin {
    id?: number;
    name: string;
    max_capacity: number;
    regular_price: number;
    discount: number;
    description: string;
    image_url: string;
}
