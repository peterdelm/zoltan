import firebase from "./firebase.js";
import { useEffect, useState } from "react";

const Advice = ({ entryId, returnToStart }) => {
  const [displayedName, setDisplayedName] = useState("");
  const [displayedAdvice, setDisplayedAdvice] = useState("");

  // Pulls firebase data and displays it on page
  useEffect(() => {
    const dbRef = firebase.database().ref(entryId);

    dbRef.once("value", (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        setDisplayedName(data.name);
        setDisplayedAdvice(data.input);
      } else {
        console.log("No data found for this ID.");
      }
    });
  }, [entryId]);

  return (
    <div>
      <section className="adviceSection">
        <h4>So, {displayedName}… You asked for some life-changing advice?</h4>
        <p>Here's what Zoltan the GREAT has to say about that…</p>
        <p>{displayedAdvice}</p>
      </section>
      <div className="buttonContainer">
        <button type="retry" onClick={returnToStart}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default Advice;
