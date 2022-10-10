import { Box, AppBar, Toolbar, Typography } from '@mui/material'

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="body2" color="inherit" component="div">
                        Contact App
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
