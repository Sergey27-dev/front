import {Endpoints, ProductRepository} from './index.ts';
import {Product, ProductsList} from './types/Products.ts';
import {api} from '@src/lib/ky';
import {replaceUrlParams} from '@src/base/helpers/replaceUrlParams.ts';

export default class ApiRepository implements ProductRepository {
    public async list(): Promise<ProductsList> {
        return api.get(Endpoints.Products)
            .json<ProductsList>();
    }

    public async show(id: number): Promise<Product> {
        return api.get(replaceUrlParams(Endpoints.Product, {id: id}))
            .json<Product>();
    }

    public async create(product: Product): Promise<Product> {
        return api.post(Endpoints.Products, {
            json: product,
        })
            .json<Product>();
    }

    public async update(product: Product): Promise<Product> {
        if (!product.id) {
            throw new Error('Id is not presented');
        }

        return api.put(replaceUrlParams(Endpoints.Product, {id: product.id}), {
            json: product,
        })
            .json<Product>();
    }

    public async delete(id: number): Promise<string> {
        return api.extend({
            retry: 0,
        }).delete(replaceUrlParams(Endpoints.Product, {id: id})).text();
    };
}
