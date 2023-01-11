import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { BASEURL, errorToast, successToast, warningToast } from '../../Constants';
import { CartState } from '../../Context';

const NewCatAndLangModal = (props) => {
    const { category, language } = CartState()

    const [name, setName] = useState('')

    const addLangHandler = async (selected) => {
        try {
            const { data } = await axios.post(`${BASEURL}/api/language`, { name: name })
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                props.setRender()
                setName('')
                props.onHide()
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
            }
        } catch (error) {
            toast.error(`${error.message}`, errorToast)
        }
    }

    const addCatHandler = async (selected) => {
        try {
            const { data } = await axios.post(`${BASEURL}/api/supercategories`, { name: name })
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                props.setRender()
                setName('')
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
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.lang ? "Add New Language" : "Add New Category"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={10} lg={10} xl={10}>

                            <Form.Group controlId='brand' className='pb-4'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Content'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer className='align-items-center'>

                    {props.lang ? <Button onClick={() => addLangHandler()} variant="success" size="md">Add Language</Button>
                        : props.cat ? <Button onClick={() => addCatHandler()} variant="success" size="md">Add Category</Button>
                            : ""}

                    <Button onClick={props.onHide} variant="danger" size="md">No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(NewCatAndLangModal)