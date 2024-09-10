import { VueElement } from 'vue';

type DynamicImportModule<T> = () => Promise<T>;

declare module 'vue-router' {
    // noinspection JSUnusedGlobalSymbols
    interface RouteMeta {
        layoutComponent?: VueElement | DynamicImportModule<VueElement>;
        layoutComponentNormalized?: VueElement;
        isPublic?: boolean;
        hideForAuth?: boolean;
    }
}
