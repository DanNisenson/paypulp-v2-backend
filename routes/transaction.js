var express = require('express')
var router = express.Router()
const { transactionSchema } = require('../middlewares/validationFields/transactionSchema.js')
const { validateResult } = require('../middlewares/validators/bodyValid')

router.post(
  '/',
  transactionSchema,
  validateResult,
  require('../controllers/Transaction/postTransaction.js'),
)

router.patch('/complete', require('../controllers/Transaction/updateTransaction.js'))

module.exports = router
