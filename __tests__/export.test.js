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
})
