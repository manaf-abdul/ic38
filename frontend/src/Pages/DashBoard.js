import React from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { CartState } from '../Context'
import { Link, useNavigate } from 'react-router-dom'
import Jumbotron from '../Components/Jumbotron'
import StyledCard from '../Components/StyledCard'

const DashBoard = () => {

  const { category, language } = CartState()

  return (
    <>
      <Jumbotron name={"Home"} type={"home"}/>
      <Container >
        <Row className='pt-2 pb-2'>
          <h4>Functionality</h4>
          <Col>
            <StyledCard
              variant={"Primary"}
              header={"Categories"}
              title={"No. Of categories"}
              description={"10"}
            />
          </Col>
          <Col>
            <StyledCard
              variant={"Primary"}
              header={"Language"}
              title={"No. Of languages"}
              description={"10"}
            />
          </Col>
          <Col>
            <StyledCard
              variant={"Primary"}
              header={"Users"}
              title={"No. Of Total Users"}
              description={"10"}
            />
          </Col>
          <Col>
            <StyledCard
              variant={"Primary"}
              header={"Toppers"}
              title={"Live-Exam Top-50"}
              description={"50"}
            />
          </Col>
        </Row>
        <Row className='pt-2 pb-2'>
        
        <h4>Tests</h4>
          <Col>
            <StyledCard
              variant={"Secondary"}
              header={"Live-test"}
              title={"Live-Test"}
              // description={"10"}
            />
          </Col>
          <Col>
            <StyledCard
              variant={"Secondary"}
              header={"Mock-Test"}
              title={"Mock-Test"}
              // description={"10"}
            />
          </Col>
          <Col>
            <StyledCard
              variant={"Secondary"}
              header={"Practise Test"}
              title={"Practise Test"}
              // description={"10"}
            />
          </Col>
          <Col>
            <StyledCard
              variant={"Secondary"}
              header={"Numerical Test"}
              title={"Numerical Test"}
              // description={"10"}
            />
          </Col>
        </Row>
        <Row className='pt-2 pb-2'>
        <h4>Materials</h4>
          <Col>
            <StyledCard
              variant={"Success"}
              header={"Enotes"}
              title={"E-Notes for learning"}
              // description={"10"}
            />
          </Col>
          <Col>
            <StyledCard
              variant={"Success"}
              header={"Exam Syllabus"}
              title={"Syllabus for varous Exams"}
              // description={"10"}
            />
          </Col>
          <Col>
            <StyledCard
              variant={"Success"}
              header={"One-Liners"}
              title={"Info in one-lines"}
              // description={"10"}
            />
          </Col>
          <Col>
            <StyledCard
              variant={"Success"}
              header={"Short & Simple"}
              title={"Short & Simple Infos"}
              // description={"10"}
            />
          </Col>
          <Col>
            <StyledCard
              variant={"Success"}
              header={"Terminology"}
              title={"Terminology Infos"}
              // description={"10"}
            />
          </Col>
        </Row>
        <Row className='pt-2 pb-2'>
        <h4>Other</h4>
          <Col lg={3} xl={3} xxl={3}>
            <StyledCard
              variant={"Info"}
              header={"Video-Tutorial"}
              title={"tutorilas for how to use App"}
              // description={"10"}
            />
          </Col>
          <Col lg={3} xl={3} xxl={3}>
            <StyledCard
              variant={"Info"}
              header={"Poster"}
              title={"Poster Infos"}
              // description={"10"}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default DashBoard