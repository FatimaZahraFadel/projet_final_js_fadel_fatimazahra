import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'swiper/swiper-bundle.css';
import '@coreui/coreui/dist/css/coreui.min.css'
import './index.css'

createApp(App).use(router).mount('#app')
