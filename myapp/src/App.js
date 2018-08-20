import React, { Component } from 'react'
import { HTMLCode, JADECode } from './template'
import './App.css'
import './fonts.css'
import AceEditor from 'react-ace'

import 'brace/mode/html'
import 'brace/mode/xml'
import 'brace/mode/jade'
import 'brace/theme/eclipse'

class App extends Component {
  state = {
    HTMLCode,
    JADECode,
    tabSize: 2,
    useSoftTabs: true,
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
    const useSoftTabs = event.target.value === 'yes' ? true : false
    this.setState({ useSoftTabs })
  }

  onJADEChange = newCode => {
    this.setState({ JADECode: newCode })
    try {
      const HTMLCode = this.pug.render(newCode, { pretty: true })
      this.setState({ HTMLCode })
    } catch (error) {}
  }

  onTabSizeChange = event => {
    this.setState({ tabSize: parseInt(event.target.value, 10) })
  }

  findHTMLOrBodyTag = html => html.search(/<\/html>|<\/body>/) > -1

  updateJADE = () => {
    const { HTMLCode } = this.state
    const isBodyless = !this.findHTMLOrBodyTag(HTMLCode)
    const options = {
      bodyless: isBodyless,
      donotencode: true,
    }

    if (HTMLCode === '') {
      this.setState({ JADECode: '' })
      return
    }

    const html = HTMLCode.replace(/template/g, 'template_')
    this.Html2Jade.convertHtml(html, options, (err, jade) => {
      if (err) {
        return
      }
      let sanitizeJade = jade
        .replace(/\|\s+$/gm, '')
        .replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, '')
      if (isBodyless) {
        sanitizeJade = sanitizeJade.replace('head\n', '')
      }

      sanitizeJade = sanitizeJade.replace(/template_/g, 'template')
      this.setState({ JADECode: sanitizeJade })
      // if (err) {
      //   throw new Error(err.toString());
      // }
      // asyncResultF);
    })
  }
  render() {
    const { tabSize, useSoftTabs } = this.state
    const options = {
      showLineNumbers: false,
      showGutter: false,
      displayIndentGuides: false,
      printMargin: false,
      useSoftTabs,
      tabSize,
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
                    name="useSoftTabs"
                    value="yes"
                    checked={this.state.useSoftTabs}
                    onChange={this.onIndentTypeChange}
                  />
                  spaces
                </label>
                <label>
                  <input
                    type="radio"
                    name="useSoftTabs"
                    value="no"
                    checked={!this.state.useSoftTabs}
                    onChange={this.onIndentTypeChange}
                  />
                  tabs
                </label>
                <select
                  name="tabSize"
                  value={tabSize}
                  onChange={this.onTabSizeChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
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
              <AceEditor
                mode="html"
                theme="eclipse"
                name="ace-html"
                fontSize={16}
                value={this.state.HTMLCode}
                onChange={this.onHTMLChage}
                setOptions={options}
                editorProps={{ $blockScrolling: true }}
              />
            </div>
            <div className="col-12 col-md-6 editor editor-jade">
              <AceEditor
                mode="jade"
                theme="eclipse"
                name="ace-jade"
                fontSize={16}
                value={this.state.JADECode}
                onChange={this.onJADEChange}
                setOptions={options}
                editorProps={{ $blockScrolling: true }}
              />
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

export default App
