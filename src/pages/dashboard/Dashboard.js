import React, { useState } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import axios from 'axios';

import './Dashboard.css'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  // const id = '639ae9ce833dc26acd3600f5'
  const id = '639af844833dc22838360dce'

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

  const handleDelete = async e => {
    e.preventDefault();
    try {
      const request = await axios.delete('https://dummyapi.io/data/v1/user/' + id, {
        headers: {
          'app-id': '6399923633aa47148e74cf90',
        },
      })
      // if return id data then show success
      console.log(request.data)
    } catch (error) {
      if (error.response) {
        console.log(error.response)
      }
    }
  }

  return (
    <Container fluid className='container-body'>
      <Navigation />
      {/* <h2>Dashboard</h2> */}
      <Row className='content-container'>
        <Col lg={4} xl={5} className='column-user-info'>
          <Container className='container-user-info'>
            <h5>User Data</h5>
            <p>ID</p>
            <p>firstName lastName</p>
            <p>email</p>
            <div className="d-grid gap-2">
              <Button className='button-delete' type='submit' variant='danger' onClick={handleDelete}>Delete Account</Button>
            </div>
          </Container>
        </Col>
        <Col lg={8} xl={7} className='column-user-edit'>
          <Container className='container-user-edit'>
            <h5>Edit Data</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Form.Group>
              <Button className='button-save' type='submit' variant='success'>Save</Button>
            </Form>
          </Container>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}

export default Dashboard