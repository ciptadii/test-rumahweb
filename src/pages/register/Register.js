import React, { useState } from 'react'
import { Container, Col, Form, Stack, Button } from 'react-bootstrap'
import axios from 'axios';

import Navbar from '../../components/navbar';

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const request = await axios.post('https://dummyapi.io/data/v1/user/create', {
                firstName: firstName,
                lastName: lastName,
                email: email,
            }, {
                headers: {
                    'app-id': '6399923633aa47148e74cf90',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })
            console.log(request.data)
        } catch (error) {
            if (error.response) {
                console.log(error.response)
            }
        }
    }

    // "639ae9ce833dc26acd3600f5" John Doe

    return (
        <Col>
            <Navbar />
            <Container fluid >
                <h2>Register</h2>
                <Form onSubmit={handleSubmit}>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder='example@mail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Stack className='container-register-button' direction='horizontal' gap={3}>
                            <Button className='button-reset-login' variant='outline-secondary'>Login</Button>
                            <Button className='button-submit-login' type='submit' variant='light'>Register</Button>
                        </Stack>
                    </Col>
                </Form>
            </Container>
        </Col>
    )
}

export default Register