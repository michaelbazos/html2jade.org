import Vue from 'vue'
import VueCodemirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";

import App from './App.vue';

Vue.use(VueCodemirror);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')


