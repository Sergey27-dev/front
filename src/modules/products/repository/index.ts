import ApiRepository from './ApiRepository.ts';
import { Product, ProductsList } from './types/Products.ts';

export interface ProductRepository {
    list(): Promise<ProductsList>;
    show(id: number): Promise<Product>;
    create(product: Product): Promise<Product>;
    update(product: Product): Promise<Product>
    delete(id: number): Promise<string>;
}

export enum Endpoints {
    Products = 'products',
    Product = 'products/:id'
}

export function useProductRepository(): ProductRepository {
    return new ApiRepository();
}
