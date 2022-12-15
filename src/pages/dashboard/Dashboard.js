import React from 'react'
import { Container, Col, Form, Button } from 'react-bootstrap'

import Navbar from '../../components/navbar';

const Dashboard = () => {
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
                    <Form >
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" />
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" />
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