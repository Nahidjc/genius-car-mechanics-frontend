import React from "react";
import { baseURL, headers } from "../Services/menu.service";
import Axios from "axios";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { Checkbox, Input } from "@material-ui/core";
import { Input as AntdInput } from "antd";

import "./styles.css";
const AddService = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    submitMenu();
  };

  const submitMenu = () => {
    Axios({
      url: `${baseURL}/services/`,
      method: "POST",
      headers: headers,
      data: {
        name: "nahid",
        description: "bxffffffff",
        price: 300,
        imgUrl: "https://i.ibb.co/dGDkr4v/1.jpg",
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  console.log("Hit Add Service");
  return (
    <div>
      <h1>Add Service</h1>
      <div className="row">
        <div className="col-md-8 m-auto p-5 bg-dark">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <Controller
              render={({ field }) => <AntdInput {...field} />}
              name="lastName"
              control={control}
              defaultValue=""
            />
            <label>Description</label>
            <Controller
              render={({ field }) => <AntdInput {...field} />}
              name="lastName"
              control={control}
              defaultValue=""
            />
            <label>Ice Cream Preference</label>

            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
