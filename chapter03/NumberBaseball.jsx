import React from "react";
const { useState, useRef } = React;

import Try from "./Try";

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [];
  for (let i = 0; i < 4; ++i) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    arr.push(chosen);
  }
  return arr;
}

const NumberBaseball = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === answer.join("")) {
      setResult("홈런");

      setTries((prevTries) => {
        return [...prevTries, { try: value, result: "홈런" }];
      });

      alert("게임을 다시 시작합니다");
      setValue("");
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));

      let strike = 0;
      let ball = 0;

      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려스 실패! 답은 ${answer.join(",")}였습니다.`);

        alert("게임을 다시 시작합니다");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; ++i) {
          if (answerArray[i] === answer[i]) {
            strike++;
          } else if (answer.includes(answerArray[i])) {
            ball++;
          }
        }

        setTries((prevTries) => {
          return [
            ...prevTries,
            { try: value, result: `${strike}스트라이크, ${ball}볼 입니다.` },
          ];
        });
        setValue("");
      }
    }
  };

  const onChangeInput = (e) => {
    console.log(answer);
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput}></input>
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => {
          return <Try key={`${i + 1}차 시도 : `} tryInfo={v} />;
        })}
      </ul>
    </>
  );
};

export default NumberBaseball;

// import React, { PureComponent } from "react";
// //const { useState, useRef } = React;

// import Try from "./Try";

// function getNumbers() {
//   const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   const arr = [];
//   for (let i = 0; i < 4; ++i) {
//     const chosen = candidate.splice(
//       Math.floor(Math.random() * candidate.length),
//       1
//     )[0];
//     arr.push(chosen);
//   }
//   return arr;
// }

// class NumberBaseball extends PureComponent {
//   state = {
//     result: "",
//     value: "",
//     answer: getNumbers(),
//     tries: [],
//   };

//   onSubmitForm = (e) => {
//     e.preventDefault();
//     if (this.state.value === this.state.answer.join("")) {
//       this.setState((prevState) => {
//         return {
//           result: "홈런",
//           tries: [
//             ...prevState.tries,
//             { try: this.state.value, result: "홈런" },
//           ],
//         };
//       });

//       alert("게임을 다시 시작합니다");
//       this.setState({
//         value: "",
//         answer: getNumbers(),
//         tries: [],
//       });
//     } else {
//       const answerArray = this.state.value.split("").map((v) => parseInt(v));

//       let strike = 0;
//       let ball = 0;

//       if (this.state.tries.length >= 9) {
//         this.setState({
//           result: `10번 넘게 틀려스 실패! 답은 ${this.state.answer.join(
//             ""
//           )}였습니다.`,
//         });
//         alert("게임을 다시 시작합니다");
//         this.setState({
//           value: "",
//           answer: getNumbers(),
//           tries: [],
//         });
//       } else {
//         for (let i = 0; i < 4; ++i) {
//           if (answerArray[i] === this.state.answer[i]) {
//             strike++;
//           } else if (this.state.answer.includes(answerArray[i])) {
//             ball++;
//           }
//         }
//         this.setState((prevState) => {
//           return {
//             tries: [
//               ...prevState.tries,
//               {
//                 try: this.state.value,
//                 result: `${strike}스트라이크, ${ball}볼 입니다.`,
//               },
//             ],
//             value: "",
//           };
//         });
//       }
//     }
//   };

//   onChangeInput = (e) => {
//     console.log(this.state.answer);
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   render() {
//     return (
//       <>
//         <h1>{this.state.result}</h1>
//         <form onSubmit={this.onSubmitForm}>
//           <input
//             maxLength={4}
//             value={this.state.value}
//             onChange={this.onChangeInput}
//           ></input>
//         </form>
//         <div>시도 : {this.state.tries.length}</div>
//         <ul>
//           {this.state.tries.map((v, i) => {
//             return <Try key={`${i + 1}차 시도 : `} tryInfo={v} />;
//           })}
//         </ul>
//       </>
//     );
//   }
// }

// export default NumberBaseball;
