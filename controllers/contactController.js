const asyncHandler = require('express-async-handler');


//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get All Contacts` });
});


//@desc Get One contact
//@route GET /api/contacts/:id
//@access public
const getOneContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get one Contact` });
});


//@desc create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('All Fields are mendatory !');
    }
    res.status(201).json({ message: `create new contact` });
});


//@desc Update one contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update contact` });
});


//@desc Delete one contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `delete one contact` });
});


module.exports = {
    getContacts,
    getOneContact,
    createContact,
    updateContact,
    deleteContact
}