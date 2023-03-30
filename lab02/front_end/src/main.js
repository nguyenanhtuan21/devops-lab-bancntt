import { createApp } from 'vue'
import App from './App.vue'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import vClickOutsideUmd from 'click-outside-vue3'
import { getRouter } from './router'


// bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

const router = getRouter();

const app = createApp(App);

app.config.productionTip = false;

app.use(router);
app.use(ElementPlus);
app.use(VueAxios, axios);
app.use(vClickOutsideUmd)
app.mount('#app');
