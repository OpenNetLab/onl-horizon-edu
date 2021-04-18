import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

export default function Check(props) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handleCheck() {
    localStorage.setItem("userId", userId);
    localStorage.setItem("password", password);
    console.log(localStorage);
    axios.get("https://edu.opennetlab.org/getTask", {
      params: {
        userId: userId,
        key: password,
      }
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("clientLog", res.data.client_log);
        localStorage.setItem("cdnLog", res.data.cdn_log);
        localStorage.setItem("dnsLog", res.data.dns_log);
        localStorage.setItem("message", res.data.message);
        localStorage.setItem("submitTime", res.data.upload_time);
        localStorage.setItem("uid", res.data.uid);
        localStorage.setItem("status", res.data.status);
        history.push("/result");
        // localStorage.clear();
        console.log(localStorage);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleIdChange(e) {
    setUserId(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="checkbox">
      <p className="title">
        Personal Info
      </p>
      <p className="description bold margin-top">
        Student ID*
        &nbsp;
        &nbsp;
        <input type="text" value={userId} onChange={handleIdChange} />
      </p>
      <p className="description bold">
        Password*
        &nbsp;
        &nbsp;
        &nbsp;
        <input type="password" value={password} onChange={handlePasswordChange} />
      </p>
      <a className="check" onClick={handleCheck}>Check</a>
    </div>
  );
}