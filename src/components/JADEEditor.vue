<template>
  <div id="html-editor">
    <Editor :code="code" :options="options" @change="change" @focus="focus"></Editor>
  </div>
</template>

<script>
import "codemirror/mode/pug/pug.js";

import Editor from "./Editor";

export default {
  name: "JADE-editor",
  props: {
    code: {
      type: String
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
    },
    focus() {
      this.$emit("focus");
    }
  }
};
</script>

