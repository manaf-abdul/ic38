import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import {
  BASEURL,
  errorToast,
  successToast,
  warningToast,
} from "../../Constants";
import { CartState } from "../../Context.js";
import Editor from "../Editor.js";

const UtilityModal = (props) => {
  const { category, language } = CartState();

  const [value, setValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [title, setTitle] = useState("");

  const getValue = (value) => {
    setValue(value);
  };

  const submitHandler = async () => {
    try {
      const { data } = await axios.post(`${BASEURL}/api/utility/add`, {
        content: value,
        item: selectValue,
        category: category,
        language: language,
      });
      if (data.errorcode === 0) {
        toast.success(`🦄 ${data.msg}!`, successToast);
        props.setRender();
        setValue("");
        setTitle("");
        props.onHide();
      } else {
        toast.warn(`🦄 ${data.msg}!`, warningToast);
      }
    } catch (error) {
      toast.error(`${error.message}`, errorToast);
    }
  };
  console.log(selectValue);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Form.Select
          aria-label="Default select example"
          onClick={(e) => setSelectValue(e.target.value)}
        >
          <option>Select data to Add</option>
          <option value="ExamFees">ExamFees</option>
          <option value="HallTicket">HallTicket</option>
          <option value="ScoreCard">ScoreCard</option>
          <option value="Instruction">Instruction</option>
        </Form.Select>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title id="contained-modal-title-vcenter">
          Add {selectValue}
        </Modal.Title>
        <Row>
          <Col xs={10} lg={10} xl={10}>
            <Editor
              initialValue={"<b>type your story HERE!!!!</b>"}
              getValue={getValue}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="align-items-center">
        <Button onClick={submitHandler} variant="success" size="md">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UtilityModal;
