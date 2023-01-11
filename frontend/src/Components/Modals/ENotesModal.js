import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { BASEURL, errorToast, successToast, warningToast } from '../../Constants';
import { CartState } from '../../Context.js';
import Editor from '../Editor.js'

const ENotesModal = (props) => {
    const { category, language } = CartState()

    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')

    const getValue = (value) => {
        setValue(value);
    };

    const submitHandler = async () => {
        try {
            const { data } = await axios.post(`${BASEURL}/api/enotes/add`, { content: value, title: title, category: category, language: language })
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                props.setRender()
                setValue('')
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
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add E-Notes
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={10} lg={10} xl={10}>

                        <Form.Group controlId='brand' className='pb-4'>
                            <Form.Label>name of the test</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Content'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Editor initialValue={'<b>type your story HERE!!!!</b>'} getValue={getValue} />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className='align-items-center'>
                <Button onClick={submitHandler} variant="success" size="md">Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ENotesModal