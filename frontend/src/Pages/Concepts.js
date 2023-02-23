import React, { useState, useCallback, useEffect } from "react";
import Jumbotron from "../Components/Jumbotron";
import ConfirmModal from "../Components/Modals/ConfirmModal";
import ConceptsChapterModal from "../Components/Modals/ConceptsChapterModal";
import { BASEURL, errorToast, successToast, warningToast } from "../Constants";
import { CartState } from "../Context";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Concepts = () => {
  const { category, language } = CartState();
  const [onelinerData, setOneLinerData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [name, setName] = useState("");
  const [render, setRender] = useState(false);
  const [x, setX] = useState();
  const [edit, setEdit] = useState("");
  const [bulk, setBulk] = useState(false);
  const submitHandler = () => {
    setModalShow(true);
  };

  const deleteHandler = useCallback(async (z) => {
    setConfirmModalShow(true);
    setX(z);
  });

  const deletehandler = useCallback(async () => {
    try {
      const { data } = await axios.post(`${BASEURL}/api/concepts/delete`, {
        _id: x._id,
        name: name,
        category: x.superCategory,
        language: x.language,
      });
      if (data.errorcode === 0) {
        toast.success(`🦄 ${data.msg}!`, successToast);
        setRender(true);
        setConfirmModalShow(false);
      } else {
        toast.warn(`🦄 ${data.msg}!`, warningToast);
      }
    } catch (error) {
      toast.error(`🦄 ${error.message}!`, errorToast);
    }
  });
  console.log(onelinerData);

  const editHandler = async (e) => {
    try {
      const { data } = await axios.post(`${BASEURL}/api/concepts/edit`, {
        _id: e._id,
        name: name,
        category: e.superCategory,
        language: e.language,
      });
      if (data.errorcode === 0) {
        toast.success(`🦄 ${data.msg}!`, successToast);
        setRender(true);
        setEdit();
      } else {
        toast.warn(`🦄 ${data.msg}!`, warningToast);
      }
    } catch (error) {
      toast.error(`🦄 ${error.message}!`, errorToast);
    }
  };
  const fetchData = async () => {
    console.log("----", category, language);
    const { data } = await axios.get(
      `${BASEURL}/api/concepts/${category}/${language}`
    );
    setOneLinerData(data.data);
  };
  useEffect(() => {
    setEdit();
    if (render) setRender(false);

    fetchData();
  }, [category, language, render]);
  return (
    <>
      <Jumbotron
        name={"Concepts"}
        buttonName={"Add Concept Chapter"}
        submitHandler={() => submitHandler()}
      />
      <Container>
        <ConceptsChapterModal
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setBulk(false);
          }}
          setRender={() => setRender(true)}
          bulk={bulk}
        />

        <ConfirmModal
          show={confirmModalShow}
          onHide={() => setConfirmModalShow(false)}
          deletehandler={() => deletehandler()}
        />
        <Row className="m-2">
          {onelinerData && onelinerData.length > 0 ? (
            onelinerData.map((x, index) => (
              <Col key={x._id} sm={12} md={6} lg={6} xl={6} className="pb-3">
                <Card key={x._id}>
                  <Card.Body>
                    <Row>
                      <Col>
                        {edit == index ? (
                          <>
                            <Form.Label>Content</Form.Label>

                            <InputGroup className="mb-3">
                              <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                              ></Form.Control>
                              <Button
                                className="mx-1"
                                variant="success"
                                size="sm"
                                onClick={(e) => editHandler(x)}
                              >
                                Save
                              </Button>
                              <Button
                                className="mx-1"
                                variant="danger"
                                size="sm"
                                onClick={() => setEdit()}
                              >
                                Cancel
                              </Button>
                            </InputGroup>
                          </>
                        ) : (
                          <Link to={`${x._id}`}>
                            <Card.Text className="h4">
                              {x.chapterTitle}
                            </Card.Text>
                          </Link>
                        )}
                      </Col>
                      <Col className="d-flex justify-content-end">
                        {edit == index ? (
                          <Col>
                            {/* <Button className='m-2 mt-4' variant='success' size="sm" onClick={(e) => editHandler(x)}>Save</Button>
                      <Button className='m-2 mt-4' variant='danger' size="sm" onClick={() => setEdit()}>Cancel</Button> */}
                          </Col>
                        ) : (
                          <>
                            <Button
                              className="m-2"
                              variant="success"
                              size="sm"
                              onClick={() => {
                                setEdit(index);
                                setName(x.chapterTitle);
                                {
                                  console.log("x.content", x.name);
                                }
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className="m-2"
                              variant="danger"
                              size="sm"
                              onClick={() => deleteHandler(x)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h4 className="text-center">No Data Found</h4>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Concepts;
