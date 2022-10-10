import { useState, useEffect } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function EditContact({ open, action, data, setData, list, updateList }) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState(data)

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
            const res = await axios.put(`http://localhost:3000/api/contact/${formData._id}`, formData)
            if(res.status === 200){
                let d = list.map((v) => {
                    if(v._id === formData._id){
                        v = res.data.data
                    }
                    return v
                })
                updateList(d)
                toast.success('Contact Updated Successfully!')
                setIsLoading(false)
                action(false)
                setData(null)
            }
        }catch(error){
            setIsLoading(false)
            action(false)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        setFormData(data)
    }, [data])

    return open && (data !== null) && 
    <Box width="100%" mb={2}>
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogContent>
                <Box mb={2}>
                    <TextField fullWidth name="name" disabled={isLoading} inputProps={{ maxLength: 20 }} placeholder="Enter name" value={formData === null ? '' : formData.name} onChange={(e) => onChange(e)}/>
                </Box>
                <Box mb={2}>
                    <TextField fullWidth name="email" disabled={isLoading} inputProps={{ maxLength: 20 }} placeholder="Enter email" value={formData === null ? '' : formData.email} onChange={(e) => onChange(e)}/>
                </Box>
                <Box display="flex" alignItems="flex-end" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={() => action(!open)} disabled={isLoading}>cancel</Button>
                    <Button variant="contained" disabled={isLoading} onClick={() => onSubmit()}>{ isLoading ? <CircularProgress size={30}/> : 'Submit' }</Button>
                </Box>
            </DialogContent>
        </Dialog>
    </Box>
    
}
