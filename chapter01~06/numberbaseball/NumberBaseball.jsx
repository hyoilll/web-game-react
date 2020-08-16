//-----------------------Hooks------------------------

import React, { useState, useRef, useMemo, memo } from "react";
import Result from "./Result";
import Title from "./Title";

//문제 생성
function createQuestion() {
  console.log("createQuestion");
  const question_arr = [];
  const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = 0; i < 4; ++i) {
    const temp = arr1.splice(Math.floor(Math.random() * arr1.length), 1)[0];

    question_arr.push(temp);
  }

  return question_arr;
}

//스트라이크, 볼 판단
function checkResult(answer, qArr) {
  const answerArr = answer.split("");

  let strike = 0;
  let ball = 0;

  for (let i = 0; i < 4; ++i) {
    if (qArr[i] === Number(answerArr[i])) {
      strike++;
    } else if (qArr.indexOf(Number(answerArr[i])) > -1) {
      ball++;
    }
  }

  return `${strike} strike, ${ball} ball`;
}

const NumberBaseball = memo(() => {
  const [chance, setChance] = useState(10);
  const [trys, setTrys] = useState([]);
  const [value, setValue] = useState("");
  const question = useMemo(() => {
    return createQuestion();
  }, [result]);
  const [qArr, setQarr] = useState(question);
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("qArr : ", qArr);
    const answer = inputRef.current.value;
    console.log("answer : ", answer);

    if (answer === "") {
      return;
    }

    //minus Chance
    setChance((prev) => {
      return prev - 1;
    });

    if (answer === qArr.join("")) {
      //맞을 떄
      setValue("");
      setTrys((prev) => {
        return [...prev, `${answer}, 홈런`];
      });
      setResult("success!!!");

      setTimeout(() => {
        alert("game exit");

        setChance(10);
        setValue("");
        setQarr(createQuestion());
        setResult("");
        setTrys([]);
      }, 2000);
    } else {
      //틀릴 떄
      const resultStr = checkResult(answer, qArr);

      setValue("");
      setResult("fail!!!");
      setTrys((prev) => {
        return [...prev, `${answer}, ${resultStr}`];
      });
    }

    //기회 끝
    if (chance === 1) {
      setTimeout(() => {
        alert("game exit");

        setChance(10);
        setValue("");
        setQarr(createQuestion());
        setResult("");
        setTrys([]);
      }, 2000);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Title chance={chance} />
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          type="text"
          maxLength={4}
          minLength={4}
          placeholder="answer"
          value={value}
          onChange={onChange}
        ></input>
        <input type="submit" value="submit"></input>
      </form>
      <Result trys={trys} result={result} />
    </>
  );
});

export default NumberBaseball;

//-----------------------Class------------------------

// import React, { PureComponent, createRef } from "react";
// import Result from "./Result";
// import Title from "./Title";

// //문제 생성
// function createQuestion() {
//   const question_arr = [];
//   const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//   for (let i = 0; i < 4; ++i) {
//     const temp = arr1.splice(Math.floor(Math.random() * arr1.length), 1)[0];

//     question_arr.push(temp);
//   }

//   return question_arr;
// }

// //스트라이크, 볼 판단
// function checkResult(answer, qArr) {
//   const answerArr = answer.split("");

//   let strike = 0;
//   let ball = 0;

//   for (let i = 0; i < 4; ++i) {
//     if (qArr[i] === Number(answerArr[i])) {
//       strike++;
//     } else if (qArr.indexOf(Number(answerArr[i])) > -1) {
//       ball++;
//     }
//   }

//   return `${strike} strike, ${ball} ball`;
// }

// class NumberBaseball extends PureComponent {
//   state = {
//     chance: 10,
//     value: "",
//     qArr: createQuestion(),
//     trys: [],
//     result: "",
//   };

//   inputRef = createRef();

//   onSubmit = (e) => {
//     e.preventDefault();
//     const { qArr, trys, chance } = this.state;

//     console.log(this.state.qArr);
//     const answer = this.inputRef.current.value;
//     console.log(answer);

//     if (answer === "") {
//       return;
//     }

//     //minus Chance
//     this.setState((prevState) => {
//       return {
//         chance: prevState.chance - 1,
//       };
//     });

//     if (answer === qArr.join("")) {
//       //맞을 떄
//       this.setState({
//         value: "",
//         trys: [...trys, `${answer}, 홈런`],
//         result: "success!!!",
//       });

//       setTimeout(() => {
//         alert("game exit");
//         this.setState({
//           chance: 10,
//           value: "",
//           qArr: createQuestion(),
//           trys: [],
//           result: "",
//         });
//       }, 2000);
//     } else {
//       //틀릴 떄
//       const resultStr = checkResult(answer, qArr);

//       this.setState({
//         value: "",
//         result: "fail!!!",
//         trys: [...trys, `${answer}, ${resultStr}`],
//       });
//     }

//     //기회 끝
//     if (chance === 1) {
//       setTimeout(() => {
//         alert("game exit");
//         this.setState({
//           chance: 10,
//           value: "",
//           qArr: createQuestion(),
//           trys: [],
//           result: "",
//         });
//       }, 2000);
//     }
//   };

//   onChange = (e) => {
//     this.setState({
//       value: e.target.value,
//     });
//   };

//   render() {
//     const { chance, value, trys, result } = this.state;
//     return (
//       <>
//         <Title chance={chance} />
//         <form onSubmit={this.onSubmit}>
//           <input
//             ref={this.inputRef}
//             type="text"
//             maxLength={4}
//             minLength={4}
//             placeholder="answer"
//             value={value}
//             onChange={this.onChange}
//           ></input>
//           <input type="submit" value="submit"></input>
//         </form>
//         <Result trys={trys} result={result} />
//       </>
//     );
//   }
// }

// export default NumberBaseball;
