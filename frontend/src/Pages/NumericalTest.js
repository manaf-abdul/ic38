import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Jumbotron from '../Components/Jumbotron'
import { BASEURL } from '../Constants'

const NumericalTest = () => {
    const [language, setLanguage] = useState([])


    const getCategoryData = useCallback(async () => {
        const { data } = await axios.get(`${BASEURL}/api/language`)
        console.log("Category data", data)
        setLanguage(data.data)
    }, [])

    useEffect(() => {
        getCategoryData()
    }, [])

    return (
        <>
            <Jumbotron
                name={"Numerical Test "}
                buttonName={"Add Numerical Test"}
            // submitHandler={() => submitHandler()} 
            />
            <Container>
                <Row>
                    {
                        language && language.length > 0 ?
                            language.map(cate => (
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
                            "Categories Empty"
                    }
                </Row>
            </Container>
        </>
    )
}

export default NumericalTest