import React, { useState } from 'react'
import { Container, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios';

import Navbar from '../../components/navbar';

const Dashboard = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const id = '639ae9ce833dc26acd3600f5'

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const request = await axios.put('https://dummyapi.io/data/v1/user/' + id, {
                firstName: firstName,
                lastName: lastName,
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

    return (
        <Container fluid >
            <Col>
                <Navbar />
                <h2>Dashboard</h2>
                <Container>
                    <h5>Profile</h5>
                    <p>ID</p>
                    <div>
                        <p>first name</p>
                        <p>last name</p>
                    </div>
                    <p>email</p>
                </Container>
                <Container>
                    <h5>Edit Your Profile</h5>
                    <Form onSubmit={handleSubmit}>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>
                            <Button className='button-submit-login' type='submit' variant='light'>Save</Button>
                        </Col>
                    </Form>
                </Container>
            </Col>
        </Container >
    )
}

export default Dashboard