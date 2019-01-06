<p align="center">
  <h1 align="center"> typeform-export-client </h1>
</p>

<p align="center">
  Export a Typeform survey questionnaire to an Excel format
</p>

<p align="center">

<a href="https://www.npmjs.org/package/typeform-export-excel">
 <img src="https://badgen.net/npm/v/typeform-export-excel"
      alt="npm version"/></a>

<a href="https://www.npmjs.org/package/typeform-export-excel">
 <img src="https://badgen.net/npm/license/typeform-export-excel"
      alt="license"/></a>

<a href="https://www.npmjs.org/package/typeform-export-excel">
 <img src="https://badgen.net/npm/dt/typeform-export-excel"
      alt="downloads"/></a>

<a href="https://travis-ci.org/lirantal/typeform-export-excel">
 <img src="https://badgen.net/travis/lirantal/typeform-export-excel"
      alt="build"/></a>

<a href="https://codecov.io/gh/lirantal/typeform-export-excel">
 <img src="https://badgen.net/codecov/c/github/lirantal/typeform-export-excel"
      alt="codecov"/></a>

<a href="https://snyk.io/test/github/lirantal/typeform-export-excel">
 <img src="https://snyk.io/test/github/lirantal/typeform-export-excel/badge.svg"
      alt="known vulnerabilities"/></a>

<a href="https://github.com/semantic-release/semantic-release">
 <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat"
      alt="semantic-release"/></a>

<a href="https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md">
 <img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg"
      alt="Security Responsible Disclosure"/></a>
</p>

# About

This library exports a Typeform survey to an already aggregated results Excel file, and includes a tiny CLI helper to do this from command-line

Benefits over Typeform's CSV export:

- **Organized data**: Each question is represented in its own worksheet.
- **De-normalized**: Each question has all the aggregated answers counts already present in the worksheet in an organized manner.
- **Graph-ready**: Data points are presented in a table structure allowing you to easily create a graph out of it.

# Install

```bash
npm install typeform-export-excel
```

# Example (Library)

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

# Example (CLI)

Once installed, a binary named `typeform-export-excel` will be available on the path.

Example:

```bash
$ typeform-export-excel --apiKey 1234 --formId Pdi981 --filename survey-results.xlsx --author Liran
```

# Contributing

## Commit Guidelines

The project uses the commitizen tool for standardizing changelog style commit
messages so you should follow it as so:

```bash
git add .           # add files to staging
npm run commit      # use the wizard for the commit message
```


# Related 

[@lirantal/typeform-client](https://github.com/lirantal/typeform-client) - A friendlier Typeform Node.js API client

# Author
Liran Tal <liran.tal@gmail.com>
