import Header from "./pages/components/Header";
import tacNote from "./assets/TecNotes.png";
import Footer from "./pages/components/Footer";
import React, { useState } from "react";
import "./styles/home.css";
import "./styles/footer.css";
import "./styles/header.css";
import "./styles/result.css";
import axios from "axios";
import { message, Button, Modal } from "antd";
import 'antd/dist/antd.css';
import { getTask, upload } from './backend/api';

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  // check
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  // log href state
  const [clientLog, setClientLog] = useState("");
  const [cdnLog, setCdnLog] = useState("");
  const [dnsLog, setDnsLog] = useState("");

  const [info, setInfo] = useState("");
  const [submitTime, setSubmitTime] = useState("");
  const [uid, setUid] = useState("");

  const [isDownloadStatus, setIsDownloadStatus] = useState(false);

  function handleCheck() {
    localStorage.setItem("userId", userId);
    localStorage.setItem("password", password);
    getTask(userId, password)
      .then((res) => {
        console.log(res);
        setClientLog(res.client_log);
        setCdnLog(res.cdn_log);
        setDnsLog(res.dns_log);
        setInfo(res.message);
        setSubmitTime(res.upload_time);
        setUid(res.uid);
        setStatus(res.status);
        // localStorage.setItem("clientLog", res.client_log);
        // localStorage.setItem("cdnLog", res.cdn_log);
        // localStorage.setItem("dnsLog", res.dns_log);
        // localStorage.setItem("message", res.message);
        // localStorage.setItem("submitTime", res.upload_time);
        // localStorage.setItem("uid", res.uid);
        localStorage.setItem("status", res.status);
        if (localStorage.getItem("status") == 1) {
          message.error("Invalid username or key");
          setIsDownloadStatus(false);
          setIsCreateStatus(false);
        } else if (localStorage.getItem("status") == 2) {
          setCurrentStep(1);
          setIsDownloadStatus(false);
          message.warning("Your task is waiting in line");
          setIsCreateStatus(false);
        } else if (localStorage.getItem("status") == 3) {
          setIsCreateStatus(true);
          setIsDownloadStatus(false);
          setCurrentStep(1);
          message.warning("You haven't submitted any task yet");
        } else {
          setIsDownloadStatus(true);
          setIsCreateStatus(true);
          setCurrentStep(1);
        }
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

  // result
  const [isCreateStatus, setIsCreateStatus] = useState(false);
  function handleRefresh() {

    getTask(userId, password).then((res) => {
      console.log(res);
      setClientLog(res.client_log);
      setCdnLog(res.cdn_log);
      setDnsLog(res.dns_log);
      setInfo(res.message);
      setSubmitTime(res.upload_time);
      setUid(res.uid);
      setStatus(res.status);
      // localStorage.setItem("clientLog", res.client_log);
      // localStorage.setItem("cdnLog", res.cdn_log);
      // localStorage.setItem("dnsLog", res.dns_log);
      // localStorage.setItem("message", res.message);
      // localStorage.setItem("submitTime", res.upload_time);
      // localStorage.setItem("uid", res.uid);
      localStorage.setItem("status", res.status);
      setCurrentStep(1);
      if (localStorage.getItem("status") == 1 || localStorage.getItem("status") == 2) {
        setIsDownloadStatus(false);
        setIsCreateStatus(false);
      } else if (localStorage.getItem("status") == 3) {
        setIsDownloadStatus(false);
        setIsCreateStatus(true);
      } else {
        setIsDownloadStatus(true);
        setIsCreateStatus(true);
      }
      message.success("Refresh succeed !");
      console.log(localStorage);
    })
      .catch((err) => {
        console.log(err);
        message.error("Refresh failed !");
      })
  }

  function handleCreateNew() {
    setCurrentStep(2);
  }

  // new
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleCancel() {
    setIsModalVisible(false);
  }

  function handleOk() {
    setIsModalVisible(false);
    setCurrentStep(0);
  }

  function handleSubmit() {
    let form = document.querySelector("#fileForm");
    let formData = new FormData(form);
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("key", localStorage.getItem("password"));
    console.log(formData);
    upload(formData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("createStatus", res.status);
        if (localStorage.getItem("createStatus") == 0) {
          message.success("Submitted successfully !");
          setIsModalVisible(true);
        } else if (localStorage.getItem("createStatus") == 1) {
          message.error("Invalid username or key !");
          setCurrentStep(0);
        } else if (localStorage.getItem("createStatus") == 2) {
          message.warning("Your last submitted task did not finish !");
        } else {
          message.error("No file selected or wrong file type (must be *.py) !");
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function downloadDns() {
    window.location.href = dnsLog;
  }

  function downloadCdn() {
    window.location.href = cdnLog;
  }

  function downloadClient() {
    window.location.href = clientLog;
  }

  return (
    <div>
      <Header />
      <div className="body-container">
        <div className="content">
          <p className="title">CDN Experiment for NJU</p>
          <div className="line"></div>
          <p className="description bold">Dashboard update schedule</p>
          <p className="description">Effective May 2021, Microsoft Research Lab – Asia updates its dashboard the first week of every month.</p>
          <br />
          <div>
            {currentStep === 0 && <div className="checkbox">
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
            </div>}
            {currentStep === 1 && <div className="checkbox">
              <div className="title-container">
                <div className="title">
                  Last Submission
                </div>
                <Button type="primary" onClick={handleRefresh}>Refresh</Button>
                <Button type="primary" onClick={handleCreateNew} disabled={!isCreateStatus}>Create New</Button>
              </div>
              <div className="status-container">
                <div className="status">
                  <div>
                    <p className="key">Experiment ID</p>
                    <p className="key">Submitted Time</p>
                    <p className="key">Status</p>
                  </div>
                  <div>
                    <p className="key padding-left">{uid || 0}</p>
                    <p className="key padding-left">{submitTime || 0}</p>
                    <p className="key padding-left">{info || 0}</p>
                  </div>
                </div>
                <div className="download">
                  <div>
                    <p className="key">DNS Log</p>
                    <p className="key">CDN Log</p>
                    <p className="key">Client Log</p>
                  </div>
                  <div className="bottom-container">
                    {/* <a href={dnsLog} className="dl-bottom">Download</a> */}
                    <div className="down">
                      <Button type="primary" onClick={downloadDns} disabled={!isDownloadStatus}>download</Button>
                    </div>
                    <div className="down">
                      <Button type="primary" onClick={downloadCdn} disabled={!isDownloadStatus}>download</Button>
                    </div>
                    <div className="down">
                      <Button type="primary" onClick={downloadClient} disabled={!isDownloadStatus}>download</Button>
                    </div>
                    {/* <a href={cdnLog} className="dl-bottom margin-top-dl">Download</a>
                    <a href={clientLog} className="dl-bottom margin-top-dl">Download</a> */}
                  </div>
                </div>
              </div>
            </div>}
            {currentStep === 2 && <div className="checkbox">
              <Modal title="message" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Submitted successfully</p>
                <p>click "ok" to check now</p>
              </Modal>
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
            </div>}
          </div>
          <br />
          <br />
          <p className="description bold">Instruction</p>
          <ul>
            <li>
              Input your id and password, click check to check your task’s state.
            </li>
            <li>
              If you haven’t created any task or want to submit a new task, upload two python files (DNS and CDN), you’ll get the uid of your task. Then you can check your task at this page.
            </li>
            <li>
              You can only submit one task at a time, which means you can’t create a new task until the end of your last task.
            </li>
          </ul>
          <div className="line-gray"></div>
          <p className="description bold">Network Topology</p>
          <img src={tacNote} className="tac" />
          <div className="line-gray"></div>
          <p className="description bold">More Information</p>
          <p className="description">To get more information about the experiment, please <a href="https://onledustroage.blob.core.windows.net/nju/intro.txt?sp=r&st=2021-04-14T08:21:34Z&se=2021-04-21T16:21:34Z&spr=https&sv=2020-02-10&sr=b&sig=%2FP4yNAlEtFeOWZPvMFmFU%2BHsKLaUAnOXNCZ3UMWjRCI%3D" target="_blank">read the doc</a>.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
