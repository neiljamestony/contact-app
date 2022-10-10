const asyncHandler = require('express-async-handler')
const ContactModel = require('../model/ContactModel')


const getContacts = asyncHandler(async (req, res) => {
    const contacts = await ContactModel.find()
    
    res.status(200).json(contacts)
})

const addContact = asyncHandler (async (req, res) => {
    const { name, email } = req.body
    // validate request
    if(!name || !email){
        res.status(400).json({ message: 'This fields are required!' })
    }
    
    // check if existing
    const anonymous = await ContactModel.find({ email })
    
    if(anonymous.length){
        res.status(400).json({
            message: 'Data already exists!'
        })
    }

    const user = await ContactModel.create({
        name, email
    })
    
    if(user){
        res.status(201).json({
            name: user.name,
            email: user.email,
            _id: user.id
        })
    }else{
        res.status(400).json({ message: 'Invalid Data!' })
    }
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await ContactModel.findById(req.params.id)
    if(!contact){
        res.status(400).json({ message: 'Data not found' })
    }

    const updateData = await ContactModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json({ message: 'Data Updated Successfully!', data: updateData })
})

const removeContact = asyncHandler( async (req, res) => {
    const contact = await ContactModel.findById(req.params.id)

    contact.remove()

    res.status(200).json({ message: 'Data Removed Successfully!' })
})

module.exports = { getContacts, addContact, updateContact, removeContact }