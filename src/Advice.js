import { ref, get, child } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "./firebase.js"; // Adjust the import to your file

const Advice = ({ entryId, returnToStart }) => {
  const [displayedName, setDisplayedName] = useState("");
  const [displayedAdvice, setDisplayedAdvice] = useState("");

  // Pulls firebase data and displays it on page

  useEffect(() => {
    const usersRef = ref(database, "/");

    get(child(usersRef, `${entryId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDisplayedName(data.name);
          setDisplayedAdvice(data.input);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
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
