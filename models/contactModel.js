const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Contact Required']
    },
    email: {
        type: String,
        required: [true, 'Email Required']
    },
    phone: {
        type: String,
        required: [true, 'Phone Required']
    }
},{timestamps:true});

const contactModel = mongoose.model('Contacts',contactSchema);

module.exports = contactModel;