const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
});


//@desc Get One contact
//@route GET /api/contacts/:id
//@access public
const getOneContact = asyncHandler(async (req, res) => {
    const id = req.params._id;
    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found!');
    }

    res.status(200).json(contact);
});


//@desc create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All Fields are mendatory !');
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    });

    res.status(201).json(contact);
});


//@desc Update one contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const id = req.params._id;
    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found!');
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});


//@desc Delete one contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params._id;
    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact Not Found!');
    }

    const contacts = await Contact.findByIdAndDelete(id);

    res.status(200).json(contacts);
});


module.exports = {
    getContacts,
    getOneContact,
    createContact,
    updateContact,
    deleteContact
}