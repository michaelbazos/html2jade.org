<template>
  <div id="html-editor">
    <Editor :code="mutableCode" :options="options" @change="change"></Editor>
  </div>
</template>

<script>
import Editor from "./Editor";
import "codemirror/mode/htmlmixed/htmlmixed.js";

export default {
  name: "HTML-editor",
  computed: {
    mutableCode() {
      return this.code;
    }
  },
  props: {
    code: {
      type: String,
      default: `<!DOCTYPE html>
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
    <div class="col" id="container">
      <p>You are amazing</p>
      <p>
        Jade is a terse and simple
        templating language with a
        strong focus on performance
        and powerful features.
      </p>
    </div>
  </body>
</html>
`
    }
  },
  components: {
    Editor
  },
  data() {
    return {
      // code,
      options: {
        mode: "text/html"
      }
    };
  },
  methods: {
    change(newCode) {
      this.$emit("change", newCode);
    }
  }
};
</script>
