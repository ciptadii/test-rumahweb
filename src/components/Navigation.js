import React from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'

const Navigation = () => {
  return (
    <Navbar fixed='top' bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/dashboard">User Manager</Navbar.Brand>
        <Button className='button-submit-login' variant='light' href='/'>Logout</Button>
      </Container>
    </Navbar>
  )
}

export default Navigation