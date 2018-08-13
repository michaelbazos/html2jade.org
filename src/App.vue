<template>
  <div id="app" class="container-fluid">
    <h1 @click="increment">+ Increment</h1>
    <CounterViewer :counter="counter"></CounterViewer>
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
          <!-- <HTMLEditor :code="mutableHTMLCode" @change="HTMLChange"></HTMLEditor> -->
          <HTMLEditor :code="HTMLCode" @change="HTMLChange"></HTMLEditor>
        </div>
        <div class="col-12 col-md-6 editor-jade">
          <JADEEditor :code="JADECode" @change="JADEChange"></JADEEditor>
          <!-- <JADEEditor :code="mutableJADECode"></JADEEditor> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "codemirror/mode/xml/xml.js";
import HTMLEditor from "./components/HTMLEditor.vue";
import JADEEditor from "./components/JADEEditor.vue";
import CounterViewer from "./components/CounterViewer.vue";
export default {
  name: "app",
  components: {
    HTMLEditor,
    JADEEditor,
    CounterViewer
  },
  data() {
    return {
      JADECode: undefined,
      HTMLCode: undefined,
      counter: 1
    };
  },
  methods: {
    findHTMLOrBodyTag(html) {
      return html.search(/<\/html>|<\/body>/) > -1;
    },
    JADEChange(newCode) {
      // console.log(newCode);
      this.JADECode = newCode;
      // console.log(this.JADECode);

      // if (this.JADECode) {
      //   this.HTMLCode = pug.render(this.JADECode, {
      //     pretty: true
      //   });
      // }
    },
    HTMLChange(newCode) {
      this.HTMLCode = newCode;
      const isBodyless = !this.findHTMLOrBodyTag(this.HTMLCode);
      const options = {
        bodyless: isBodyless,
        donotencode: true
        // nspaces: getWideOfIndent()
      };
      console.log(options);

      Html2Jade.convertHtml(this.HTMLCode, options, (err, jade) => {
        console.log(err);
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
    },
    increment() {
      this.counter = this.counter + 1;
    }
  },
  computed: {
    // mutableHTMLCode() {
    //   // console.log("test");
    //   return undefined;
    //   if (this.JADECode) {
    //     try {
    //       return pug.render(this.JADECode, {
    //         pretty: true
    //       });
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // },
    // mutableJADECode() {
    //   // this.mutableJADECode = "xxx";
    //   // return;
    //   Html2Jade.convertHtml(this.HTMLCode, null, (err, ret) => {
    //     console.log(err);
    //     // this.mutableJADECode;
    //     this.JADECode = ret;
    //     // if (err) {
    //     //   throw new Error(err.toString());
    //     // }
    //     // asyncResultF);
    //   });
    //   return undefined;
    // }
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
</style>
