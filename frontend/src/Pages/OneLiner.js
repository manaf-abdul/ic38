import axios from 'axios'
import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { CartState } from '../Context'

const OneLiners = () => {
  const { category, language } = CartState()

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`https://ic38.herokuapp.com/api/one-liners/${category}/${language}`)
      console.log("data", data)
    }
    fetchData()
  }, [])
  return (
    <Container>
        


    </Container>
  )
}

export default OneLiners