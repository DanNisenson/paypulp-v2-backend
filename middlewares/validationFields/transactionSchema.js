const { checkSchema } = require('express-validator')

const locale = ['es-ES']

const transactionSchema = checkSchema({
  sellerUuid: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Seller uuid must not be empty' },
    isString: { errorMessage: 'Seller uuid must be a string' },
    isAlphanumeric: {
      options: [locale, { ignore: '-' }],
      errorMessage: 'Seller uuid must only contain letters or numbers',
    },
    trim: true,
  },
  totalAmount: {
    in: ['body'],
    exists: true,
    notEmpty: { errorMessage: 'Total amount must not be empty' },
    isFloat: {
      errorMessage: 'Total amount must be a number',
    },
    trim: true,
  },
})

module.exports = { transactionSchema }
