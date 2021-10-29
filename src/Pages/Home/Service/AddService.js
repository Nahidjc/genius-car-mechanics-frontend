import React, { useState } from "react";
import { baseURL, headers } from "../Services/menu.service";
import Axios from "axios";
import "./styles.css";
const AddService = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, price, imgUrl, description);
    e.target.reset();
    submitMenu();
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
  const submitMenu = () => {
    Axios({
      url: `${baseURL}/services/`,
      method: "POST",
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

  return (
    <div>
      <h1>Add Service</h1>
      <div className="row">
        <div className="col-md-5 m-auto p-5 shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <input
                onBlur={handleName}
                type="text"
                name="name"
                id="form4Example1"
                className="form-control border"
              />
              <label className="form-label" htmlFor="form4Example1">
                Name
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                onBlur={handlePrice}
                type="number"
                name="price"
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
                onBlur={handleImgUrl}
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
                onBlur={handleDescription}
                name="description"
              ></textarea>
              <label className="form-label" htmlFor="form4Example3">
                Description
              </label>
            </div>

            <div className="form-check d-flex justify-content-center mb-4">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
                id="form4Example4"
              />
              <label className="form-check-label" htmlFor="form4Example4">
                Send me a copy of this message
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              POST
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
