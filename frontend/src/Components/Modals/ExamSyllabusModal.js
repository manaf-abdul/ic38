import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { BASEURL, errorToast, successToast, warningToast } from '../../Constants';
import { CartState } from '../../Context';

const TerminolgyModal = (props) => {

    const { category, language } = CartState()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    console.log(title,description)

    const addHandler = async (selected) => {
        try {
            const { data } = await axios.post(`${BASEURL}/api/examsyllabus`, { title: title, content: description, superCategory: category })
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
                       Add Exam Syllabus Topic
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={10} lg={10} xl={10}>
                               
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
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer className='align-items-center'>
                        <Button onClick={() => addHandler()} variant="success" size="md">Add</Button>
                    <Button onClick={props.onHide} variant="danger" size="md">No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(TerminolgyModal)