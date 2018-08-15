<template>
  <div id="app" class="container-fluid">
    <header class="row p-1">
      <div class="col-12 col-md-10 text-left">
        <div class="row align-items-end">
          <div class="col-12 col-md">
            <span class="logo">HTML to JADE/PUG</span>
            <span class="small ml-md-2 d-block d-md-inline">realtime online converter</span>
          </div>
          <!-- <div class="small col-md">realtime online converter</div> -->
        </div>
      </div>
      <div class="col-12 col-md-2 right">
        <div class="links"><a href="https://github.com/chenka/html2jade.org/issues/new">Report an issue</a></div>
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
import "./fonts.css";
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

      const html = this.HTMLCode.replace(/template/g, "template_");

      Html2Jade.convertHtml(html, options, (err, jade) => {
        let sanitizeJade = jade
          .replace(/\|\s+$/gm, "")
          .replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, "");
        if (isBodyless) {
          sanitizeJade = sanitizeJade.replace("head\n", "");
        }
        this.JADECode = sanitizeJade;
        this.JADECode = this.JADECode.replace(/template_/g, "template");
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
  padding: 0;
}

html, body, #app {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow: hidden;
}

header {
  font-weight: 700;
  color: white;
  background: #a86454;
}

a,
a:hover {
  color: white;
  font-weight: 400;
  text-decoration: white;
}

header .right {
  font-size: 14px;
  justify-content: flex-end;
  display: flex;
}

header .right .links {
  margin: 0;
  display: flex;
  align-items: flex-end;
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
  height: calc(100vh - 53px);
  overflow: hidden;
  font-size: 16px;
}

.editor-html {
  overflow: hidden;
  padding-right: 0;
}

.editor-jade {
  overflow: hidden;
  padding-left: 0;
  
}

.editor-jade .CodeMirror {
  background: rgba(0, 0, 0, .03)
}

.vue-codemirror{
  overflow: hidden;
}

.CodeMirror {
  height: 100% !important;
}

footer {
  color: white;
  background: #a86454;
}

@media (max-width: 575.98px) {
  header .logo {
    font-size: 28px;
  }

  .editor {
    border-bottom: 1px solid lightgray;
  }
}
</style>
