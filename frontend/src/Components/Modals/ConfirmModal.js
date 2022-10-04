import React from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const ConfirmModal = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Confirm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are You sure want to delete ?
            </Modal.Body>
            <Modal.Footer className='align-items-center'>
                <Button onClick={props.deletehandler} variant="danger" size="md">Yes</Button>
                <Button onClick={props.onHide} variant="success" size="md">No</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal