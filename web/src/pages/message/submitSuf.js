import React from "react";
import { useHistory } from "react-router-dom";

export default function SubmitSuf () {
  const history = useHistory();

  function handleCheckNow () {
    history.push("/");
  }

  return (
    <div className="checkbox">
      <p className="title">Successful !</p>
      <a className="check" onClick={handleCheckNow}>Check Now</a>
    </div>
  )
}