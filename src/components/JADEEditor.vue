<template>
  <div id="html-editor">
    <Editor :code="code" :options="options"></Editor>
  </div>
</template>

<script>
import Editor from "./Editor";
import "codemirror/mode/pug/pug.js";

export default {
  name: "JADE-editor",
  components: {
    Editor
  },
  data() {
    const code = `doctype html
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

`;
    return {
      code,
      options: {
        mode: "text/x-pug"
      }
    };
  }
};
</script>

