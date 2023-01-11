import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Editor from '../Components/Editor'
import Jumbotron from '../Components/Jumbotron'
import ENotesModal from '../Components/Modals/ENotesModal'
import { BASEURL, errorToast, successToast, warningToast } from '../Constants'
import { CartState } from '../Context'
import htmlToText from 'react-html-parser'


const ENotes = () => {
  const { category, language } = CartState()
  const [enotes, setEnotes] = useState([])
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [edit, setEdit] = useState()
  const [render, setRender] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  // console.log("outside",value,title)

  const submitHandler = async () => {
    setModalShow(true)
  }

  const editHandler = async (x) => {
    console.log("editHandler", x)
    try {
      const { data } = await axios.post(`${BASEURL}/api/enotes/edit`,
        { id: x, content: value, title: title })
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
    console.log("deleteHandler")
    try {
      const { data } = await axios.post(`${BASEURL}/api/enotes/delete`,
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

  const getValue = (value) => {
    setValue(value);
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(`${BASEURL}/api/enotes/${category}/${language}`)
      console.log("data",data)
      setEnotes(data.data)
    } catch (error) {
      toast.error(`🦄 ${error.message}!`, errorToast);
    }
  }

  useEffect(() => {
    if(render) setRender(false)
    if(edit) setEdit()
    getData()
  }, [category, language, render])

  return (
    <>
      <Jumbotron
        name={"E-Notes "}
        buttonName={"Add an E-Note"}
        submitHandler={() => submitHandler()}
      />
      <ENotesModal
       show={modalShow}
       onHide={() => {
       setModalShow(false)
      }}
      setRender={() => setRender(true)}
      />
      <Container>
        {enotes && enotes.length > 0 ? enotes.map((term, index) => (
          <Accordion>

            <Accordion.Item eventKey={index}>
              <Accordion.Header>
                {edit == index ? "Edit" : term.title}
              </Accordion.Header>
              <Accordion.Body>

                <Row className='w-100'>
                  {edit === index ?

                    <>
                      {/* <Row> */}
                      <Row>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type='name'
                          id='title'
                          name="title"
                          placeholder='Enter Title'
                          value={title}
                          autoFocus
                          onChange={(e) => setTitle(e.target.value)}
                        ></Form.Control>
                      </Row>
                      <Row className='pt-5'>
                        <Form.Label>Content</Form.Label>
                        <Editor initialValue={content ? content : `<b>type your story HERE!!!!</b>`} getValue={getValue} />

                      </Row>
                      {/* </Row> */}
                      <Row>

                        <Col>

                          {/* <Form.Control
                          type='name'
                          id='description'
                          name="description"
                          placeholder='Enter Desccription'
                          value={name.description}
                          onChange={handleChange}
                        ></Form.Control> */}

                        </Col>
                      </Row>
                      <Row className='text-center pt-2'>
                        <Col className='justify-content-end'>
                          <Button className='mx-1' variant='success' size="sm"
                            onClick={(e) => editHandler(term._id)}
                          >Save</Button>
                          <Button className='mx-1' variant='danger' size="sm"
                            onClick={() => setEdit()}
                          >Cancel</Button>
                        </Col>
                      </Row>
                    </>
                    :
                    <Col>
                      {htmlToText(term.content)}
                    </Col>

                  }
                  {edit === index ? ""
                    : <Col className="d-flex justify-content-end">
                      <Button className='m-1' variant='success' size="sm" onClick={() => {
                        setEdit(index)
                        setTitle(term.title)
                        setContent(term.content)
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

export default ENotes