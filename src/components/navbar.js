import React from 'react'

import { Stack, Button } from 'react-bootstrap'

const Navbar = () => {
    return (
        <Stack direction='horizontal'>
            <h1 className='me-auto'>Navbar</h1>
            <Button className='button-submit-login' variant='light'>Logout</Button>
        </Stack>

    )
}

export default Navbar