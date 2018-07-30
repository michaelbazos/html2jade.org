<template>
  <div id="app" class="container-fluid">
    <header class="row">
      <div class="col-6">
        <span class="logo">HTML to JADE/PUG</span>
      </div>
      <div class="col-6">
        <span class="small ml-4">realtime online converter</span>
      </div>
    </header>
    <section>
      <div class="row">
        <div class="col-12 col-md-6 editor-html">
          <HTMLEditor></HTMLEditor>
        </div>
        <div class="col-12 col-md-6 editor-jade">
          <JADEEditor></JADEEditor>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "codemirror/mode/xml/xml.js";
import HTMLEditor from "./components/HTMLEditor.vue";
import JADEEditor from "./components/JADEEditor.vue";
export default {
  name: "app",
  components: {
    HTMLEditor,
    JADEEditor
  },
  data() {
    return {};
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
</style>
