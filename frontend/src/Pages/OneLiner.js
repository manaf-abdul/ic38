import axios, { Axios } from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import Jumbotron from '../Components/Jumbotron'
import ConfirmModal from '../Components/Modals/ConfirmModal'
import OneLinerModal from '../Components/Modals/OneLinerModal'
import { errorToast, successToast, warningToast } from '../Constants'
import { CartState } from '../Context'

const OneLiners = () => {
  const { category, language } = CartState()
  const [onelinerData, setOneLinerData] = useState()
  const [modalShow, setModalShow] = useState(false)
  const [confirmModalShow, setConfirmModalShow] = useState(false)
  const [edit, setEdit] = useState('')
  const [name, setName] = useState('')
  const [render, setRender] = useState(false)
  const [x, setX] = useState()

  const submitHandler = () => {
    setModalShow(true)
  }

  const editHandler = async (e) => {
    try {
      const { data } = await axios.post('http://localhost:5002/api/one-liners/edit',
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

  const deleteHandler = useCallback(async (z) => {
    setConfirmModalShow(true)
    setX(z)

  })

  const deletehandler = useCallback(async () => {
    try {
      const { data } = await axios.post('http://localhost:5002/api/one-liners/delete',
        { _id: x._id, content: name, category: x.superCategory, language: x.language }
      )
      if (data.errorcode === 0) {
        console.log("inside");
        toast.success(`🦄 ${data.msg}!`, successToast);
        setRender(true)
        setConfirmModalShow(false)
      } else {
        toast.warn(`🦄 ${data.msg}!`, warningToast);
      }
    } catch (error) {
      toast.error(`🦄 ${error.message}!`, errorToast);
    }
  })


  useEffect(() => {
    setEdit()
    if (render) setRender(false)
    async function fetchData() {
      const { data } = await axios.get(`https://ic38.herokuapp.com/api/one-liners/${category}/${language}`)
      console.log("data", data)
      setOneLinerData(data.data)
    }
    fetchData()
  }, [category, language, render])
  return (
    <>
      {/* <h1>Category : {category}   language:{language}</h1> */}

      {/* <Jumbotron
        name={"One-Liners"}
        buttonName={"Add/Edit Oneliner"}
        submitHandler={() => submitHandler()} /> */}

      <Container>

        <OneLinerModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        // setRender={() => setRender(true)}
        />

        <ConfirmModal
          show={confirmModalShow}
          onHide={() => setConfirmModalShow(false)}
          deletehandler={() => deletehandler()}
        />

        {onelinerData && onelinerData.map((x, index) => (
          <Card key={x._id}>
            <Card.Body>
              <Row>
                <Col>
                  {edit == index ?
                    <>
                      <Form.Label>Content</Form.Label>

                      {/* <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        // onBlur={() => setEdit()}
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control> */}

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
                    <Card.Text className='h4'>{x.content}</Card.Text>
                  }
                </Col>
                <Col className='d-flex justify-content-end'>
                  {edit == index ?
                    <Col>
                      {/* <Button className='m-2 mt-4' variant='success' size="sm" onClick={(e) => editHandler(x)}>Save</Button>
                      <Button className='m-2 mt-4' variant='danger' size="sm" onClick={() => setEdit()}>Cancel</Button> */}

                    </Col>
                    :
                    <>
                      <Button className='m-2' variant='success' size="sm" onClick={() => {
                        setEdit(index)
                        setName(x.content)
                        { console.log("x.content", x.content) }
                      }}>Edit</Button>
                      <Button className='m-2' variant='danger' size="sm" onClick={() => deleteHandler(x)}>Delete</Button>
                    </>
                  }
                 
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )
        )}

      </Container>
    </>
  )
}

export default OneLiners