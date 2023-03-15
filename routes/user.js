var express = require('express')
const updatePersonalInfoFields = require('../middlewares/validationFields/updatePersonalInfoFields')
const { validateResult } = require('../middlewares/validators/bodyValid')
var router = express.Router()

router.get('/', require('../controllers/User/getUser'))

router.get('/personalinfo', require('../controllers/PersonalInfo/getPersonalInfoController'))

router.patch('/personalinfo', updatePersonalInfoFields, validateResult, require('../controllers/PersonalInfo/updatePersonalInfoController'))

router.post('/sellerinfo', require('../controllers/SellerInfo/newSellerInfoController'))

module.exports = router
