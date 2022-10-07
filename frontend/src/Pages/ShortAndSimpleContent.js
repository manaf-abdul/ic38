import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Jumbotron from '../Components/Jumbotron'
import SASContentModal from '../Components/Modals/SASContentModal'
import { BASEURL, errorToast, successToast, warningToast } from '../Constants'
import { CartState } from '../Context'

const ShortAndSimpleContent = () => {
    const { category, language } = CartState()
    const params=useParams()
    const [terminologyData, setTerminologyData] = useState([])
    const [edit, setEdit] = useState('')
    const [name, setName] = useState('')
    const [render, setRender] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [bulk, setBulk] = useState(false)

    const fetchData = useCallback(async () => {
        const { data } = await axios.get(`${BASEURL}/api/short-and-simple/${category}/${language}/${params.id}`)
        console.log("data", data)
        setTerminologyData(data.data)
    }, [])

    const editHandler = async () => {
        console.log(name)
        try {
            const { data } = await axios.post(`${BASEURL}/api/short-and-simple/data/edit`,
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

    const deleteHandler = async (x) => {
        try {
            const { data } = await axios.post(`${BASEURL}/api/short-and-simple/data/delete`,
                x)
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
    const submitHandler = () => {
        setModalShow(true)
    }

    const bulkHandler = () => {
        setBulk(true)
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

    console.log("nameeeee", name)

    useEffect(() => {
        if (render) setRender(false)
        setEdit()
        fetchData()
    }, [category,language,render])

    return (
        <>
            <Jumbotron
                name={"Short & Simple "}
                buttonName={"Add/Edit"}
                bulkButton={'Bulk Add'}
                submitHandler={() => submitHandler()}
                bulkHandler={() => bulkHandler()}
            />
            <SASContentModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                    setBulk(false)
                }}
                setRender={() => setRender(true)}
                bulk={bulk}
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

export default ShortAndSimpleContent