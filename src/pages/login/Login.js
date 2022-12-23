import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios';

import './Login.css'

const Login = () => {
	const [id, setId] = useState('')
	const [msg, setMsg] = useState('');

	const [validated, setValidated] = useState(false)

	const navigate = useNavigate('');

	const handleSubmit = async e => {
		// e.preventDefault();
		try {
			await axios.get('https://dummyapi.io/data/v1/user/' + id, {
				headers: {
					'app-id': '6399923633aa47148e74cf90'
				},
			})
			// console.log(request.data)
			navigate("/dashboard/" + id)
		} catch (error) {
			if (error.response) {
				setMsg(error.response.data.msg);
			}
		}
	}

	const handleValidate = (e) => {
		e.preventDefault()
		const form = e.currentTarget
		if (form.checkValidity() === false) {
			e.preventDefault()
			e.stopPropagation()
			setValidated(false)
		}

		setValidated(true)
		if (id) {
			handleSubmit()
		}
	}

	return (
		<Row className="card-container">
			<Col md="auto">
				<Card className='login-card-container'>
					<Card.Header as="h3">Login</Card.Header>
					<Card.Body>
						<Form noValidate validated={validated} onSubmit={handleValidate}>
							<Col>
								<p className="has-text-centered">{msg}</p>
								<Form.Group className="mb-3">
									<Form.Label>User ID</Form.Label>
									<Form.Control required type="text" placeholder='Input Your ID' value={id} onChange={(e) => setId(e.target.value)} />
									<Form.Control.Feedback type="invalid">Please input your User ID.</Form.Control.Feedback>
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