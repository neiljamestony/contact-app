import { useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Form({ setContacts, contacts }) {
    const [openModal, setOpenModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })

    const onChange = (e) => {
        let value;
        if(e.target.name === 'name'){
            value = e.target.value.replace(/[^a-z] /gi, '')            
        }else{
            value = e.target.value
        }
        setFormData({...formData, [e.target.name]: value})
    }

    const onSubmit = async () => {
        setIsLoading(!isLoading)
        try{
            const res = await axios.post('http://localhost:3000/api/contact', formData)
            toast.success('New Contact Added!')
            setIsLoading(false)
            setOpenModal(false)
            setContacts([...contacts, res.data])
            setFormData({
                name: '',
                email: ''
            })
        }catch(error){
            setIsLoading(false)
            setOpenModal(false)
            toast.error(error.response.data.message)
        }
    }

    return (
        <Box width="100%" mb={2}>
            <Button variant="contained" onClick={() => setOpenModal(!openModal)}>Add Contact</Button>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={openModal}>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogContent>
                    <Box mb={2}>
                        <TextField fullWidth name="name" disabled={isLoading} inputProps={{ maxLength: 20 }} placeholder="Enter name" value={formData.name} onChange={(e) => onChange(e)}/>
                    </Box>
                    <Box mb={2}>
                        <TextField fullWidth name="email" disabled={isLoading} inputProps={{ maxLength: 20 }} placeholder="Enter email" value={formData.email} onChange={(e) => onChange(e)}/>
                    </Box>
                    <Box display="flex" alignItems="flex-end" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined" onClick={() => setOpenModal(!openModal)} disabled={isLoading}>cancel</Button>
                        <Button variant="contained" disabled={isLoading} onClick={() => onSubmit()}>{ isLoading ? <CircularProgress size={30}/> : 'Submit' }</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
