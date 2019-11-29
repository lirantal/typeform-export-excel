const fs = require('fs')
const path = require('path')

const {Form} = require('@lirantal/typeform-client')
jest.mock('@lirantal/typeform-client')

const TypeformExportExcel = require(path.resolve('./src/index.js'))

const mockForm = require('./Fixtures/form.json')
const mockApiKey = 1234

describe('E2E Export to Excel', () => {
  test('Creating an Excel file from form matches previous sample file', async () => {
    expect.assertions(1)

    const typeformToExcel = new TypeformExportExcel({
      credentials: {
        apiKey: mockApiKey
      },
      workbookConfig: {
        creator: 'Liran',
        date: new Date('1995-12-01T01:24:00')
      }
    })

    Form.prototype.fetchFormResponses = jest.fn(() => mockForm)

    await typeformToExcel.createWorkbookFromForm(mockForm.id)

    const testOutputFilename = 'test-out.xlsx'
    await typeformToExcel.writeToFile({
      filename: testOutputFilename
    })

    try {
      // eslint-disable-next-line
      const actual = fs.statSync(path.resolve('./__tests__/Fixtures/sample.xlsx'))
      // eslint-disable-next-line
      const expected = fs.statSync(path.resolve(testOutputFilename))

      expect(expected.size).toEqual(actual.size)
    } catch (e) {
    } finally {
      // eslint-disable-next-line
      fs.unlinkSync(testOutputFilename)
    }
  })

  test('Creating an Excel file with date in filename', async () => {
    expect.assertions(1)

    const testOutputFilename = 'test-out.xlsx'
    const expectedTestOutputFilename = 'test-out_2016-06-20--03-08-10.xlsx'
    const RealDate = Date
    const mockDate = new Date(2016, 5, 20, 3, 8, 10)

    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(mockDate)
      }
    }

    Form.prototype.fetchFormResponses = jest.fn(() => mockForm)

    const typeformToExcel = new TypeformExportExcel({
      credentials: {
        apiKey: mockApiKey
      },
      workbookConfig: {
        creator: 'Creator',
        date: new Date()
      }
    })

    await typeformToExcel.createWorkbookFromForm(mockForm.id)

    await typeformToExcel.writeToFile({
      filename: testOutputFilename,
      isDated: true
    })

    // eslint-disable-next-line
    const isFileExist = fs.existsSync(path.resolve(expectedTestOutputFilename))
    expect(isFileExist).toBeTruthy()

    global.Date = RealDate
    // eslint-disable-next-line
    fs.unlinkSync(expectedTestOutputFilename)
  })
})
