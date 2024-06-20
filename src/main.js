import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});
app.mount('#app');
