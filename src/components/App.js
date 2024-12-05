import Header from "./Header";
import Body from "./Body";

import Loader from "./Loader";
import Error from "./Error";
import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))

      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="App">
      <Header />
      <Body>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen length={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && <Question question={questions[index]} />}
      </Body>
    </div>
  );
}

export default App;
