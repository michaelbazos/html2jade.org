<template>
  <codemirror class="editor" v-model="code" :options="codeMirrorOptions"></codemirror>
</template>

<script>
import "codemirror/addon/selection/active-line.js";
import "codemirror/addon/edit/closetag.js";

export default {
  name: "editor",
  props: ["code", "options"],
  computed: {
    codeMirrorOptions() {
      return Object.assign(
        {
          tabSize: 2,
          lineNumbers: true,
          styleActiveLine: true,
          autoCloseTags: true,
          line: true
        },
        this.options
      );
    }
  }
};
</script>

<style>
.CodeMirror {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro",
    monospace;
  text-align: left;
}
</style>
