import { useEffect, useState } from 'react'
import { Container, Box, Grid } from '@mui/material'
import Form from './Form'
import List from './List'
import axios from 'axios'

export default function Content() {
    const [contacts, setContacts] = useState([])

    const fetchData = async () => {
        try{
            const res = await axios.get('http://localhost:3000/api/contact')
            setContacts(res.data)
        }catch(error){
            setContacts([])
        }
    }

    useEffect(() => {   
        let isFetched = true
        isFetched && fetchData()

        return () => {
            isFetched = false
        }
    },[])

    return (
        <Container>
            <Box mt={2} width="100%">
                <Form setContacts={setContacts} contacts={contacts}/>
                <Grid container spacing={2}>
                    {
                        contacts && contacts.map((v, i) => (
                            <Grid item lg={4} key={i} >
                                <List {...v} data={contacts} action={setContacts} _index={i}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Container>
    )
}
