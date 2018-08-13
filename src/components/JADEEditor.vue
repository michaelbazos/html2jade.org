<template>
  <div id="html-editor">
    <Editor :code="code" :options="options" @change="change"></Editor>
  </div>
</template>

<script>
import "codemirror/mode/pug/pug.js";

import Editor from "./Editor";

export default {
  name: "JADE-editor",
  props: {
    code: {
      type: String,
      default: `doctype html
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

`
    }
  },
  components: {
    Editor
  },
  data() {
    return {
      options: {
        mode: "text/x-pug"
      }
    };
  },
  methods: {
    change(newCode) {
      if (newCode != this.code) {
        this.$emit("change", newCode);
      }
    }
  }
};
</script>

