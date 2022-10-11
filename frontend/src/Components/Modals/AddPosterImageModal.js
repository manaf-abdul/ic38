import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { BASEURL, errorToast, successToast, warningToast } from '../../Constants';
import { CartState } from '../../Context';

const AddPosterImageModal = (props) => {
    console.log(props)
    const [file, setFile] = useState()

    const addHandler = async (selected) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('id', props.selected)

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
                }
                const { data } = await axios.post(`${BASEURL}/api/poster/add-image`, formData, config)
                if (data.errorcode === 0) {
                    toast.success(`🦄 ${data.msg}!`, successToast);
                    props?.setRender()
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
  return (
    <Modal
    {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
>

    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
           Add IMage
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <>
            <Form.Group controlId='name'>
                <Form.Label>Image</Form.Label>

                <Form.Control
                    type="file"
                    className='file-input-box'
                    size='md'
                    width="50px"
                    name="imageOne"
                    onChange={(e) => uploadFileHandler(e)}
                ></Form.Control>
            </Form.Group>
            
        </>
    </Modal.Body>
    <Modal.Footer className='align-items-center'>
        <Button onClick={() => addHandler()} variant="success" size="md">Add</Button>

        <Button onClick={props.onHide} variant="danger" size="md">No</Button>
    </Modal.Footer>
</Modal>
  )
}

export default AddPosterImageModal