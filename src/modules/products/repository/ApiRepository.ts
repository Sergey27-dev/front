import { Endpoints, ProductRepository } from './index.ts';
import { Product, ProductsList } from './types/Products.ts';
import { api } from '@src/lib/ky';
import { replaceUrlParams } from '@src/base/helpers/replaceUrlParams.ts';

export default class ApiRepository implements ProductRepository {
    public async list(): Promise<ProductsList> {
        return api.get(Endpoints.Products)
            .json<ProductsList>();
    }

    public async show(id: number): Promise<Product> {
        return api.get(replaceUrlParams(Endpoints.Product, {id: id}))
            .json<Product>();
    }
}
