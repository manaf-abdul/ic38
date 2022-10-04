import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { errorToast, successToast, warningToast } from '../../Constants';
import { CartState } from '../../Context';

const TerminolgyModal = (props) => {

    const { category, language } = CartState()

    const [file, setFile] = useState()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const addHandler = async (selected) => {
        try {
            const { data } = await axios.post(`http://localhost:5002/api/terminology/add`, { title: title, description: description, category: category,language:language })
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                props.setRender()
                setDescription('')
                setTitle('')
                props.onHide()
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
            }
        } catch (error) {
            toast.error(`${error.message}`, errorToast)
        }
    }

    const editHandler = async (selected) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('language', language)
            formData.append('superCategory', category)

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
                }
                const { data } = await axios.post(`http://localhost:5002/api/terminology`, formData)
                if (data.errorcode === 0) {
                    toast.success(`🦄 ${data.msg}!`, successToast);
                    props.setRender()
                    setTitle('')
                    setDescription('')
                    props.onHide()
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

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    return (
        <>
            {/* <ToastContainer /> */}
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.bulk ? "Add/Edit One-Liners" : "Add new One-Liner"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={10} lg={10} xl={10}>
                            {props.bulk ?
                                <Form.Group controlId='name'>
                                    <Form.Label>File</Form.Label>

                                    <Form.Control
                                        type="file"
                                        className='file-input-box'
                                        size='md'
                                        width="50px"
                                        name="imageOne"
                                        onChange={(e) => uploadFileHandler(e)}
                                        accept=".xlsx"
                                    ></Form.Control>
                                </Form.Group>
                                :
                                <>
                                    <Form.Group controlId='brand' className='pb-4'>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Content'
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='brand' className='pb-4'>
                                        <Form.Label>description</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Content'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </>
                            }
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer className='align-items-center'>
                    {props.bulk ? <Button onClick={() => editHandler()} variant="success" size="md">Upload</Button>
                        : <Button onClick={() => addHandler()} variant="success" size="md">Add</Button>
                    }
                    <Button onClick={props.onHide} variant="danger" size="md">No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(TerminolgyModal)