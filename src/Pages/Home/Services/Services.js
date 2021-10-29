// import axios from "axios";
import React, { useEffect, useState } from "react";
import Service from "../Service/Service";
import "./Services.css";
import { baseURL, headers } from "./menu.service";
import Axios from "axios";
const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const getpost = () => {
      Axios({
        url: `${baseURL}/services/`,
        headers: headers,
        method: "GET",
      })
        .then((res) => {
          console.log(res.data);
          setServices(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getpost();
  }, []);

  return (
    <div id="services">
      <h2 className="text-primary mt-5">Our services</h2>
      <div className="service-container">
        {services.map((service) => (
          <Service key={service.id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
