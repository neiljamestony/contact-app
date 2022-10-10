const express = require('express')
const router = express.Router()
const { addContact, updateContact, getContacts, removeContact } = require('../controller/contactController')

router.get('/', getContacts)
router.post('/', addContact)
router.put('/:id', updateContact)
router.delete('/:id', removeContact)

module.exports = router