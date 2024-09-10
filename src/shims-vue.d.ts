declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<object, object, unknown>;
    // noinspection JSUnusedGlobalSymbols
    export default component;
}
