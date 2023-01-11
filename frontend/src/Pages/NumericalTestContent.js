import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Jumbotron from '../Components/Jumbotron'
import NumericalTestModal from '../Components/Modals/NumericalTestModal'
import QuestionModal from '../Components/Modals/QuestionModal'
import { BASEURL, errorToast, successToast, warningToast } from '../Constants'
import { CartState } from '../Context'

const NumericalTestContent = () => {
    const { category, language } = CartState()
    const params = useParams()
    const [numericalTestData, setNumericalTestData] = useState([])
    const [edit, setEdit] = useState('')
    const [name, setName] = useState('')
    const [render, setRender] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [bulk, setBulk] = useState(false)

    const fetchData = async () => {
        const { data } = await axios.get(`${BASEURL}/api/numericaltest/${category}/${language}/${params.id}`)
        setNumericalTestData(data.data)
    }

    const editHandler = async (x) => {
        setEdit(x)
        setModalShow(true)
    }

    const deleteHandler = async (x) => {
        try {
            const { data } = await axios.post(`${BASEURL}/api/numericaltest/question/delete`,x)
            if (data.errorcode === 0) {
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

    useEffect(() => {
        if (render) setRender(false)
        setEdit()
        fetchData()
    }, [category, language, render])

    return (
        <>
            <Jumbotron
                name={"Numerical test Content"}
                buttonName={"Add/Edit"}
                bulkButton={'Bulk Add'}
                submitHandler={() => submitHandler()}
                bulkHandler={() => bulkHandler()}
                type={"NTestContent"}
            />
            <NumericalTestModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                    setBulk(false)
                    setEdit()
                }}
                setRender={() => setRender(true)}
                bulk={bulk}
                edit={edit}
            />
            <Container>
                <h4>{numericalTestData.name}</h4>
                {numericalTestData.qAndA && numericalTestData.qAndA.length > 0 ?
                    numericalTestData?.qAndA?.map((test, index) => (
                        <Accordion>
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    <b>Question:</b><p>{test?.q}</p>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <b>Options:</b>
                                    {test?.o1 && <p> <b>1: </b>{test?.o1}</p>}
                                    {test?.o2 && <p><b>2: </b>{test?.o2}</p>}
                                    {test?.o3 && <p><b>3: </b>{test?.o3}</p>}
                                    {test?.o4 && <p><b>4: </b>{test?.o4}</p>}
                                    <p><b>Ans: </b>{test?.a}</p>
                                    <Button className='mx-1' variant='success' size="sm"
                                        onClick={(e) => editHandler(test)}
                                    >Edit</Button>
                                    <Button className='mx-1' variant='danger' size="sm"
                                        onClick={(e) => deleteHandler(test)}
                                    >Delete</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))
                    :
                    "No Q&A Found"
                }
            </Container>
        </>
    )
}

export default NumericalTestContent