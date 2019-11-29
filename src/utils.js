'use strict'
const moment = require('moment')

const insertString = (string, subString, index) => {
  return string.slice(0, index) + subString + string.slice(index)
}

const getFormattedDate = (date, format) => {
  return moment(date).format(format)
}

module.exports = {
  insertString,
  getFormattedDate
}
