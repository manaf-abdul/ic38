import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CartState } from '../Context'
import { Link, useNavigate } from 'react-router-dom'
import Jumbotron from '../Components/Jumbotron'

const DashBoard = () => {

  const { category, language } = CartState()

  console.log("rendering")
  console.log("category", category)
  console.log("language", language)

  return (
      <Jumbotron name={"Home"} />
  )
}

export default DashBoard