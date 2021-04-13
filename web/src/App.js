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
          <p className="title">Lorem Ipsum</p>
          <div className="line"></div>
          <p className="description bold">Dashboard update schedule</p>
          <p className="description">Effective May 2021, Microsoft Research Lab – Asia updates its dashboard the first week of every month.</p>
          <BrowserRouter>
            <Route exact path="/" component={Check} />
            <Route exact path="/result" component={CheckResult} />
            <Route exact path="/create" component={CreateNew} />
            <Route exact path="/checkFail" component={CheckFail} />
            <Route exact path="/submitSul" component={SubmitSuf} />
            <Route exact path="/submitFail" component={SubmitFail} />
          </BrowserRouter>
          <img className="tac" alt="img" src={tacNote} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
