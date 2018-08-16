<template>
  <div id="html-editor">
    <Editor :code="code" :options="extendOptions" @change="change" @focus="focus"></Editor>
  </div>
</template>

<script>
import Editor from "./Editor";
import "codemirror/mode/htmlmixed/htmlmixed.js";

export default {
  name: "HTML-editor",
  props: {
    code: {
      type: String
    },
    options: {
      // type: Object
    }
  },
  components: {
    Editor
  },
  data() {
    console.log(this.options);

    return {
      extendOptions: {
        mode: "text/html",
        // ...this.options
        indentUnit: this.options
      }
    };
  },
  methods: {
    change(newCode) {
      this.extendOptions = {
        modef: "text/js"
      };
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
