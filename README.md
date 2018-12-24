[![Security Responsible Disclosure](https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg)](https://github.com/nodejs/security-wg/blob/master/processes/responsible_disclosure_template.md)

# About

This library exports a Typeform survey to an already aggregated results Excel file, and includes a tiny CLI helper to do this from command-line

Benefits over Typeform's CSV export:

- **Organized data**: Each question is represented in its own worksheet.
- **De-normalized**: Each question has all the aggregated answers counts already present in the worksheet in an organized manner.
- **Graph-ready**: Data points are presented in a table structure allowing you to easily create a graph out of it.

## Installation

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

## Tests

Project tests:

```bash
npm run test
```

Project linting:

```bash
npm run lint
```

## Coverage

```bash
npm run test:coverage
```

## Contributing

### Commit Guidelines

The project uses the commitizen tool for standardizing changelog style commit
messages so you should follow it as so:

```bash
git add .           # add files to staging
npm run commit      # use the wizard for the commit message
```
