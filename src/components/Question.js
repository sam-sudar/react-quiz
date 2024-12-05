import Options from "./Options";

/* eslint-disable array-callback-return */
function Question({ question }) {
  console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
