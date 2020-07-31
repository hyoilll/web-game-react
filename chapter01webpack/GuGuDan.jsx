const React = require("react");
//React.useState() => useState() 로 간략화해줌
const { useState, useRef } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const result = first * second;
    const answer = Number(value);

    if (result === answer) {
      setResult("정답");
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
    } else {
      setResult("틀림");
    }

    setValue("");
    setAnswer(answer);
    inputRef.current.focus();
  };

  return (
    //React.Fragment는 이제 안써도 됨
    <>
      <div>
        {first} * {second} = ?
      </div>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={onChangeInput}
        ></input>
        <button type="submit">enter</button>
      </form>
      <div>
        {answer} : {result}
      </div>
    </>
  );
};

module.exports = GuGuDan;
