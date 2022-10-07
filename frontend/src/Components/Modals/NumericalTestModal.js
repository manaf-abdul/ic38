import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { errorToast, successToast, warningToast } from '../../Constants';
import { CartState } from '../../Context';
import { produce } from "immer";
import { generate } from "shortid";
import { useParams } from 'react-router-dom';

const NumericalTestModal = (props) => {

    const params=useParams()

    const { category, language } = CartState()

    const [file, setFile] = useState()
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const [who, setWho] = useState([]);
    console.log("whooooooo", who)

    const addHandler = async (selected) => {
        try {
            const { data } = await axios.post(`http://localhost:5002/api/numericaltest/question/add`, { q: question, a: answer, option: who, category: category, language: language,id:params.id })
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                // props?.setRender()
                // setAnswer('')
                // setQuestion('')
                // setWho([])
                // props?.onHide()
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
                const { data } = await axios.post(`http://localhost:5002/api/terminology`, formData, config)
                if (data.errorcode === 0) {
                    toast.success(`🦄 ${data.msg}!`, successToast);
                    props?.setRender()
                    setAnswer('')
                    setQuestion('')
                    setWho([])
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
                        {props.bulk ? "Add tests" : "Add new test"}
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
                                        <Form.Label>Question</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Content'
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='brand' className='pb-4'>
                                        <Form.Label>Options</Form.Label>
                                        {who && who.map((p, index) => {
                                            return (
                                                <div key={p._id}>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group controlId='name' className='pt-1'>
                                                                <Form.Label>Options</Form.Label>
                                                                <Form.Control
                                                                    onChange={e => {
                                                                        const options = e.target.value;
                                                                        setWho(currentPeople =>
                                                                            produce(currentPeople, v => {
                                                                                v[index].options = options;
                                                                            })
                                                                        );
                                                                    }}
                                                                    value={p.options}
                                                                    placeholder="Question"
                                                                ></Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg={1}>
                                                            <Button className='mt-4'
                                                                onClick={() => {
                                                                    setWho(currentPeople =>
                                                                        currentPeople.filter(x => x._id !== p._id)
                                                                    );
                                                                }}
                                                            >
                                                                x
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            );
                                        })}
                                        {
                                            who.length >= 4 ? "Max. 4 option available"
                                                :
                                                <Button
                                                    className='mt-3'
                                                    onClick={() => {
                                                        setWho(currentPeople => [
                                                            ...currentPeople,
                                                            {
                                                                _id: generate(),
                                                            }
                                                        ]);
                                                    }}
                                                >
                                                    Add Option
                                                </Button>
                                        }

                                    </Form.Group>

                                    <Form.Group controlId='brand' className='pb-4'>
                                        <Form.Label>Answer</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Content'
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
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

export default React.memo(NumericalTestModal)