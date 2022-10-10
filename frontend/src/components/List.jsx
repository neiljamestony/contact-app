import { Card, Box, CardHeader, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { MoreHoriz, ModeEditOutlineOutlined, DeleteOutline } from '@mui/icons-material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import AccountIcon from '../components/assets/icon/user.png'
import axios from 'axios'
import EditContact from './EditContact'

export default function List({ name, email, _id, data, action, _index }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [updateContact, setUpdateContact] = useState(null)
    const [openEditForm, setOpenEditForm] = useState(false)
    const open = Boolean(anchorEl)

    const onRemove = async () => {
        setIsLoading(!isLoading)
        try{
            const res = await axios.delete(`http://localhost:3000/api/contact/${_id}`)
            if(res.status === 200){
                let list = [...data]
                toast.success('Contact Removed Successfully!')
                list.splice(_index, 1)
                setIsLoading(!isLoading)
                action(list)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const onUpdate = () => {
        setOpenEditForm(!openEditForm)
        setUpdateContact({ name: name, email: email, _id: _id })
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <img src={AccountIcon} alt="user-icon" height="64px" width="64px"/>
                }
                title={ 
                    <Box fontSize={17} fontWeight="bold">{ name }</Box>
                }
                subheader={
                    <Box>{ email }</Box>
                }
                action={
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <MoreHoriz/>
                    </IconButton>
                }
            />
            <Menu 
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={() => onUpdate()}>
                    <ListItemIcon>
                        <ModeEditOutlineOutlined fontSize="small" color="success"/>
                    </ListItemIcon>
                    <ListItemText sx={{ fontSize: 13 }}>edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => onRemove()}>
                    <ListItemIcon>
                        <DeleteOutline fontSize="small" color="error"/>
                    </ListItemIcon>
                    <ListItemText sx={{ fontSize: 13 }}>remove</ListItemText>
                </MenuItem>
            </Menu>
            <EditContact open={openEditForm} action={setOpenEditForm} data={updateContact} setData={setUpdateContact} list={data} updateList={action}/>
        </Card>
    )
}
