export interface Cabin {
    id?: number;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    imageUrl: string;
    // is being added to cabin on create cabin form submit
    image: File | null;
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
