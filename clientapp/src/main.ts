import './scss/index.scss';

import './utils/icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { createApp } from 'vue';
import App from './components/App/App.vue';
import router from './router/router';

import { TooltipDirective } from './directives/TooltipDirective/TooltipDirective';

const app = createApp(App);

app.directive('tooltip', TooltipDirective);

app.use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
