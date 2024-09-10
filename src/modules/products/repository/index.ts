import ApiRepository from './ApiRepository.ts';
import { Product, ProductsList } from './types/Products.ts';

export interface ProductRepository {
    list(): Promise<ProductsList>;
    show(id: number): Promise<Product>;
}

export enum Endpoints {
    Products = 'products',
    Product = 'product/:id'
}

export function useProductRepository(): ProductRepository {
    return new ApiRepository();
}
