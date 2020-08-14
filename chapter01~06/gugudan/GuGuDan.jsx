//----------------------Hooks--------------------------------

// import React, { useState, useRef, memo } from "react";

// const GuGuDan = memo(() => {
//   const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
//   const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
//   const [result, setResult] = useState("");
//   const [value, setValue] = useState("");
//   const inputRef = useRef(null);

//   const onChange = (input) => {
//     setValue(input.target.value);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const answer = Number(inputRef.current.value);
//     const mulResult = first * second;

//     console.log(answer, mulResult);

//     if (answer === mulResult) {
//       //맞으면
//       setFirst(Math.ceil(Math.random() * 9));
//       setSecond(Math.ceil(Math.random() * 9));
//       setValue("");
//       setResult("정답");
//     } else {
//       //틀리면
//       setValue("");
//       setResult("틀림");
//     }

//     inputRef.current.focus();
//   };

//   return (
//     <>
//       <div>
//         {first} x {second} = ?
//       </div>
//       <form onSubmit={onSubmit}>
//         <input
//           ref={inputRef}
//           type="text"
//           maxLength={4}
//           value={value}
//           onChange={onChange}
//         ></input>
//         <input type="submit" value="submit"></input>
//       </form>
//       <div>{result}</div>
//     </>
//   );
// });

// export default GuGuDan;

//----------------------Class--------------------------------

import React, { Component } from "react";
import Question from "./Question";

class GuGuDan extends Component {
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    result: "",
    value: "",
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.result !== this.state.result) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  //input Ref
  inputRef = React.createRef();

  onChange = (input) => {
    this.setState({
      value: input.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { first, second, result } = this.state;

    const answer = Number(this.inputRef.current.value);
    const mulResult = first * second;

    console.log(answer, mulResult);

    if (answer === mulResult) {
      //맞으면
      this.setState({
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: "",
        result: "정답",
      });
    } else {
      //틀리면
      this.setState({
        value: "",
        result: "틀림",
      });
    }
    this.inputRef.current.focus();
  };

  render() {
    const { first, second, result, value } = this.state;
    return (
      <>
        <Question first={first} second={second} />
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.inputRef}
            type="text"
            maxLength={4}
            value={value}
            onChange={this.onChange}
          ></input>
          <input type="submit" value="submit"></input>
        </form>
        <div>{result}</div>
      </>
    );
  }
}

export default GuGuDan;
