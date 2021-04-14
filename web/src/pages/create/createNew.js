import React, {useState} from "react";
import {message} from "antd";
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CreateNew () {
  const [createStatus, setCreateStatus] = useState(0);
  const history = useHistory();

  function handleSubmit () {
    let form = document.querySelector("#fileForm");
    let formData = new FormData(form);
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("key", localStorage.getItem("password"));
    console.log(formData);
    axios.post("https://edu.opennetlab.org/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then((res) => {
        console.log(res);
        setCreateStatus(res.data.status);
        if (createStatus === 0) {
          message.success("Submitted successfully !");
          history.push("/result");
        } else if (createStatus === 1) {
          message.error("Invalid username or key !");
        } else if (createStatus === 2) {
          message.warning("Your last submitted task did not finish !");
        } else {
          message.error("No file selected or wrong file type (must be *.py) !");
        }
        // history.push("/submitSul");
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="checkbox">
      <p className="title">
        Experiment Info
      </p>
      <form id="fileForm">
        <p className="description bold margin-top">DNS Upload*</p>
        <input type="file" name="dns" />
        <p className="description bold margin-top">CDN Upload*</p>
        <input type="file" name="cdn" />
      </form>
      <a className="check" onClick={handleSubmit}>Submit</a>
    </div>
  );
}