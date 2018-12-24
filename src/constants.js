'use strict'

const HEADER_NAME = {
  metaKey: 'Metadata Key',
  metaValue: 'Metadata Value',
  answer: 'Answers',
  response: 'Responses',
  percentage: 'Responses Percentage',
  other: 'Other Responses'
}

const HEADER_WIDTH = {
  metaKey: '25',
  metaValue: '50',
  answer: '50',
  response: '10',
  percentage: '20',
  other: '50'
}

const HEADER_STYLE = {
  metaKey: {
    font: {
      name: 'Arial',
      color: {
        argb: 'FF5733'
      }
    }
  },
  metaValue: {
    font: {
      name: 'Arial',
      color: {
        argb: 'FF5733'
      }
    },
    alignment: {
      wrapText: true
    }
  },
  answer: {
    font: {
      name: 'Arial',
      color: {
        argb: 'FF33E6'
      }
    },
    alignment: {
      wrapText: true
    }
  },
  response: {
    font: {
      name: 'Arial',
      color: {
        argb: '335BFF'
      }
    }
  },
  percentage: {
    font: {
      name: 'Arial',
      color: {
        argb: '335BFF'
      }
    }
  },
  other: {
    font: {
      name: 'Arial',
      color: {
        argb: '000000'
      }
    },
    alignment: {
      wrapText: true
    }
  }
}

const WORKSHEET_COLOR = 'FF00FF00'

module.exports = {
  HEADER_NAME,
  HEADER_WIDTH,
  HEADER_STYLE,
  WORKSHEET_COLOR
}
