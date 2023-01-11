import React from 'react'
import { Card } from 'react-bootstrap'

const StyledCard = (props) => {
    return (
        <Card
          bg={props.variant.toLowerCase()}
          text={props.variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-2"
        >
          <Card.Header>{props.header}</Card.Header>
          <Card.Body>
            <Card.Title className='text-center'>{props.title}</Card.Title>
            <Card.Text className='text-center'>
              {props.description}
            </Card.Text>
          </Card.Body>
        </Card>
    )
}

export default StyledCard