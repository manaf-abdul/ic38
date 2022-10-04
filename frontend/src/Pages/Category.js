import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Jumbotron from '../Components/Jumbotron'
import { BASEURL } from '../Constants'

const Category = () => {
    const [category, setCategory] = useState([])

    console.log(category)

    const getCategoryData = useCallback(async () => {
        const { data } = await axios.get(`${BASEURL}/api/supercategories`)
        console.log("Category data", data)
        setCategory(data.data)
    }, [])

    useEffect(() => {
        getCategoryData()
    }, [])

    return (
        <>
            <Jumbotron
                name={"Categories"}
                buttonName={"Add Category"}
            // submitHandler={() => submitHandler()} 
            />
            <Container>
                <Row>
                    {
                        category && category.length > 0 ?
                            category.map(cate => (
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

export default Category