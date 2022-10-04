import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { successToast, warningToast } from '../../Constants';
import { CartState } from '../../Context';

const OneLinerModal = (props) => {

    const { category, language } = CartState()

    const [file, setFile] = useState()

    const editHandler = async (selected) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
                }
                const { data } = await axios.post(`http://localhost:5002/api/one-liners/${category}/${language}`, formData)
                if (data.errorcode === 0) {
                    // toast.success(`🦄 ${data.msg}!`, successToast);
                } else {
                    // toast.warn(`🦄 ${data.msg}!`, warningToast);
                }
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
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
                        Add/Edit One-Liners
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={10} lg={10} xl={10}>
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
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer className='align-items-center'>
                    <Button onClick={() => editHandler()} variant="success" size="md">Upload</Button>
                    <Button onClick={props.onHide} variant="danger" size="md">No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default React.memo(OneLinerModal)