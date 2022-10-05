import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Jumbotron from '../Components/Jumbotron'
import NumericalTestModal from '../Components/Modals/NumericalTestModal'
import { BASEURL } from '../Constants'
import { CartState } from '../Context'

const NumericalTest = () => {
    const { category, language } = CartState()
    const [testData, setTestData] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [bulk, setBulk] = useState(false)
    const [render, setRender] = useState(false)

    const getTestData = useCallback(async () => {
        const { data } = await axios.get(`${BASEURL}/api/numericaltest/${category}/${language}`)
        console.log("Category data", data)
        setTestData(data.data)
    }, [])

    const submitHandler = () => {
        setModalShow(true)
    }
    const bulkHandler = () => {
        setBulk(true)
        setModalShow(true)
    }

    useEffect(() => {
        getTestData()
    }, [])

    return (
        <>
            <Jumbotron
                name={" Test xxxx"}
                buttonName={"Add Test"}
                bulkButton={'Bulk Add'}
                submitHandler={() => submitHandler()}
                bulkHandler={() => bulkHandler()}

            />
            <NumericalTestModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                    setBulk(false)
                }}
                setRender={() => setRender(true)}
                bulk={bulk}
            />
            <Container>
                <Row>
                    {
                        testData && testData.length > 0 ?
                            testData.map(cate => (
                                <Col key={cate._id} sm={12} md={6} lg={4} xl={3}>
                                    <Card className="rounded my-3 p-3 productCard mb-3">
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <Card.Title as='div'><strong>{cate.name}</strong></Card.Title>
                                                </Col>
                                                <Col className='d-flex justify-content-end'>
                                                    <Button>Edit</Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                            :
                            "Test Empty"
                    }
                </Row>
            </Container>
        </>
    )
}

export default NumericalTest