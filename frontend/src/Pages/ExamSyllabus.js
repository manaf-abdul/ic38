import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Jumbotron from '../Components/Jumbotron'
import ExamSyllabusModal from '../Components/Modals/ExamSyllabusModal'
import { BASEURL, errorToast, successToast, warningToast } from '../Constants'
import { CartState } from '../Context'

const ExamSyllabus = () => {
    const { category, language } = CartState()
    const [terminologyData, setTerminologyData] = useState([])
    const [edit, setEdit] = useState('')
    const [name, setName] = useState('')
    const [render, setRender] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [bulk, setBulk] = useState(false)

    const submitHandler = () => {
        setModalShow(true)
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setName((values) => ({
            ...values,
            [name]: value,
        }));
    };
    const editHandler = async () => {
        console.log(name)
        try {
            const { data } = await axios.post(`${BASEURL}/api/examsyllabus/edit`,
                name)
            if (data.errorcode === 0) {
                console.log("inside");
                toast.success(`🦄 ${data.msg}!`, successToast);
                setRender(true)
                setEdit()
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
            }
        } catch (error) {
            toast.error(`🦄 ${error.message}!`, errorToast);
        }
    }

    const fetchData = async () => {
        const { data } = await axios.get(`${BASEURL}/api/examsyllabus`)
        console.log("data", data)
        setTerminologyData(data.data)
    }

    const deleteHandler = useCallback(async (x) => {
        try {
          const { data } = await axios.post(`${BASEURL}/api/examsyllabus/delete`,
            { _id: x._id, content: name, category: x.superCategory, language: x.language }
          )
          if (data.errorcode === 0) {
            console.log("inside");
            toast.success(`🦄 ${data.msg}!`, successToast);
            setRender(true)
            // setConfirmModalShow(false)
          } else {
            toast.warn(`🦄 ${data.msg}!`, warningToast);
          }
        } catch (error) {
          toast.error(`🦄 ${error.message}!`, errorToast);
        }
      })

    useEffect(() => {
        if (render) setRender(false)
        setEdit()
        fetchData()
    }, [category,render])


    return (
        <>
            <Jumbotron
                name={"Exam Syllabus"}
                buttonName={"Add Topic"}
                submitHandler={() => submitHandler()}
            />
             <ExamSyllabusModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                }}
                setRender={() => setRender(true)}
            />
            <Container>

                {terminologyData && terminologyData.length > 0 ? terminologyData.map((term, index) => (
                    <Accordion>

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
                                                        id='content'
                                                        name="content"
                                                        placeholder='Enter Desccription'
                                                        value={name.content}
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
                                            {term.content}
                                        </Col>}
                                    {edit === index ? ""
                                        : <Col className="d-flex justify-content-end">
                                            <Button className='m-1' variant='success' size="sm" onClick={() => {
                                                setEdit(index)
                                                setName(term)
                                            }}>Edit</Button>
                                            <Button className='m-1' variant='danger' size="sm" onClick={() => deleteHandler(term)}>Delete</Button>
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
            </Container>
        </>
    )
}

export default ExamSyllabus