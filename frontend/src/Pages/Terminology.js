import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Jumbotron from '../Components/Jumbotron'
import { errorToast, successToast, warningToast } from '../Constants'
import { CartState } from '../Context'

const Terminology = () => {
    const { category, language } = CartState()
    const [terminologyData, setTerminologyData] = useState([])
    const [edit, setEdit] = useState('')
    const [name, setName] = useState('')

    const fetchData = useCallback(async () => {
        const { data } = await axios.get(`https://ic38.herokuapp.com/api/terminology/${category}/${language}`)
        console.log("data", data)
        setTerminologyData(data.data)
    }, [])

    const editHandler = async () => {
        console.log(name)
        try {
          const { data } = await axios.post('http://localhost:5002/api/terminology/edit',
            name)
          if (data.errorcode === 0) {
            console.log("inside");
            toast.success(`🦄 ${data.msg}!`, successToast);
            // setRender(true)
            setEdit()
          } else {
            toast.warn(`🦄 ${data.msg}!`, warningToast);
          }
        } catch (error) {
          toast.error(`🦄 ${error.message}!`, errorToast);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setName((values) => ({
          ...values,
          [name]: value,
        }));
      };

      console.log("nameeeee",name)

    useEffect(() => {
        setEdit()
        fetchData()
    }, [])

    return (
        <>
            <Jumbotron
                name={"Course "}
                buttonName={"Add/Edit"}
            />
            <Container>
                {/* <Col xs={6} lg={6}> */}

                {terminologyData && terminologyData.length > 0 ? terminologyData.map((term, index) => (
                    <Accordion>
                        {/* <InputGroup className="mb-3">
                         <Form.Control
                           type='name'
                           placeholder='Enter name'
                           value={name.title}
                           autoFocus
                           onChange={(e) => setName(e.target.value)}
                         ></Form.Control>
                         <Form.Control
                           type='name'
                           placeholder='Enter name'
                           value={name.description}
                           autoFocus
                           onChange={(e) => setName(e.target.value)}
                         ></Form.Control>
                         <Button className='mx-1' variant='success' size="sm"
                        //   onClick={(e) => editHandler(x)}
                          >Save</Button>
                         <Button className='mx-1' variant='danger' size="sm" 
                         onClick={() => setEdit()}
                         >Cancel</Button>
                       </InputGroup> */}

                        <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                                {edit == index ? "Edit" : term.title}
                            </Accordion.Header>
                            <Accordion.Body>

                                <Row className='w-100'>
                                    {edit === index ?

                                        <>
                                            <Row>
                                                <Col>
                                                    <Form.Label>Title</Form.Label>
                                                </Col>
                                                <Col>
                                                    <Form.Label>Desccription</Form.Label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Control
                                                        type='name'
                                                        id='title'
                                                        name="title"
                                                        placeholder='Enter Title'
                                                        value={name.title}
                                                        autoFocus
                                                        onChange={handleChange}
                                                    ></Form.Control>
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        type='name'
                                                        id='description'
                                                        name="description"
                                                        placeholder='Enter Desccription'
                                                        value={name.description}
                                                        onChange={handleChange}
                                                    ></Form.Control>
                                                </Col>
                                            </Row>
                                            <Row className='text-center pt-2'>
                                                <Col className='justify-content-end'>
                                                    <Button className='mx-1' variant='success' size="sm"
                                                      onClick={(e) => editHandler()}
                                                    >Save</Button>
                                                    <Button className='mx-1' variant='danger' size="sm"
                                                        onClick={() => setEdit()}
                                                    >Cancel</Button>
                                                </Col>
                                            </Row>
                                        </>
                                        :
                                        <Col>
                                            {term.description}
                                        </Col>}
                                    {edit === index ? ""
                                        : <Col className="d-flex justify-content-end">
                                            <Button className="moduleVideo" onClick={() => {
                                                setEdit(index)
                                                setName(term)
                                            }}>Edit</Button>
                                        </Col>
                                    }
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>


                    </Accordion>
                ))
                    :
                    <h4 className='text-center'>No Data Found</h4>
                }
                {/* </Col> */}
            </Container>
        </>
    )
}

export default Terminology