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

const NewNumMockTestModal = (props) => {

    const params = useParams()

    const { category, language } = CartState()

    const [file, setFile] = useState()
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const [who, setWho] = useState([]);
    const [o1, seto1] = useState('')
    const [o2, seto2] = useState('')
    const [o3, seto3] = useState('')
    const [o4, seto4] = useState('')
    const [isDelete, setIsDelete] = useState(false)

    const addHandler = async (selected) => {
        try {
            const { data } = await axios.post(`${BASEURL}/api/mocktest/question/add`, { q: question, a: answer, option: who, category: category, language: language, id: params?.id })
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                props?.setRender()
                setAnswer('')
                setQuestion('')
                setWho([])
                props?.onHide()
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
            }
        } catch (error) {
            toast.error(`${error.message}`, errorToast)
        }
    }

    const editSingleHandler = async (selected) => {
        try {
            const { data } = await axios.post(`${BASEURL}/api/mocktest/question/edit`, { q: question, a: answer, o1, o2, o3, o4, category: category, language: language, id: props?.edit?._id })
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                props?.setRender()
                setAnswer('')
                setQuestion('')
                setWho([])
                props?.onHide()
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
            formData.append('id', params.id)
            formData.append('isDelete', isDelete)

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
                }
                const { data } = await axios.post(`${BASEURL}/api/mocktest/question-file`, formData, config)
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
    useEffect(() => {
        if (props.edit) {
            setQuestion(props.edit.q)
            setAnswer(props.edit.a)
            seto1(props.edit.o1 ? props.edit.o1 : null)
            seto2(props.edit.o2 ? props.edit.o2 : null)
            seto3(props.edit.o3 ? props.edit.o3 : null)
            seto4(props.edit.o4 ? props.edit.o4 : null)
        } else {
            setQuestion()
            setAnswer()
            seto1()
            seto2()
            seto3()
            seto4()
        }

    }, [props])


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
                        {props.bulk ? "Add tests" : "Add new test"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.edit ?
                        <>
                            <Row>
                                <Col xs={10} lg={10} xl={10}>

                                    <Form.Group controlId='name'>
                                        <Form.Label>Question</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Content'
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Option 1</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Content'
                                            value={o1}
                                            onChange={(e) => seto1(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Option2 </Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Content'
                                            value={o2}
                                            onChange={(e) => seto2(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Option 3</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Content'
                                            value={o3}
                                            onChange={(e) => seto3(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Option 4</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Content'
                                            value={o4}
                                            onChange={(e) => seto4(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Answer</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Content'
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                        :
                        <Row>
                            <Col xs={10} lg={10} xl={10}>
                                {props.bulk ?
                                    <>
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
                                        <Form.Group controlId='name' className='pt-4 m-1'>
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
                                        </Form.Group>
                                    </>
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

                    }
                </Modal.Body>
                <Modal.Footer className='align-items-center'>
                    {props.bulk ? <Button onClick={() => editHandler()} variant="success" size="md">Upload</Button> :
                        props.edit ? <Button onClick={() => editSingleHandler()} variant="success" size="md">Edit</Button>
                            : <Button onClick={() => addHandler()} variant="success" size="md">Add</Button>
                    }
                    <Button onClick={props.onHide} variant="danger" size="md">No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default NewNumMockTestModal