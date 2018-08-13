<template>
  <div id="app" class="container-fluid">
    <header class="row p-1">
      <div class="col-6 text-left">
        <span class="logo">HTML to JADE/PUG</span>
        <span class="small ml-2">realtime online converter</span>
      </div>
      <div class="col-6">
      </div>
    </header>
    <section>
      <div class="row">
        <div class="col-12 col-md-6 editor editor-html">
          <HTMLEditor :code="HTMLCode" @change="HTMLChange" @focus="onFocus('html')"></HTMLEditor>
        </div>
        <div class="col-12 col-md-6 editor editor-jade">
          <JADEEditor :code="JADECode" @change="JADEChange" @focus="onFocus('jade')"></JADEEditor>
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
    return {
      JADECode: undefined,
      HTMLCode: undefined,
      editingCode: "",
      counter: 1
    };
  },
  methods: {
    findHTMLOrBodyTag(html) {
      return html.search(/<\/html>|<\/body>/) > -1;
    },
    onFocus(type) {
      this.editingCode = type;
    },
    JADEChange(newCode) {
      this.JADECode = newCode;
      if (this.JADECode) {
        this.HTMLCode = pug.render(this.JADECode, {
          pretty: true
        });
      }
    },
    HTMLChange(newCode) {
      this.HTMLCode = newCode;
      const isBodyless = !this.findHTMLOrBodyTag(this.HTMLCode);
      const options = {
        bodyless: isBodyless,
        donotencode: true
        // nspaces: getWideOfIndent()
      };

      Html2Jade.convertHtml(this.HTMLCode, options, (err, jade) => {
        let sanitizeJade = jade
          .replace(/\|\s+$/gm, "")
          .replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, "");
        if (isBodyless) {
          sanitizeJade = sanitizeJade.replace("head\n", "");
        }
        this.JADECode = sanitizeJade;
        // if (err) {
        //   throw new Error(err.toString());
        // }
        // asyncResultF);
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Arvo, Georgia, "Times New Roman", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  font-weight: 700;
  color: white;
  background: #a86454;
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

.editor {
  /* min-height: 500px; */
  height: 90vh;
  overflow: scroll;
  font-size: 16px;
}

footer {
  color: white;
  background: #a86454;
}
</style>
