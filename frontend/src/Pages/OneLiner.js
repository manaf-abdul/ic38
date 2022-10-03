import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Accordion, Card, Container } from 'react-bootstrap'
import Jumbotron from '../Components/Jumbotron'
import OneLinerModal from '../Components/Modals/OneLinerModal'
import { CartState } from '../Context'

const OneLiners = () => {
  const { category, language } = CartState()
  const [onelinerData, setOneLinerData] = useState()
  const [modalShow, setModalShow] = useState(false)

  const submitHandler = () => {
    setModalShow(true)
  }

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`https://ic38.herokuapp.com/api/one-liners/${category}/${language}`)
      console.log("data", data)
      setOneLinerData(data.data)
    }
    fetchData()
  }, [category, language])
  return (
    <>
      <h1>Category : {category}   language:{language}</h1>

      <Jumbotron
        name={"One-Liners"}
        buttonName={"Add/Edit Oneliner"}
        submitHandler={() => submitHandler()} />

      <Container>

        <OneLinerModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        // setRender={() => setRender(true)}
        />

        {onelinerData && onelinerData.map((x, index) => (
          <Card key={x._id}>
            <Card.Body>
              <Card.Text>{x.content}</Card.Text>
            </Card.Body>
          </Card>
        )
        )}

      </Container>
    </>
  )
}

export default OneLiners