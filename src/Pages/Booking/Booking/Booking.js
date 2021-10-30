import React, { useState } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import { baseURL, headers } from "../../Home/Services/menu.service";
import { Button, Modal } from "react-bootstrap";
const Booking = () => {
  const { serviceId } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const removeService = () => {
    Axios({
      url: `${baseURL}/delete-service/${serviceId}/`,
      headers: headers,
      method: "DELETE",
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = () => {
    Axios({
      url: `${baseURL}/service/${serviceId}/`,
      headers: headers,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data);
        const Data = res.data;
        setName(Data.name);
        setPrice(Data.price);
        setImgUrl(Data.imgUrl);
        setDescription(Data.description);
        handleShow();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>this is booking: {serviceId}</h2>

      <button
        onClick={getData}
        type="button"
        className="btn btn-primary btn-sm"
      >
        Edit Service
      </button>
      <button
        type="button"
        onClick={removeService}
        className="btn btn-danger btn-sm ms-3"
      >
        delete
      </button>

      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Booking;
