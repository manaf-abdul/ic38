import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { BASEURL, errorToast, successToast, warningToast } from '../../Constants';
import { CartState } from '../../Context';

const MockTestModal= (props) => {
    console.log("MockTestModal")
    const { category, language } = CartState()

    const [name, setName] = useState('')

    const addHandler = async (selected) => {
        try {
            const { data } = await axios.post(`${BASEURL}/api/livetest/${category}/${language}`, {name:name})
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                props.setRender()
                setName('')
                props.onHide()
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
            }
        } catch (error) {
            toast.error(`${error.message}`,errorToast)
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
                       Add new Mock Test
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
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

export default React.memo(MockTestModal)