import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CardComponent = ({data}) => {
  return (
    <Link to={`/product`}>
    <Card className="rounded my-3 p-3 productCard mb-3">
      <Card.Body>
        <Card.Title as='div'><strong>{data.name}</strong></Card.Title>
        <Card.Text as='div'>
             {/* <Rating value={product.rating} text={`${product.numReviews} reviews`}/> */}
          </Card.Text>
        <Card.Text as='h5'>
          {/* {product.discountPrice > 0 ? <strike>(${product.price})</strike>:null} */}
          </Card.Text>
      </Card.Body>
    </Card>
    </Link>
  )
}

export default CardComponent