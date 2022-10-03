import React from 'react'
import {Container} from 'react-bootstrap'
import {CartState} from '../Context'

const DashBoard = () => {

  const {category,language}=CartState()

  console.log("rendering")
  console.log("category",category)
  console.log("language",language)

  return (
    <Container>
    <div>DashBoard {category} {language}</div>
    </Container>
  )
}

export default DashBoard