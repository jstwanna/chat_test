import { createApp } from 'vue';
import './index.css';
import App from './components/App/App.vue';
import router from './router/router';

const app = createApp(App);

app.use(router).mount('#app');
