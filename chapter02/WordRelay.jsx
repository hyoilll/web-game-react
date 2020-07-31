//각 jsx파일마다 쓰이는 애를 다시 생성해줘야함
const React = require("react");
//const { Component } = React;

// class WordRelay extends React.Component {
//   state = {
//     text: "hello, webpack",
//   };

//   render() {
//     return <h1>{this.state.text}</h1>;
//   }
// }

const WordRelay = () => {
  const [text, setText] = React.useState("다현");
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const answer = value;

    if (text[text.length - 1] === answer[0]) {
      setResult("정답");
      setText(answer);
    } else {
      setResult("틀림");
    }

    setValue("");
  };

  return (
    <>
      <div>{text}</div>
      <form onSubmit={onSubmit}>
        <label htmlFor="input_text">Text : </label>
        {/* value랑 onChange는 같이 쓰임 / value를 안 쓸거면 defalutValue={value} */}
        <input
          type="text"
          id="input_text"
          className="input_text"
          value={value}
          onChange={onChange}
        ></input>
        <input type="submit" value="enter"></input>
      </form>
      <div>{result}</div>
    </>
  );
};

//쪼갠 파일에서 만든 컴포넌트를 바깥에서도 쓸 수 있게 반환해주는 개념
module.exports = WordRelay;
