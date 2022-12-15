import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios';

import Navbar from '../../components/navbar';

const Login = () => {
    const [id, setId] = useState()
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const request = await axios.get('https://dummyapi.io/data/v1/user/' + id, {
                headers: {
                    'app-id': '6399923633aa47148e74cf90'
                },
            })
            console.log(request.data)
            navigate("/dashboard")
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <Col>
            <Navbar />
            <Container fluid >
                <h2>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Col>
                        <p className="has-text-centered">{msg}</p>
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder='Input Your ID' value={id} onChange={(e) => setId(e.target.value)} />
                        </Form.Group>
                        <Button className='button-submit-login' type='submit' variant='light'>Login</Button>
                    </Col>
                </Form>
            </Container>
        </Col>
    )
}

export default Login