import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios';

import './Login.css'

// "639ae9ce833dc26acd3600f5" John Doe

const Login = () => {
	const [id, setId] = useState('')
	const [msg, setMsg] = useState('');
	const navigate = useNavigate('');

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
		<Row className="card-container">
			<Col md="auto">
				<Card className='login-card-container'>
					<Card.Header as="h3">Login</Card.Header>
					<Card.Body>
						<Form onSubmit={handleSubmit}>
							<Col>
								<p className="has-text-centered">{msg}</p>
								<Form.Group className="mb-3">
									<Form.Label>User ID</Form.Label>
									<Form.Control type="text" placeholder='Input Your ID' value={id} onChange={(e) => setId(e.target.value)} />
								</Form.Group>
								<div className="d-grid gap-2">
									<Button variant='primary' type='submit'>Login</Button>
									<Button variant='secondary' href='/register'>Register</Button>
								</div>
							</Col>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default Login