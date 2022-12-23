import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Form, Button, Alert, Stack } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './Dashboard.css'
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const Dashboard = () => {
  const params = useParams()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [datas, setDatas] = useState('')

  const [show, setShow] = useState(false);

  const navigate = useNavigate('');

  useEffect(() => {
    // console.log(params.id);
    if (params.id) {
      async function fetchData() {
        const request = await axios.get('https://dummyapi.io/data/v1/user/' + params.id, {
          headers: {
            'app-id': '6399923633aa47148e74cf90',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        })
        // console.log(request.data)
        setDatas(request.data)
      }
      fetchData();
    }
    return () => { }
  }, [params.id]);

  const handleSave = async e => {
    e.preventDefault();
    try {
      await axios.put('https://dummyapi.io/data/v1/user/' + params.id, {
        firstName: firstName,
        lastName: lastName,
      }, {
        headers: {
          'app-id': '6399923633aa47148e74cf90',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      // console.log(request.data)
      setShow(true)
    } catch (error) {
      if (error.response) {
        console.log(error.response)
      }
    }
  }

  const handleDelete = async e => {
    e.preventDefault();
    try {
      await axios.delete('https://dummyapi.io/data/v1/user/' + params.id, {
        headers: {
          'app-id': '6399923633aa47148e74cf90',
        },
      })
      navigate("/")
      // console.log(request.data)
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
            <p>ID: {datas.id}</p>
            <p>Name: {datas.firstName} {datas.lastName}</p>
            <p>Email: {datas.email}</p>
            <div className="d-grid gap-2">
              <Button className='button-delete' type='submit' variant='danger' onClick={handleDelete}>Delete Account</Button>
            </div>
          </Container>
        </Col>
        <Col lg={8} xl={7} className='column-user-edit'>
          <Container className='container-user-edit'>
            <h5>Edit Data</h5>
            <Form onSubmit={handleSave}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Form.Group>
              <Stack className='container-register-button' direction='horizontal' gap={3}>
                <Button className='button-save' type='submit' variant='success'>Save</Button>
                <Alert show={show} variant='info' onClick={() => setShow(false)}>
                  Save Success!
                </Alert>
              </Stack>
            </Form>
          </Container>
        </Col>
      </Row>
      <Footer />
    </Container>
  )
}

export default Dashboard