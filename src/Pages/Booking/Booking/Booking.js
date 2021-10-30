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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, price, imgUrl, description);
    e.target.reset();
    updateService();
    handleClose();
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleImgUrl = (e) => {
    setImgUrl(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateService = () => {
    console.log(name, description);
    Axios({
      url: `${baseURL}/service/${serviceId}/`,
      method: "PUT",
      headers: headers,
      data: {
        name: name,
        description: description,
        price: price,
        imgUrl: imgUrl,
      },
    })
      .then((response) => {
        setName("");
        setPrice(0);
        setImgUrl("");
        setDescription("");
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
          <Modal.Title>Edit {name} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <input
                onChange={handleName}
                type="text"
                name="name"
                id="form4Example1"
                value={name}
                className="form-control border"
              />
              <label className="form-label" htmlFor="form4Example1">
                Name
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                onChange={handlePrice}
                type="number"
                name="price"
                value={price}
                id="form4Example2"
                className="border form-control"
              />
              <label className="form-label" htmlFor="form4Example2">
                Price
              </label>
            </div>
            <div className="form-outline mb-4">
              <input
                type="text"
                onChange={handleImgUrl}
                value={imgUrl}
                id="form4Example2"
                name="imgUrl"
                className="border form-control"
              />
              <label className="form-label" htmlFor="form4Example2">
                Image Url
              </label>
            </div>

            <div className="form-outline mb-4">
              <textarea
                className="border form-control"
                id="form4Example3"
                rows="4"
                onChange={handleDescription}
                value={description}
                name="description"
              ></textarea>
              <label className="form-label" htmlFor="form4Example3">
                Description
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Updated
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Booking;
