import axios from 'axios'
import React, { createElement, useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Jumbotron from '../Components/Jumbotron'
import NewCatAndLangModal from '../Components/Modals/NewCatAndLangModal'
import { BASEURL, errorToast, successToast, warningToast } from '../Constants'

const Category = () => {
    const [category, setCategory] = useState([])
    const [edit, setEdit] = useState('')
    const [name, setName] = useState('')
    const [render, setRender] = useState(false)
    const [cat, setcat] = useState(true)
    const [modalShow,setModalShow]=useState(false)

    const submitHandler = () => {
        setcat(true)
        setModalShow(true)
    }

    console.log(category)
    const editHandler = async (e) => {
        try {
          const { data } = await axios.post(`${BASEURL}/api/supercategories/edit`,
            { _id: e._id, content: name, category: e.superCategory, language: e.language })
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

    const getCategoryData = useCallback(async () => {
        const { data } = await axios.get(`${BASEURL}/api/supercategories`)
        console.log("Category data", data)
        setCategory(data.data)
    }, [])

    useEffect(() => {
        setEdit()
        if (render) setRender(false)
        getCategoryData()
    }, [render])

    return (
        <>
            <Jumbotron
                name={"Categories"}
                buttonName={"Add Category"}
                submitHandler={() => submitHandler()} 
            />
            <NewCatAndLangModal
                cat={cat}
                show={modalShow}
                onHide={() => {
                setModalShow(false)
                setcat(false)
               }}
            />
            <Container>
                <Row>
                    {
                        category && category.length > 0 ?
                            category.map((x,index) => (
                                <Col key={x._id} sm={12} md={6} lg={4} xl={3}>
                                    <Card key={x._id}>
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    {edit == index ?
                                                        <>
                                                            <Form.Label>Content</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control
                                                                    type='name'
                                                                    placeholder='Enter name'
                                                                    value={name}
                                                                    autoFocus
                                                                    onChange={(e) => setName(e.target.value)}
                                                                ></Form.Control>
                                                                <Button className='mx-1' variant='success' size="sm" onClick={(e) => editHandler(x)}>Save</Button>
                                                                <Button className='mx-1' variant='danger' size="sm" onClick={() => setEdit()}>Cancel</Button>
                                                            </InputGroup>
                                                        </> :
                                                        <Card.Text className='h4'>{x.name}</Card.Text>
                                                    }
                                                </Col>
                                                <Col className='d-flex justify-content-end'>
                                                    {edit == index ?
                                                        <Col>
                                                        </Col>
                                                        :
                                                        <>
                                                            <Button className='m-2' variant='success' size="sm" onClick={() => {
                                                                setEdit(index)
                                                                setName(x.name)
                                                                // { console.log("x.content", x.content) }
                                                            }}>Edit</Button>
                                                            {/* <Button className='m-2' variant='danger' size="sm" onClick={() => deleteHandler(x)}>Delete</Button> */}
                                                        </>
                                                    }

                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                            :
                            "Categories Empty"
                    }
                </Row>
            </Container>
        </>
    )
}

export default Category