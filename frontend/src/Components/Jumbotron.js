import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'

const Jumbotron = (props) => {
    return (
        <div className="jumbotron square p-5 mb-4 ">
            <Row>
                <Col lg={3} className='text-center'>
                  {props.type==="NTestContent" ? 
                    <Link to="/numericaltest" className="btn my-3" style={{backgroundColor:"black",color:"white"}}>
                        Go Back
                    </Link>
                    :
                    props.type==="PTestContent" ? 
                    <Link to="/practisetest" className="btn my-3" style={{backgroundColor:"black",color:"white"}}>
                        Go Back
                    </Link>
                    :
                    props.type==="MTestContent" ? 
                    <Link to="/mocktest" className="btn my-3" style={{backgroundColor:"black",color:"white"}}>
                        Go Back
                    </Link>
                    :
                    props.type==="LTestContent" ? 
                    <Link to="/live-test" className="btn my-3" style={{backgroundColor:"black",color:"white"}}>
                        Go Back
                    </Link>
                    :
                    props.type==="S&S" ? 
                    <Link to="/short-and-simple" className="btn my-3" style={{backgroundColor:"black",color:"white"}}>
                        Go Back
                    </Link>
                    :
                    props.type==="home" ? 
                    ""
                    :
                    <Link to="/" className="btn my-3" style={{backgroundColor:"black",color:"white"}}>
                        Go Back
                    </Link>
                  }
                </Col>
                <Col lg={6} >
                    <h1 className="m-0 p-0 text-center square ">{props.name}</h1>
                </Col>
                {
                    props.buttonName ?
                    <>
                        <Col lg={3} className='text-center'>
                            <Row className='m-2'>
                            <Button size='md' style={{backgroundColor:"#E86100",border:0}} onClick={props.submitHandler}>{props.buttonName} </Button>
                            </Row>
                            <Row className='m-2'>
                        {props.bulkButton && <Button size='md' style={{backgroundColor:"#E86100",border:0}} onClick={props.bulkHandler}>{props.bulkButton} </Button>
                        }</Row>
                        </Col>
                        </>
                        : ""
                }

            </Row>
        </div>
    )
}

export default Jumbotron