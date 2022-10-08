import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { BASEURL, errorToast, successToast, warningToast } from '../../Constants';
import { CartState } from '../../Context';
import { produce } from "immer";
import { generate } from "shortid";
import { useParams } from 'react-router-dom';

const QuestionModal = (props) => {

    console.log("props", props)

    const params = useParams()

    const { category, language } = CartState()

    const [file, setFile] = useState()
    const [name, setName] = useState('')

    const addHandler = async (selected) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('language', language)
            formData.append('superCategory', category)
            formData.append('name', name)

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
                }
                const { data } = await axios.post(`${BASEURL}/api/numericaltest/file`, formData, config)
                if (data.errorcode === 0) {
                    toast.success(`🦄 ${data.msg}!`, successToast);
                    props?.setRender()
                    setName('')
                    setFile()
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
    // useEffect(() => {
    //     if (props.edit) {
    //         console.log("INSIDEEEEEEEEEE")
    //     } else {
           
    //     }

    // }, [props])


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.bulk ? "Add tests" : "Add new test"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>

                        <Form.Control
                             type='text'
                             placeholder='Enter Content'
                             value={name}
                             onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
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
                    {/* <Form.Group controlId='name' className='pt-4 m-1'>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            checked={isDelete ? true : false}
                            value={isDelete}
                            label={isDelete ? <span style={{ color: "red", fontWeight: "bold" }}>CAUTION : The previous data will be erased and the new data will be overwritten</span>
                                : <span style={{}}>Delete previous datas</span>
                            }
                            onChange={(e) => setIsDelete(!isDelete)}
                        />
                    </Form.Group> */}
                </>
            </Modal.Body>
            <Modal.Footer className='align-items-center'>
                <Button onClick={() => addHandler()} variant="success" size="md">Add</Button>

                <Button onClick={props.onHide} variant="danger" size="md">No</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default QuestionModal