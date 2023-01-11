import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Jumbotron from '../Components/Jumbotron'
import AddPosterImageModal from '../Components/Modals/AddPosterImageModal'
import { BASEURL, errorToast, successToast, warningToast } from '../Constants'
import { CartState } from '../Context'

const Poster = () => {
    const { category, language } = CartState()
    const [file, setFile] = useState()
    const [title, setTitle] = useState('')
    const [data, setData] = useState()
    const [selected, setSelected] = useState()
    const [render, setRender] = useState(false)
    
    const [modalShow, setModalShow] = useState(false)

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    const addHandler = async (selected) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('title', title)
            formData.append('language', language)

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
                }
                const { data } = await axios.post(`${BASEURL}/api/poster`, formData, config)
                if (data.errorcode === 0) {
                    toast.success(`🦄 ${data.msg}!`, successToast);
                    setRender(true)
                    // props.onHide()
                } else {
                    toast.warn(`🦄 ${data.msg}!`, warningToast);
                }
            } catch (error) {
                toast.error(`🦄 ${error.message}!`, errorToast);
            }
        } catch (error) {
            toast.error(`🦄 ${error.message}!`, errorToast);
        }
    }

    const addImageHandler = async (selected) => {
        setSelected(selected)
        setModalShow(true)
    }

    const deleteHandler = useCallback(async (id) => {
        try {
          const { data } = await axios.post(`${BASEURL}/api/poster/delete`,
            { _id: id}
          )
          if (data.errorcode === 0) {
            toast.success(`🦄 ${data.msg}!`, successToast);
            setRender(true)
          } else {
            toast.warn(`🦄 ${data.msg}!`, warningToast);
          }
        } catch (error) {
          toast.error(`🦄 ${error.message}!`, errorToast);
        }
      })

      const deleteImageHandler = useCallback(async (id,x) => {
        try {
          const { data } = await axios.post(`${BASEURL}/api/poster/delete-image`,
            { key: id,id:x}
          )
          if (data.errorcode === 0) {
            toast.success(`🦄 ${data.msg}!`, successToast);
            setRender(true)
          } else {
            toast.warn(`🦄 ${data.msg}!`, warningToast);
          }
        } catch (error) {
          toast.error(`🦄 ${error.message}!`, errorToast);
        }
      })
    const getData = async () => {
        const { data } = await axios.get(`${BASEURL}/api/poster/${language}`)
        setData(data.data)
    }
    
    useEffect(() => {
        if(render) setRender(false)
       getData()

    }, [render,language])


    return (
        <div>
            <Jumbotron
                name={"Poster "}
                buttonName={"Add Video"}
            // submitHandler={() => submitHandler()} 
            />
            <AddPosterImageModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                    setSelected()
                }}
                selected={selected}
                setRender={() => setRender(true)}
            />
            <Container>
                <Row>
                    <Col xs={10} lg={10} xl={10}>

                        <Form.Group controlId='brand' className='pb-4'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Content'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Form.Control>

                            <Form.Label>File</Form.Label>

                            <Form.Control
                                type="file"
                                className='file-input-box'
                                size='md'
                                width="50px"
                                name="imageOne"
                                onChange={(e) => uploadFileHandler(e)}
                            ></Form.Control>

                        </Form.Group>
                        <Button onClick={() => addHandler()} variant="success" size="md">Add</Button>
                    </Col>

                </Row>
                <Row className='pt-4'>
                    <Col xs={10} lg={10} xl={10}>
                        {data && data.length > 0 ?
                            data?.map(data => (
                                <Card>
                                    <Row>
                                        <Col xs={6}m lg={6}>
                                <h4>{data.title}</h4>
                                </Col>
                                        <Col xs={6}m lg={6}>
                                    <Button onClick={(e)=>addImageHandler(data._id)} variant='success'>Add Image</Button>
                                    <Button onClick={(e)=>deleteHandler(data._id)}>Delete</Button>
                                    </Col>
                                    </Row>
                                    <Row className='pt-3'>
                                    <Col xs={12} lg={12}>
                                {data?.file?.map(file=>(
                                    <>
                                    <img src={file?.location}/>
                                    <Button onClick={(e)=>deleteImageHandler(file.key,data._id)}>Delete Image</Button>
                                    </>

                                ))}
                                </Col>
                                </Row>
                                </Card>
                            ))
                            : "No Data Found"}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Poster