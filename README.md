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
  <a href="https://snyk.io/test/github/lirantal/typeform-export-excel"><img src="https://snyk.io/test/github/lirantal/typeform-export-excel/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Security Responsible Disclosure"/></a>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/316371/50742434-ca58b300-1213-11e9-866a-b2508e48edff.png" />
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
      filename: 'out.xlsx',
      isDated: true
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

The following is supported command line arguments:

| Option Name | Option Value | Description                                                                       |
| ----------- | ------------ | --------------------------------------------------------------------------------- |
| --apiKey    | 1234         | typeform's api key, for example: `--apiKey 1234`                                  |
| --formId    | Pdi981       | the relevant form id, usually shows up in the URL, for example: `--formId Pdi981` |
| --filename  | out.xlsx     | the filename to create and write to, for example: `--filename out.xlsx`           |
| --dated     |              | (optional) the argument for adding export date to filename, for example: `--dated`|


Example:

```bash
$ typeform-export-excel --apiKey 1234 --formId Pdi981 --filename survey-results.xlsx --author Liran
```

# Related

[@lirantal/typeform-client](https://github.com/lirantal/typeform-client) - A friendlier Typeform Node.js API client

# Contributing

Please consult [CONTIRBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**typeform-export-excel** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.
