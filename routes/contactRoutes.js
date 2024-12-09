const express = require('express');
const router = express.Router();
const {
    getContacts,
    getOneContact,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController')


router.route('/')
    .get(getContacts)
    .post(createContact);


router.route('/:_id')
    .get(getOneContact)
    .put(updateContact)
    .delete(deleteContact);


module.exports = router;