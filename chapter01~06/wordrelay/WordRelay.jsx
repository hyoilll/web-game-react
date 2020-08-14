//--------------------------Hooks--------------------------

import React, { useState, useRef } from "react";
import Question from "./Question";

const WordRelay = () => {
  const [text, setText] = useState("사나");
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const answer = inputRef.current.value;

    console.log(text, answer);

    if (text[text.length - 1] === answer[0]) {
      //같으면
      setText(answer);
      setResult("success");
      setValue("");
    } else {
      //다르면
      setResult("fail");
      setValue("");
    }

    inputRef.current.focus();
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Question text={text} />
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="answer"
          value={value}
          onChange={onChange}
        ></input>
        <input type="submit" value="submit"></input>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;

//------------------------Class-----------------------

// import React, { Component, createRef } from "react";
// import Question from "./Question";

// class WordRelay extends Component {
//   state = {
//     text: "사나",
//     result: "",
//     value: "",
//   };

//   //input Ref
//   inputRef = createRef();

//   onSubmit = (e) => {
//     e.preventDefault();
//     const { text, result } = this.state;

//     const answer = this.inputRef.current.value;

//     console.log(text, answer);

//     if (text[text.length - 1] === answer[0]) {
//       //같으면
//       this.setState({
//         text: answer,
//         result: "success",
//         value: "",
//       });
//     } else {
//       //다르면
//       this.setState({
//         result: "fail",
//         value: "",
//       });
//     }

//     this.inputRef.current.focus();
//   };

//   onChange = (e) => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   render() {
//     const { text, result, value } = this.state;
//     return (
//       <>
//         <Question text={text} />
//         <form onSubmit={this.onSubmit}>
//           <input
//             ref={this.inputRef}
//             type="text"
//             placeholder="answer"
//             value={value}
//             onChange={this.onChange}
//           ></input>
//           <input type="submit" value="submit"></input>
//         </form>
//         <div>{result}</div>
//       </>
//     );
//   }
// }

// export default WordRelay;
