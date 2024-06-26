import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Jumbotron from '../Components/Jumbotron'
import { BASEURL, errorToast, successToast, warningToast } from '../Constants'
import { CartState } from '../Context'
import ReactPlayer from 'react-player'

const VideoTutorial = () => {
    const { category, language } = CartState()
    const [file, setFile] = useState()
    const [title, setTitle] = useState('')
    const [data, setData] = useState()
    const [render, setRender] = useState(false)
    const [url, setUrl] = useState("")

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    const addHandler = async (selected) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('name', title)
            formData.append('category', category)
            formData.append('url', url)

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: progressEvent => console.log(progressEvent.loaded)
                }
                const { data } = await axios.post(`${BASEURL}/api/video`, formData, config)
                if (data.errorcode === 0) {
                    toast.success(`🦄 ${data.msg}!`, successToast);
                    setRender(true)
                    // props.onHide()
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

    const deleteHandler = useCallback(async (id) => {
        try {
            const { data } = await axios.post(`${BASEURL}/api/video/delete`,
                { _id: id }
            )
            if (data.errorcode === 0) {
                toast.success(`🦄 ${data.msg}!`, successToast);
                setRender(true)
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
            }
        } catch (error) {
            toast.error(`🦄 ${error.message}!`, errorToast);
        }
    })

    const getData = async () => {
        const { data } = await axios.get(`${BASEURL}/api/video/${category}`)
        setData(data.data)
    }

    useEffect(() => {
        if (render) setRender(false)
        getData()

    }, [render, category])


    return (
        <div>
            <Jumbotron
                name={"Video "}
                buttonName={"Add Video"}
            // submitHandler={() => submitHandler()} 
            />
            <Container>
                <Row>
                    <Col xs={10} lg={10} xl={10}>

                        <Form.Group controlId='brand' className='pb-4'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Content'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Form.Control>

                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Url of Video'
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            ></Form.Control>

                            <Form.Label>File</Form.Label>

                            {/* <Form.Control
                                type="file"
                                className='file-input-box'
                                size='md'
                                width="50px"
                                name="imageOne"
                                onChange={(e) => uploadFileHandler(e)}
                            ></Form.Control> */}

                        </Form.Group>
                        <Button onClick={() => addHandler()} variant="success" size="md">Add</Button>
                    </Col>

                </Row>
                <Row className='pt-4'>
                    <h4 className='text-center'>Video</h4>
                    <Col xs={10} lg={10} xl={10}>
                        {data && data.length > 0 ?
                            data.map(data => (
                                <>
                                    {/* <video width="320" height="240" controls>
                                        <source src={data.url?data.url:data.file.location} />
                                    <source src="https://youtu.be/67dwOanARKc"></source>
                                        <source src="movie.ogg" type="video/ogg">
                                        Your browser does not support the video tag.
                                    </video> */}
                                    <ReactPlayer url={data.url ? data.url : data.file.location} />
                                    <Button onClick={(e) => deleteHandler(data._id)}>Delete</Button>
                                </>
                            ))
                            : "No Data Found"}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default VideoTutorial