export interface Game {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    // type: ValidTypes;
    hardware: 'xbox'|'playstation'|'nintendo'|'all'
}

export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';
export type ValidHardware = 'XBOX'|'X360'|'XONE'|'XSeries'|'PS2'|'PS3'|'PS4'|'PS5'|'WII'|'WIIU'|'SWITCH';
