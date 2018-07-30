import Vue from 'vue'
import VueCodemirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";

import App from './App.vue';

Vue.use(VueCodemirror);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

console.log(pug.render(`
doctype html
html(lang='en')
  head
    title Jade
    script(type='text/javascript').
      const foo = true;
      let bar = function () {};
      if (foo) {
         bar(1 + 5)
      }
  body
    h1 Jade - node template engine
    #container.col
      p You are amazing
      p
        | Jade is a terse and simple
        | templating language with a
        | strong focus on performance
        | and powerful features.

`));
