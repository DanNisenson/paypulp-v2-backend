const Transaction = require('../../model/transactionModel')

const updateTransaction = async (req, res) => {
  const condition = { transactionUuid: req.body.transactionUuid }
  const updateCols = { ...req.body }

  // double check transaction data? qrLink belongs to seller, buyeruuid is right?

  try {
    const transaction = await Transaction.updateData('transactions', updateCols, condition)
    return res.status(200).json(transaction)
  } catch (error) {
    console.log('postQrLink controller', error)
    const message = 'An error occurred while processing your request'
    return res.status(500).json({ error: message })
  }
}

module.exports = updateTransaction
