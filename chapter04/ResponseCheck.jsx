import React, { useState, useRef } from "react";

//Class랑 다르게 Hooks에서 밖으로 빠져나온 이유는 setState()실행시 컴포넌트 자체가 재실행되서
//timer가 0으로 초기화되어짐, 그래서 타이머를 멈출 수가 없음.
//시간도 마찬가지임 최종 record를 계산할 때 기존에 측정했던 startTime이 0으로 초기화되어
//제대로 된 시간을 측정할 수 없음.
// let timer = 0;
// let startTime = 0;
// let endTIme = 0;

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  const timer = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");

      timer.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");

        startTime.current = new Date().getTime();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      setState("waiting");
      setMessage("너무 빨리 클릭했습니다. 다시 클릭해서 시작하세요.");

      clearTimeout(timer);
    } else if (state === "now") {
      {
        endTime.current = new Date().getTime();

        //최종 기록
        const record = endTime.current - startTime.current;

        setState("waiting");
        setMessage(
          `기록 : ${record}입니다. 다시 하시려면 클릭해서 시작하세요.`
        );
        setResult((prevResult) => {
          return [...prevResult, record];
        });
      }
    }
  };

  const onClickReset = () => {
    setState("waiting");
    setResult([]);
    setMessage("Reset을 누르셨습니다. 다시 클릭해서 시작하세요.");

    clearTimeout(timer);
  };

  const renderAverage = () => {
    //구조분해
    console.log(result);
    return result.length === 0 ? null : (
      <>
        <div>
          평균시간 : {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={onClickReset}>Reset</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>

      {/* {this.state.result.length === 0 ? null : (
          <div>
            평균시간:
            {this.state.result.reduce((a, c) => a + c) /
              this.state.result.length}
            ms
          </div>
        )} */}

      {result.map((item, i) => {
        return (
          <div key={item}>
            {i + 1}차 시도 : {item}ms
          </div>
        );
      })}

      {/* 함수로 바깥에 뺼 수 있음 */}
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;

// import React, { Component } from "react";

// class ResponseCheck extends Component {
//   state = {
//     state: "waiting",
//     message: "클릭해서 시작하세요",
//     result: [],
//   };

//   //state변수가 바뀌면 다시 render되지만
//   //밑의 this변수들은 바뀌어도 render안됨
//   timer;
//   startTime = 0;
//   endTIme = 0;

//   onClickScreen = () => {
//     const { state, message, result } = this.state;

//     if (state === "waiting") {
//       this.setState({
//         state: "ready",
//         message: "초록색이 되면 클릭하세요",
//       });

//       this.timer = setTimeout(() => {
//         this.setState({
//           state: "now",
//           message: "지금 클릭",
//         });
//         this.startTime = new Date().getTime();
//       }, Math.floor(Math.random() * 1000) + 2000);
//     } else if (state === "ready") {
//       this.setState({
//         state: "waiting",
//         message: "너무 빨리 클릭했습니다. 다시 클릭해서 시작하세요.",
//       });
//       clearTimeout(this.timer);
//     } else if (state === "now") {
//       {
//         this.endTIme = new Date().getTime();

//         //최종 기록
//         const record = this.endTIme - this.startTime;

//         this.setState((prevState) => {
//           return {
//             state: "waiting",
//             message: `기록 : ${record}입니다. 다시 하시려면 클릭해서 시작하세요.`,
//             result: [...prevState.result, record],
//           };
//         });
//       }
//     }
//   };

//   onClickReset = () => {
//     this.setState({
//       state: "waiting",
//       result: [],
//       message: "Reset을 누르셨습니다. 다시 클릭해서 시작하세요.",
//     });
//     clearTimeout(this.timer);
//   };

//   renderAverage = () => {
//     //구조분해
//     const { result } = this.state;
//     console.log(result);
//     return result.length === 0 ? null : (
//       <>
//         <div>
//           평균시간 : {result.reduce((a, c) => a + c) / result.length}
//           ms
//         </div>
//         <button onClick={this.onClickReset}>Reset</button>
//       </>
//     );
//   };

//   render() {
//     //구조분해
//     const { state, message, result } = this.state;
//     return (
//       <>
//         <div id="screen" className={state} onClick={this.onClickScreen}>
//           {message}
//         </div>

//         {/* {this.state.result.length === 0 ? null : (
//           <div>
//             평균시간:
//             {this.state.result.reduce((a, c) => a + c) /
//               this.state.result.length}
//             ms
//           </div>
//         )} */}

//         {result.map((item, i) => {
//           return (
//             <div key={item}>
//               {i + 1}차 시도 : {item}ms
//             </div>
//           );
//         })}

//         {/* 함수로 바깥에 뺼 수 있음 */}
//         {this.renderAverage()}
//       </>
//     );
//   }
// }

// export default ResponseCheck;
