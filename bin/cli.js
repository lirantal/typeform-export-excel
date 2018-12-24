#!/usr/bin/env node
'use strict'

const arg = require('arg')
const debug = require('debug')('typeform-export-excel-cli')
const TypeformExportExcel = require(`${__dirname}/../index.js`)

const args = arg({
  '--help': Boolean,
  '--version': Boolean,
  '--apiKey': String,
  '--formId': String,
  '--filename': String,
  '--author': String,
  '-v': '--version',
  '-h': '--help',
  '-f': '--filename'
})

const apiKey = args['--apiKey'] || process.env.TYPEFORM_API_KEY
debug(`parsed apiKey: ${apiKey.substr(0, 5)}`)

const formId = args['--formId'] || process.env.TYPEFORM_FORM_ID
debug(`parsed formId: ${formId}`)

const fileName = args['--filename'] || 'typeform-export-excel.xlsx'
debug(`parsed filename: ${fileName}`)

if (!apiKey || !formId) {
  console.error('Error: Please provide both apiKey and formId')
}

const typeformToExcel = new TypeformExportExcel({
  credentials: {
    apiKey: apiKey
  },
  workbookConfig: {
    creator: args['--author'] || 'anonymous',
    date: new Date()
  }
})

typeformToExcel
  .createWorkbookFromForm(formId)
  .then(() => {
    return typeformToExcel.writeToFile({
      filename: fileName
    })
  })
  .then(() => {
    debug(`Successfully exported: ${fileName}`)
  })
  .catch(error => {
    console.error(`Error: ${error.message}`)
    debug(error.stack)
  })
