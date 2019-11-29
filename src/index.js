'use strict'

const Excel = require('exceljs')
const debug = require('debug')('typeform-export-excel')
const {Form} = require('@lirantal/typeform-client')
const {HEADER_NAME, HEADER_WIDTH, HEADER_STYLE, WORKSHEET_COLOR} = require('./constants')
const utils = require('./utils')

const WORKSHEET_NAME_CHAR_LIMIT = 64

module.exports = class TypeformExportExcel {
  constructor({credentials, workbookConfig = {}, options = {}}) {
    this.credentials = credentials
    this.workbookConfig = workbookConfig
    this.options = {
      answersLimit: options.answersLimit || process.env.TYPEFORM_PROCESS_ANSWERS_LIMIT
    }

    this.workbook = this._initializeWorkbook(workbookConfig)
  }

  _initializeWorkbook(workbookConfig = {}) {
    const workbook = new Excel.Workbook()

    workbook.creator = workbookConfig.creator
    workbook.lastModifiedBy = workbookConfig.creator
    workbook.created = workbookConfig.date || new Date()
    workbook.modified = workbookConfig.date || new Date()

    return workbook
  }

  async createWorkbookFromForm(formId) {
    const typeformClient = new Form({apiKey: this.credentials.apiKey})
    const form = await typeformClient.fetchFormResponses(formId)
    return this.createWorkbook(form)
  }

  _getColumnHeaderValue(headerKey, questionData) {
    let headerInfo = {
      name: HEADER_NAME[headerKey],
      width: HEADER_WIDTH[headerKey],
      style: HEADER_STYLE[headerKey]
    }

    if (
      this.workbookConfig.columnHeaders &&
      this.workbookConfig.columnHeaders[headerKey] &&
      typeof this.workbookConfig.columnHeaders[headerKey] === 'object'
    ) {
      headerInfo.name = this.workbookConfig.columnHeaders[headerKey].name
      headerInfo.width = this.workbookConfig.columnHeaders[headerKey].width
      headerInfo.style = this.workbookConfig.columnHeaders[headerKey].style
    }

    return headerInfo
  }

  createWorkbook(form) {
    if (!form || !form.fields || typeof form.fields !== 'object') {
      throw new Error('Expected valid form object representation having a `fields` array')
    }

    for (const [questionRef, questionData] of Object.entries(form.fields)) {
      this._createSingleWorksheet({questionRef, questionData, form})

      if (this.options.answersLimit) {
        debug(`detected answers processing limit of ${this.answersLimit}`)
        this.options.answersLimit--
        if (this.options.answersLimit <= 0) {
          debug(`breaking out of processing question worksheets after answersLimit reached`)
          break
        }
      }
    }
  }

  _createSingleWorksheet({questionData}) {
    let worksheetName = this._getWorksheetName(questionData)
    let worksheet
    try {
      worksheet = this.workbook.addWorksheet(worksheetName, {
        properties: {
          tabColor: {
            argb: this._getWorksheetColor()
          }
        }
      })
    } catch (error) {
      if (error.message.match('Worksheet name already exists')) {
        worksheetName = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`

        worksheet = this.workbook.addWorksheet(worksheetName, {
          properties: {
            tabColor: {
              argb: this._getWorksheetColor()
            }
          }
        })
      }
    }

    this._populateWorksheetHeaders(worksheet, questionData)
    this._populateWorksheetMetadata(worksheet, questionData)
    this._populateWorksheetResponses(worksheet, questionData)
    this._populateWorksheetOtherResponses(worksheet, questionData)
  }

  _getWorksheetName(questionData) {
    return questionData.title.substring(0, WORKSHEET_NAME_CHAR_LIMIT - 1)
  }

  _getWorksheetColor() {
    return WORKSHEET_COLOR
  }

  _populateWorksheetHeaders(worksheet, questionData) {
    worksheet.columns = this._getColumnHeaders(questionData)
  }

  _getColumnHeaders(questionData = {}) {
    const columnHeadersConfig = [
      'metaKey',
      'metaValue',
      'answer',
      'response',
      'percentage',
      'other'
    ].map(headerKey => {
      const headerInfo = this._getColumnHeaderValue(headerKey, questionData)

      return {
        header: headerInfo.name,
        key: headerKey,
        width: headerInfo.width,
        style: headerInfo.style
      }
    })

    return columnHeadersConfig
  }

  _populateWorksheetMetadata(worksheet, questionData) {
    const columnsData = [
      {
        metaKey: 'Question',
        metaValue: questionData.title
      },
      {
        metaKey: 'Type',
        metaValue: questionData.type
      },
      {
        metaKey: 'Question ID',
        metaValue: questionData.id
      },
      {
        metaKey: 'Question Ref',
        metaValue: questionData.ref
      },
      {
        metaKey: 'Allow multiple selection?',
        metaValue:
          questionData.properties && questionData.properties.allow_multiple_selection ? 'yes' : 'no'
      },
      {
        metaKey: 'Allow other value?',
        metaValue:
          questionData.properties && questionData.properties.allow_multiple_selection ? 'yes' : 'no'
      }
    ]

    const metadataRowOffeset = 2
    columnsData.forEach((metadataRow, index) => {
      for (const [rowKey, rowValue] of Object.entries(metadataRow)) {
        worksheet.getRow(index + metadataRowOffeset).getCell(rowKey).value = rowValue
      }
    })
  }

  _populateWorksheetResponses(worksheet, questionData) {
    const responsesData = this._getResponsesCalculatedData(questionData)
    const responsesRowOffset = 2

    responsesData.forEach((responseDataRow, index) => {
      for (const [rowKey, rowValue] of Object.entries(responseDataRow)) {
        worksheet.getRow(index + responsesRowOffset).getCell(rowKey).value = rowValue
      }
    })
  }

  _getResponsesCalculatedData(questionData) {
    const responseData = []
    for (const [answerValue, answerData] of Object.entries(questionData.answers)) {
      let calcResponsePercentage = 0
      if (
        Number.isInteger(questionData.totalRespondents) &&
        questionData.totalRespondents > 0 &&
        Number.isInteger(answerData.length)
      ) {
        calcResponsePercentage = Number.parseFloat(
          answerData.length / questionData.totalRespondents * 100
        )
      }

      responseData.push({
        answer: answerValue,
        response: answerData.length,
        percentage: `${calcResponsePercentage.toFixed(1)}%`
      })
    }

    return responseData
  }

  _getResponsesOtherData(questionData) {
    if (
      questionData.answers &&
      Array.isArray(questionData.answers['other']) &&
      questionData.answers['other'].length > 0
    ) {
      return Object.values(questionData.answers['other'])
    } else {
      return []
    }
  }

  _populateWorksheetOtherResponses(worksheet, questionData) {
    const responsesOtherData = this._getResponsesOtherData(questionData)
    const responsesOtherRowOffset = 2
    responsesOtherData.forEach((otherAnswer, index) => {
      worksheet.getRow(index + responsesOtherRowOffset).getCell('other').value = otherAnswer.data
    })
  }

  async writeToFile({filename, isDated}) {
    try {
      const finalFileName = isDated ? this._addDateInFileName(filename, new Date()) : filename
      // eslint-disable-next-line
      await this.workbook.xlsx.writeFile(finalFileName)
    } catch (err) {
      debug(err)
      throw err
    }
  }

  _addDateInFileName(filename, date) {
    return utils.insertString(
      filename,
      '_' + utils.getFormattedDate(date, 'YYYY-MM-DD--HH-mm-ss'),
      filename.lastIndexOf('.')
    )
  }
}
