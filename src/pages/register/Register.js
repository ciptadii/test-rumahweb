import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Stack, Alert, Button } from 'react-bootstrap'
import axios from 'axios';

import './Register.css'

const Register = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [passwordInput, setPasswordInput] = useState({
		password: "",
		confirmPassword: ""
	})
	const [confirmPasswordError, setConfirmPasswordError] = useState('')
	const [passwordError, setPasswordErr] = useState('')
	const [datas, setDatas] = useState('')
	const [show, setShow] = useState(false)
	const [formValidated, setFormValidated] = useState(false)
	// console.log('form validated: ', formValidated);
	const [passValidated, setPassValidated] = useState(false)
	// console.log('passw validated: ', passValidated)
	const [validated, setValidated] = useState(false)
	// console.log('validated: ', validated);

	useEffect(() => {
		if (formValidated === true && passValidated === true) {
			setValidated(true)
		}
	}, [formValidated, passValidated])

	// submit data
	const handleSubmit = async e => {
		// e.preventDefault();
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
			// console.log(request.data)
			setDatas(request.data)
			setShow(true)
		} catch (error) {
			if (error.response) {
				console.log(error.response)
			}
		}
	}

	// general form validation
	const handleValidate = (e) => {
		e.preventDefault()
		const form = e.currentTarget
		if (form.checkValidity() === false) {
			e.preventDefault()
			e.stopPropagation()
		} setFormValidated(true)

		if (validated === true) {
			handleSubmit()
		}
	}

	// password on change action
	const handlePasswordChange = (evnt) => {
		const passwordInputValue = evnt.target.value.trim();
		const passwordInputFieldName = evnt.target.name;
		const NewPasswordInput = {
			...passwordInput,
			[passwordInputFieldName]: passwordInputValue
		};
		setPasswordInput(NewPasswordInput);
	};

	// password validation
	const handleValidation = (evnt) => {
		const passwordInputValue = evnt.target.value.trim();
		const passwordInputFieldName = evnt.target.name;

		//for password
		if (passwordInputFieldName === "password") {
			const uppercaseRegExp = /(?=.*?[A-Z])/;
			const lowercaseRegExp = /(?=.*?[a-z])/;
			const digitsRegExp = /(?=.*?[0-9])/;
			const specialCharRegExp = /(?=.*?[#?!@$%^&*-]{2})/;
			const minLengthRegExp = /.{12,}/;
			const passwordLength = passwordInputValue.length;
			const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
			const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
			const digitsPassword = digitsRegExp.test(passwordInputValue);
			const specialCharPassword = specialCharRegExp.test(passwordInputValue);
			const minLengthPassword = minLengthRegExp.test(passwordInputValue);
			let errMsg = "";

			if (passwordLength === 0) {
				errMsg = "Password is empty";
			} else if (!uppercasePassword) {
				errMsg = "At least one Uppercase";
			} else if (!lowercasePassword) {
				errMsg = "At least one Lowercase";
			} else if (!digitsPassword) {
				errMsg = "At least one digit";
			} else if (!specialCharPassword) {
				errMsg = "At least two Special Characters";
			} else if (!minLengthPassword) {
				errMsg = "At least minumum 12 characters";
			} else {
				errMsg = "";
			}
			setPasswordErr(errMsg);
			setPassValidated(false)
		}

		// for confirm password
		if (
			passwordInputFieldName === "confirmPassword" ||
			(passwordInputFieldName === "password" &&
				passwordInput.confirmPassword.length > 0)
		) {
			if (passwordInput.confirmPassword !== passwordInput.password) {
				setConfirmPasswordError("Confirm password is not matched");
				setPassValidated(false)
			} else {
				setConfirmPasswordError("");
				setPassValidated(true)
				setValidated(true)
			}
		}
	};

	return (
		<Row className="card-container">
			<Col md="auto">
				<Alert show={show} variant="success">
					<Alert.Heading>Register Success!</Alert.Heading>
					<h6>Below is your data, save it to login.</h6>
					<p>Your ID: {datas.id}</p>
					<p>Name: {datas.firstName} {datas.lastName}</p>
					<p>Email: {datas.email}</p>
					<hr />
					<div className="d-flex justify-content-end">
						<Button onClick={() => setShow(false)} variant="outline-success">
							Ok
						</Button>
					</div>
				</Alert>

				<Card className='register-card-container'>
					<Card.Header as="h3">Register</Card.Header>
					<Card.Body>
						<Form noValidate validated={formValidated} onSubmit={handleValidate}>
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
									<Form.Control
										required
										name="password"
										type="password"
										value={passwordInput.password}
										onChange={handlePasswordChange}
										onKeyUp={handleValidation}
									/>
									<Form.Control.Feedback type="invalid">Please input your password.</Form.Control.Feedback>
									<p className='text-danger'>{passwordError}</p>
									{/* <Form.Text id="passwordHelpBlock" muted> Your password must be minimum 12 characters long, contain capital & non-capital letters and numbers,<br />has minimum 2 non-alpahbetic characters, and must not contain spaces, special characters, or emoji.</Form.Text > */}
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										required
										name="confirmPassword"
										type="password"
										value={passwordInput.confirmPassword}
										onChange={handlePasswordChange}
										onKeyUp={handleValidation}
										isValid={passValidated}
									/>
									<Form.Control.Feedback type="invalid">Please input your password.</Form.Control.Feedback>
									<p className='text-danger'>{confirmPasswordError}</p>
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