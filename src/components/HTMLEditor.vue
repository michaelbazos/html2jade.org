<template>
  <div id="html-editor">
    <Editor :code="code" :options="options"></Editor>
  </div>
</template>

<script>
import Editor from "./Editor";
import "codemirror/mode/htmlmixed/htmlmixed.js";

export default {
  name: "HTML-editor",
  components: {
    Editor
  },
  data() {
    const code = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Jade</title>
    <script type="text/javascript">
      const foo = true;
      let bar = function () {};
      if (foo) {
        bar(1 + 5)
      }
    <\/script>
  </head>
  <body>
    <h1>Jade - node template engine</h1>
    <div id="container" class="col">
      <p>You are amazing</p>
      <p>Jade is a terse and simple
         templating language with a
         strong focus on performance
         and powerful features.</p>
    </div>
  </body>
</html>
`;
    return {
      code,
      options: {
        mode: "text/html"
      }
    };
  }
};
</script>

<style>
#html-editor {
}

.CodeMirror {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro",
    monospace;
  text-align: left;
}
</style>
