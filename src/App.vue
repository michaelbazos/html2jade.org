<template>
  <div id="app">
    <header class="row">
      <div class="col">
        <span class="logo">HTML to JADE/PUG</span>
      </div>
      <div class="col">
        <span class="small ml-4">realtime online converter</span>
      </div>

    </header>
    <section>
      <div class="row">
        <div class="col-12 col-md-6 editor-html">
          <HTMLEditor v-model="htmlCode" :options="htmlOptions"></HTMLEditor>

        </div>
        <div class="col-12 col-md-6 editor-jade">
          <codemirror v-model="jadeCode"></codemirror>
        </div>
      </div>
        <!-- <codemirror v-model="code" :options="cmOptions"></codemirror> -->
    </section>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import "codemirror/mode/xml/xml.js";
import HTMLEditor from "./components/HTMLEditor.vue";
export default {
  name: "app",
  components: {
    HTMLEditor
  },
  data() {
    return {
      htmlCode: "aabc",
      jadeCode: "",
      htmlOptions: {
        // codemirror options
        tabSize: 2,
        mode: "text/html",
        theme: "base16-dark",
        // theme: "ambiance",
        styleActiveLine: true,
        autoCloseTags: true,
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    };
  }
};
</script>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  font-family: Arvo, Georgia, "Times New Roman", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

header {
  font-weight: 700;
  color: white;
  background: #a86454;
  /* border-bottom: 2px solid #a1a1a1;
  box-shadow: 0 1px 1px black; */
}

header .logo {
  font-size: 30px;
}

header .small {
  font-size: 20px;
}

.img-logo {
  width: 110px;
}

.CodeMirror {
  /* background: red; */
}
</style>
