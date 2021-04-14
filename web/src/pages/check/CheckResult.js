import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import "../../styles/result.css";
import axios from "axios";
import {message} from "antd";

export default function CheckResult () {
  const [isCreateStatus, setIsCreateStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("status") == 1 || localStorage.getItem("status") == 2) {
      setIsCreateStatus(false);
    } else {
      setIsCreateStatus(true);
    }
  })

  function handleRefresh () {
    axios.get("https://edu.opennetlab.org/getTask", {
      params: {
        userId: localStorage.getItem("userId"),
        key: localStorage.getItem("password"),
      }
    },{
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
        // setIsCreateStatus(localStorage.getItem("status"));
        history.push("/result");
        // localStorage.clear();
        message.success("Refresh succeed !");
        console.log(localStorage);
      })
      .catch((err) => {
        console.log(err);
        message.error("Refresh failed !");
      })
  }

  function handleCreateNew () {
    if (isCreateStatus == false) {
      message.warn("You can not create new task on this status !");
      return;
    } else {
      message.success("You can create new task on this status !");
      history.push("/create");
    }
  }

  return (
    <div className="checkbox">
      <div className="title-container">
        <div className="title">
          Last Submission
        </div>
        <a className="bottom" onClick={handleRefresh}>Refresh</a>
        <a className="bottom" onClick={handleCreateNew}>Create New</a>
      </div>
      <div className="status-container">
        <div className="status">
          <div>
            <p className="key">Experiment ID</p>
            <p className="key">Submitted Time</p>
            <p className="key">Status</p>
          </div>
          <div>
            <p className="key padding-left">{localStorage.getItem("uid")}</p>
            <p className="key padding-left">{localStorage.getItem("submitTime")}</p>
            <p className="key padding-left">{localStorage.getItem("message")}</p>
          </div>
        </div>
        <div className="download">
          <div>
            <p className="key">DNS Log</p>
            <p className="key">CDN Log</p>
            <p className="key">Client Log</p>
          </div>
          <div className="bottom-container">
            <a href={localStorage.getItem("dnsLog")} className="dl-bottom">Download</a>
            <a href={localStorage.getItem("cdnLog")} className="dl-bottom margin-top-dl">Download</a>
            <a href={localStorage.getItem("clientLog")} className="dl-bottom margin-top-dl">Download</a>
          </div>
        </div>
      </div>
    </div>
  );
}