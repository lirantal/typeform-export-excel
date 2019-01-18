<p align="center"><h1 align="center">
  typeform-export-excel
</h1>

<p align="center">
  Export a Typeform survey questionnaire to an Excel format
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/typeform-export-excel"><img src="https://badgen.net/npm/v/typeform-export-excel"alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/typeform-export-excel"><img src="https://badgen.net/npm/license/typeform-export-excel"alt="license"/></a>
  <a href="https://www.npmjs.org/package/typeform-export-excel"><img src="https://badgen.net/npm/dt/typeform-export-excel"alt="downloads"/></a>
  <a href="https://travis-ci.org/lirantal/typeform-export-excel"><img src="https://badgen.net/travis/lirantal/typeform-export-excel" alt="build"/></a>
  <a href="https://github.com/saojs/awesome-sao"><img src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg" alt="Awesome"/></a>
  <a href="https://snyk.io/test/github/lirantal/typeform-export-excel"><img src="https://snyk.io/test/github/lirantal/typeform-export-excel/badge.svg" alt="Known Vulnerabilities"/></a>
</p>

# About

This library exports a Typeform survey to an Excel file with already aggregated results for all questions and their answers, and includes a tiny CLI helper to do this from command-line.

Benefits over Typeform's CSV export:

- **Organized data**: Each question is represented in its own worksheet.
- **De-normalized**: Each question has all the aggregated answers counts already present in the worksheet in an organized manner.
- **Graph-ready**: Data points are presented in a table structure allowing you to easily create a graph out of it.

## Install

```bash
npm install typeform-export-excel
```

## Usage (Library)

```js
const TypeformExportExcel = require('typeform-export-excel')

// NEVER EVER STORE SENSITIVE DATA IN YOUR SOURCE CODE
// THIS IS JUST FOR THE SAKE OF EXAMPLE AND BREVITY
const apiKey = '1234'
const formId = 'Pdi981'

const typeformToExcel = new TypeformExportExcel({
  credentials: {
    apiKey: apiKey
  },
  workbookConfig: {
    creator: 'Liran',
    date: new Date()
  }
})

typeformToExcel
  .createWorkbookFromForm(formId)
  .then(() => {
    return typeformToExcel.writeToFile({
      filename: 'out.xlsx'
    })
  })
  .then(() => {
    debug(`Successfully exported: ${fileName}`)
  })
  .catch(error => {
    console.error(`Error: ${error.message}`)
    debug(error.stack)
  })
```

## Usage (CLI)

Once installed, a binary named `typeform-export-excel` will be available on the path.

Example:

```bash
$ typeform-export-excel --apiKey 1234 --formId Pdi981 --filename survey-results.xlsx --author Liran
```

# Related

- [typeform-client](https://github.com/lirantal/typeform-client)

# Contributing

Please consult [CONTIRBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**typeform-export-excel** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.<br>
