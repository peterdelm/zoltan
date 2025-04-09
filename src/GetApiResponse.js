// import axios from "axios";
import { useEffect, useState } from "react";
// import randomAdvice from "./randomAdvice.js";
import { ref, push } from "firebase/database";
import zoltan from "./assets/zoltan.png";
import { database } from "./firebase.js"; // Adjust the import to your file

const GetApiResponse = ({ showMaze, setEntryId }) => {
  // State for advice
  const [advice, setAdvice] = useState([]);

  // State for user input
  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");

  // State for name input
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setUserInput(newValue);
    setQuery(newValue); // Use newValue directly instead of userInput
  };

  // Handler for user name input
  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const submitChange = (e) => {
    e.preventDefault();
    setUserInput("");
    setUserName("");

    ///////  API ENDPOINT APPEARS TO BE DOWN, USING LOCAL QUOTE LIST UNTIL IT COMES BACK ///////

    // if (query !== "") {
    //   console.log("Calling API...");
    // API call to return advice for keyword input
    //   axios({
    //     // url: `https://api.adviceslip.com/advice/search/${query}`,
    //     url: `https://api.quotable.io/random`,
    //     method: "GET",
    //     dataResponse: "json",
    //   }).then((res) => {
    //     const data = res.data;
    //     console.log("Data is", data);
    //     // Check if data has object of slips
    //     if (data.hasOwnProperty("slips")) {
    //       setAdvice(res.data.slips[0].advice);
    //     } else {
    //       // Second API call to return advice for words not in firs API data base
    //       randomAdvice(setAdvice);
    //     }
    //   });
    // }

    const newUser = {
      name: userName,
      input: advice,
    };
    const usersRef = ref(database, "/");

    // Push new user data and capture the unique key generated
    push(usersRef, newUser)
      .then((newRef) => {
        const uniqueId = newRef.key;
        setEntryId(uniqueId);
        setMazePlease(true);
      })
      .catch((error) => {
        console.error("Error adding user: ", error);
      });
  };

  useEffect(() => {
    if (query !== "") {
      console.log("Fetching random advice...");

      // Use a list of random advice as fallback
      const adviceList = [
        "Don’t be afraid to start over. It’s a chance to build something better.",
        "Success is a journey, not a destination. Enjoy the ride.",
        "Take the time to invest in yourself. It’s the best decision you can make.",
        "It’s okay to not have everything figured out yet. Take it one step at a time.",
        "You’re stronger than you think. Keep pushing through the challenges.",
        "Sometimes, the best thing you can do is take a break and come back with fresh eyes.",
        "If you want to go fast, go alone. If you want to go far, go together.",
        "Surround yourself with people who lift you up, not bring you down.",
        "Be kind to yourself. Growth takes time, and you’re doing better than you think.",
        "The only limits in life are the ones you set for yourself.",
        "Embrace the small wins. They add up to big successes.",
        "Don’t compare your journey to someone else’s. You’re on your own path.",
        "The harder the battle, the sweeter the victory.",
        "Believe in the process, even when you can’t see the results yet.",
        "Sometimes, the best way to grow is to step out of your comfort zone.",
      ];

      // Select random advice from the list
      const randomAdviceIndex = Math.floor(Math.random() * adviceList.length);
      const selectedAdvice = adviceList[randomAdviceIndex];
      setAdvice(selectedAdvice);

      console.log("Selected Advice:", selectedAdvice);
    }
  }, [query]);

  //toggling component
  const [mazePlease, setMazePlease] = useState(false);

  useEffect(() => {
    if (mazePlease) {
      showMaze();
    }
  });

  return (
    <div className="wrapper">
      <div className="scalingContainer">
        <div className="zoltanContainer">
          <img className="zoltanImg" src={zoltan} alt="fortune teller" />
        </div>
      </div>
      <div className="formContainer">
        <div className="formElement">
          <form onSubmit={submitChange}>
            <label htmlFor="newName">Please enter your name:</label>
            <input
              type="text"
              id="newName"
              onChange={handleNameChange}
              value={userName}
              required
            />

            <label htmlFor="newAdvice">
              I would like advice on... (Please, only one word, divination is an
              exact science)
            </label>
            <input
              type="text"
              id="newAdvice"
              onChange={handleChange}
              value={userInput}
              required
            />

            <div className="buttonContainer">
              <button
                type="submit"
                disabled={userName && userInput ? false : true}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetApiResponse;
