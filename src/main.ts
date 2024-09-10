import '@fontsource/roboto';
import './base/assets/scss/main.scss';
import './base/assets/scss/reset.scss';

import { createApp } from 'vue';
import App from './base/App.vue';
import { router } from './lib/router';
import pinia from './lib/pinia';
import { i18n } from './lib/i18n';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);

app.mount('#app');

export default app;
