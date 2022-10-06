import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Jumbotron from '../Components/Jumbotron'
import NumericalTestModal from '../Components/Modals/NumericalTestModal'
import { BASEURL, errorToast, successToast, warningToast } from '../Constants'
import { CartState } from '../Context'

const ShortAndSimpleContent = () => {
    const { category, language } = CartState()
    const params=useParams()
    const [numericalTestData, setNumericalTestData] = useState([])
    const [edit, setEdit] = useState('')
    const [name, setName] = useState('')
    const [render, setRender] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [bulk, setBulk] = useState(false)


    const fetchData = useCallback(async () => {
        const { data } = await axios.get(`${BASEURL}/api/numericaltest/${category}/${language}/${params.id}`)
        console.log("data", data)
        setNumericalTestData(data.data)
    }, [])

    const editHandler = async () => {
        console.log(name)
        try {
            const { data } = await axios.post('http://localhost:5002/api/short-and-simple/data/edit',
                name)
            if (data.errorcode === 0) {
                console.log("inside");
                toast.success(`🦄 ${data.msg}!`, successToast);
                setRender(true)
                setEdit()
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
            }
        } catch (error) {
            toast.error(`🦄 ${error.message}!`, errorToast);
        }
    }

    const deleteHandler = async (x) => {
        try {
            const { data } = await axios.post('http://localhost:5002/api/short-and-simple/data/delete',
                x)
            if (data.errorcode === 0) {
                console.log("inside");
                toast.success(`🦄 ${data.msg}!`, successToast);
                setRender(true)
                setEdit()
            } else {
                toast.warn(`🦄 ${data.msg}!`, warningToast);
            }
        } catch (error) {
            toast.error(`🦄 ${error.message}!`, errorToast);
        }
    }
    const submitHandler = () => {
        setModalShow(true)
    }

    const bulkHandler = () => {
        setBulk(true)
        setModalShow(true)
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setName((values) => ({
            ...values,
            [name]: value,
        }));
    };

    console.log("nameeeee", name)

    useEffect(() => {
        if (render) setRender(false)
        setEdit()
        fetchData()
    }, [category,language,render])

    return (
        <>
            <Jumbotron
                name={"Short & Simple "}
                buttonName={"Add/Edit"}
                bulkButton={'Bulk Add'}
                submitHandler={() => submitHandler()}
                bulkHandler={() => bulkHandler()}
            />
            <NumericalTestModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                    setBulk(false)
                }}
                setRender={() => setRender(true)}
                bulk={bulk}
            />

            <Container>
                {/* {console.log(numericalTestData?.length)}
                {numericalTestData ? numericalTestData.map(term => (
                    console.log("inside.........")
                //   <p>{term.name}</p>
                ))
                    :
                    console.log("outside.........")
                    // <h4 className='text-center'>No Data Found</h4>
                } */}
            </Container>
        </>
    )
}

export default ShortAndSimpleContent