import React, { Component } from 'react'
import CodeMirror from 'react-codemirror'
import { HTMLCode, JADECode } from './template'
import './App.css'
import './fonts.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/pug/pug.js'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/edit/closetag.js'
import 'codemirror/lib/codemirror.css'

class App extends Component {
  state = {
    HTMLCode,
    JADECode,
    indentWidth: 2,
    indentWithTabs: false,
  }

  constructor() {
    super()
    this.Html2Jade = window.Html2Jade
    this.pug = window.pug
  }

  onHTMLChage = newCode => {
    this.setState({ HTMLCode: newCode })
    this.updateJADE()
  }

  onIndentTypeChange = event => {
    const indentWithTabs = event.target.value === 'yes' ? true : false
    this.setState({ indentWithTabs })
  }

  onJADEChange = newCode => {
    const editorHTML = this.editorHTML.getCodeMirror()
    this.setState({ JADECode: newCode })

    const HTMLCode = this.pug.render(newCode, { pretty: true })
    editorHTML.setValue(HTMLCode)
    this.setState({ HTMLCode })
  }

  onIndentWidthChange = event => {
    this.setState({ indentWidth: parseInt(event.target.value) })
  }

  setEditorOption(key, value) {
    this.editorHTML.getCodeMirror().setOption(key, value)
    this.editorJADE.getCodeMirror().setOption(key, value)
  }

  findHTMLOrBodyTag = html => html.search(/<\/html>|<\/body>/) > -1

  updateJADE = () => {
    const { HTMLCode } = this.state
    const isBodyless = !this.findHTMLOrBodyTag(HTMLCode)
    const options = {
      bodyless: isBodyless,
      donotencode: true,
    }
    const editorJADE = this.editorJADE.getCodeMirror()

    if (HTMLCode === '') {
      editorJADE.setValue('')
      return
    }

    const html = HTMLCode.replace(/template/g, 'template_')
    this.Html2Jade.convertHtml(html, options, (err, jade) => {
      let sanitizeJade = jade
        .replace(/\|\s+$/gm, '')
        .replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '')
      if (isBodyless) {
        sanitizeJade = sanitizeJade.replace('head\n', '')
      }

      sanitizeJade = sanitizeJade.replace(/template_/g, 'template')
      editorJADE.setValue(sanitizeJade)
      // console.log(sanitizeJade)
      // this.setState({ JADECode: sanitizeJade })
      // if (err) {
      //   throw new Error(err.toString());
      // }
      // asyncResultF);
    })
  }

  render() {
    const options = {
      styleActiveLine: true,
      autoCloseTags: true,
      line: true,
      // indentWithTabs: this.state.indentWithTabs,
      indentWithTabs: false,
      // tabSize: this.state.indentWidth,
      indentUnit: this.state.indentWidth,
    }

    return (
      <React.Fragment>
        <header className="row p-1">
          <div className="col-12 col-md-10 text-left">
            <div className="row align-items-end">
              <div className="col-12 col-md">
                <span className="logo">HTML to JADE/PUG</span>
                <span className="small ml-md-2 d-block d-md-inline">
                  realtime online converter
                </span>
              </div>
              <div className="col-md setting">
                <label>
                  <input
                    type="radio"
                    name="indentWithTabs"
                    value="no"
                    checked={!this.state.indentWithTabs}
                    onChange={this.onIndentTypeChange}
                  />
                  spaces
                </label>
                <label>
                  <input
                    type="radio"
                    name="indentWithTabs"
                    value="yes"
                    checked={this.state.indentWithTabs}
                    onChange={this.onIndentTypeChange}
                  />
                  tabs
                </label>
                <select name="indentWidth" onChange={this.onIndentWidthChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="20">20</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                width of indent
              </div>
            </div>
          </div>
          <div className="col-12 col-md-2 right">
            <div className="links">
              <a href="https://github.com/chenka/html2jade.org/issues/new">
                Report an issue
              </a>
            </div>
          </div>
        </header>
        <section>
          <div className="row">
            <div className="col-12 col-md-6 editor editor-html">
              <CodeMirror
                ref={element => (this.editorHTML = element)}
                value={this.state.HTMLCode}
                onChange={this.onHTMLChage}
                options={{ mode: 'text/html', ...options }}
              />
            </div>
            <div className="col-12 col-md-6 editor editor-jade">
              <CodeMirror
                ref={element => (this.editorJADE = element)}
                value={this.state.JADECode}
                onChange={this.onJADEChange}
                options={{ mode: 'text/x-pug', ...options }}
              />
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default App
