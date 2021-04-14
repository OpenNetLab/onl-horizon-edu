import {BrowserRouter, Route} from "react-router-dom";
import Header from "./pages/components/Header";
import Check from "./pages/check/Check";
import CheckResult from "./pages/check/CheckResult";
import CreateNew from "./pages/create/createNew";
import CheckFail from "./pages/message/checkFail";
import SubmitSuf from "./pages/message/submitSuf";
import SubmitFail from "./pages/message/submitFail";
import tacNote from "./assets/TecNotes.png";
import Footer from "./pages/components/Footer";
import React from "react";
import "./styles/home.css";

function App() {
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
          <BrowserRouter>
            <Route exact path="/" component={Check} />
            <Route exact path="/result" component={CheckResult} />
            <Route exact path="/create" component={CreateNew} />
            <Route exact path="/checkFail" component={CheckFail} />
            <Route exact path="/submitSul" component={SubmitSuf} />
            <Route exact path="/submitFail" component={SubmitFail} />
          </BrowserRouter>
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
              When your task is finished, you’ll receive an email.
            </li>
            <li>
              You can only submit one task at a time, which means you can’t create a new task until the end of your last task.
            </li>
          </ul>
          <div className="line-gray"></div>
          <p className="description bold">Network Topology</p>
          <img src={tacNote} className="tac"/>
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
