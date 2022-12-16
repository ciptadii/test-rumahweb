import React, { useState } from 'react'
import { Card, Row, Col, Form, Stack, Button } from 'react-bootstrap'
import axios from 'axios';

import './Register.css'

const Register = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [validated, setValidated] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault();
		console.log('send request')
		// try {
		// 	const request = await axios.post('https://dummyapi.io/data/v1/user/create', {
		// 		firstName: firstName,
		// 		lastName: lastName,
		// 		email: email,
		// 	}, {
		// 		headers: {
		// 			'app-id': '6399923633aa47148e74cf90',
		// 			'Content-Type': 'application/x-www-form-urlencoded'
		// 		},
		// 	})
		// 	console.log(request.data)
		// } catch (error) {
		// 	if (error.response) {
		// 		console.log(error.response)
		// 	}
		// }
	}

	const handleValidate = (e) => {
		const form = e.currentTarget
		if (form.checkValidity() === false) {
			e.preventDefault()
			e.stopPropagation()
		}

		setValidated(true)
	}

	return (
		<Row className="card-container">
			<Col md="auto">
				<Card className='register-card-container'>
					<Card.Header as="h3">Register</Card.Header>
					<Card.Body>
						<Form noValidate validated={validated} onSubmit={handleValidate}>
							<Col>
								<Form.Group className="mb-3">
									<Form.Label>First Name</Form.Label>
									<Form.Control required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
									<Form.Control.Feedback type="invalid">Please input your first name.</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Last Name</Form.Label>
									<Form.Control required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
									<Form.Control.Feedback type="invalid">Please input your last name.</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control required type="email" placeholder='example@mail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
									<Form.Control.Feedback type="invalid">Please input your email or make sure the email format is valid.</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
									<Form.Control.Feedback type="invalid">Please input your password.</Form.Control.Feedback>
									<Form.Text id="passwordHelpBlock" muted> Your password must be minimum 12 characters long, contain capital & non-capital letters and numbers,<br />has minimum 2 non-alpahbetic characters, and must not contain spaces, special characters, or emoji.</Form.Text >
								</Form.Group>
								<Stack className='container-register-button' direction='horizontal' gap={3}>
									<Button className='button-submit-register' type='submit' variant='primary'>Register</Button>
									<Button className='button-login' variant='secondary' href='/'>Login</Button>
								</Stack>
							</Col>
						</Form>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default Register