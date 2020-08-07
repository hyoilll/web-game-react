// --------Hooks----------
import React, { useState, useRef, useEffect } from "react";

// ----------component life cycle----------------
// [참조] https://medium.com/@krpeppermint100/js-useeffect%EB%A5%BC-%ED%86%B5%ED%95%9C-react-hooks%EC%9D%98-lifecycle-%EA%B4%80%EB%A6%AC-3a65844bcaf8
// hooks는 없지만 흉내는 낼 수 있음 => useEffect()
// => constructor(+사용자 함수) -> First render -> ref -> componentDidMount
// -> (setState/props 변경 시) -> shouldComponentUpdate(return true) -> Re render
// -> componentDidUpdate -> (부모가 자식컴포넌트 없앴을 때) -> componentWillUnmount -> 소멸

//dictionary
const obj = {
  가위: "0",
  바위: "-170px",
  보: "-357px",
};

// fleg
let reStartFleg = false;

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(obj.가위);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(0);
  const [loss, setLoss] = useState(0);
  const [draw, setDraw] = useState(0);
  let interval = useRef(null);

  // hooks component life cycle
  //아래 3개의 함수를 합쳐 놓은 것
  //useEffect(function, array)
  //array가 클로저를 해결해줌
  //array안의 imgCoord가 변화하면 컴포넌트 reRender해주겠다.
  //빈배열이면 아무런 state가 변화하지 않기 때문에 컴포넌트 reRender안해줌
  useEffect(() => {
    //componentDidMount, componentDidUpdate 역할 (1 : 1 대응은 아님)
    changeHand();
    return () => {
      //componentWillUnmount 역할
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const changeHand = () => {
    interval.current = setInterval(() => {
      //비동기 함수 안에서 바깥에 변수 참조시 클로저
      if (imgCoord === obj.가위) {
        setImgCoord(obj.바위);
      } else if (imgCoord === obj.바위) {
        setImgCoord(obj.보);
      } else if (imgCoord === obj.보) {
        setImgCoord(obj.가위);
      }
    }, 100);
  };

  const maping = (Hand) => {
    if (Hand === "0" || Hand === "가위") {
      //가위
      return 0;
    } else if (Hand === "-170px" || Hand === "바위") {
      //바위
      return -1;
    } else {
      //보
      return 1;
    }
  };

  const onClick = (hand) => (event) => {
    if (reStartFleg === true) {
      return;
    }

    clearInterval(interval.current);
    reStartFleg = true;

    const com = maping(imgCoord);
    const user = maping(hand);
    const result = user - com;

    if ([-1, 2].includes(result)) {
      setResult("Win");
      setScore((prev) => prev + 1);
      setWin((prev) => prev + 1);
    } else if ([1, -2].includes(result)) {
      setResult("Loss");
      setScore((prev) => prev - 1);
      setLoss((prev) => prev + 1);
    } else {
      setResult("Draw");
      setDraw((prev) => prev + 1);
    }
  };

  const onClickRestart = () => {
    if (reStartFleg === true) {
      changeHand();
      reStartFleg = false;
    }
  };

  return (
    <>
      <div
        className="computer"
        style={{ background: `url("./image/image.jpg") ${imgCoord} 0px` }}
      ></div>
      <div>
        {" "}
        {/* onClick={() => {this.onClick('바위')}} */}
        <button className="rock btn" onClick={onClick("바위")}>
          바위
        </button>
        <button className="scissor btn" onClick={onClick("가위")}>
          가위
        </button>
        <button className="paper btn" onClick={onClick("보")}>
          보
        </button>
        <button className="restart" onClick={onClickRestart}>
          ReStart
        </button>
      </div>
      <div>{result}</div>
      <div>{`Win : ${win}, Loss : ${loss}, Draw : ${draw}`}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;

// --------Class----------
// import React, { Component } from "react";

// // ----------component life cycle----------------
// // class
// // => constructor(+사용자 함수) -> First render -> ref -> componentDidMount
// // -> (setState/props 변경 시) -> shouldComponentUpdate(return true) -> Re render
// // -> componentDidUpdate -> (부모가 자식컴포넌트 없앴을 때) -> componentWillUnmount -> 소멸

// //dictionary
// const obj = {
//   가위: "0",
//   바위: "-170px",
//   보: "-357px",
// };

// // fleg
// let reStartFleg = false;

// class RSP extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       result: "",
//       imgCoord: "0",
//       score: 0,
//       win: 0,
//       loss: 0,
//       draw: 0,
//     };
//   }

//   interval;

//   changeHand = () => {
//     this.interval = setInterval(() => {
//       const { imgCoord } = this.state;
//       //비동기 함수 안에서 바깥에 변수 참조시 클로저
//       if (imgCoord === obj.가위) {
//         this.setState({
//           imgCoord: obj.바위,
//         });
//       } else if (imgCoord === obj.바위) {
//         this.setState({
//           imgCoord: obj.보,
//         });
//       } else if (imgCoord === obj.보) {
//         this.setState({
//           imgCoord: obj.가위,
//         });
//       }
//     }, 100);
//   };

//   //render가 처음 성공적으로 실행되고, 이 함수가 실행 됨
//   //그 후 setState로 인해 reRender가 일어날 떄는 실행 안됨
//   //비동기 요청하는 부분
//   //생성자라고 생각하면 편할 듯 => setInterval 비동기함수를 실행했으면
//   //componentWillUnmount에서 멈춰줘야함. 안그러면 자동으로 멈춰주지 않기때문에
//   //이 프로그램이 끝나기 전까지 무한 재생함.
//   //비동기함수가 메모리를 잡아먹기에 제거안해주면 메모리 누수 발생
//   componentDidMount() {
//     this.changeHand();
//   }

//   //reRender 후에는 이 함수가 실행 됨
//   componentDidUpdate() {}

//   //컴포넌트가 제거되는 경우, 제거되기 직전에 실행됨
//   //componentDidMount에서 작업했던 것을 제거 하는 용도
//   //비동기 요청했던 것을 정리하는 부분
//   //소멸자라고 생각하면 편할 듯 => 비동기함수를 멈춰줘야함
//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }

//   maping = (Hand) => {
//     if (Hand === "0" || Hand === "가위") {
//       //가위
//       return 0;
//     } else if (Hand === "-170px" || Hand === "바위") {
//       //바위
//       return -1;
//     } else {
//       //보
//       return 1;
//     }
//   };

//   // 고차함수
//   // button의 onClick 최적화를 위해 이렇게 바꿔줌 function = () => () => {}
//   // onClick = {function} 함수를 넣어줘야하는데 ('바위') 매개변수 때문에 함수가 아닌
//   // 실행결과를 넣어주게 됨 onClick = {function()}
//   // onClick = {() => this.onClick('바위')} 최적화 전
//   // onClick = {this.onClick('바위')} 최적화 후
//   onClick = (c) => (e) => {
//     //reStartFleg가 true라는 것은 가위바위보 그림이 멈춰있다는 뜻
//     //reStart를 누를 차례라는 것을 나타냄
//     //고로 유저의 가위바위보를 또 못누르게 막아줌
//     if (reStartFleg === true) {
//       return;
//     }

//     clearInterval(this.interval);
//     reStartFleg = true;

//     const { imgCoord } = this.state;

//     const com = this.maping(imgCoord);
//     const user = this.maping(c);
//     const result = user - com;

//     if ([-1, 2].includes(result)) {
//       this.setState((prevState) => {
//         return {
//           result: "Win",
//           score: prevState.score + 1,
//           win: prevState.win + 1,
//         };
//       });
//     } else if ([1, -2].includes(result)) {
//       this.setState((prevState) => {
//         return {
//           result: "Loss",
//           score: prevState.score - 1,
//           loss: prevState.loss + 1,
//         };
//       });
//     } else {
//       this.setState((prevState) => {
//         return {
//           result: "Draw",
//           draw: prevState.draw + 1,
//         };
//       });
//     }
//   };

//   onClickRestart = () => {
//     if (reStartFleg === true) {
//       this.changeHand();
//       reStartFleg = false;
//     }
//   };

//   render() {
//     const { result, score, imgCoord, win, loss, draw } = this.state;

//     return (
//       <>
//         <div
//           className="computer"
//           style={{ background: `url("./image/image.jpg") ${imgCoord} 0px` }}
//         ></div>
//         <div>
//           {" "}
//           {/* onClick={() => {this.onClick('바위')}} */}
//           <button className="rock btn" onClick={this.onClick("바위")}>
//             바위
//           </button>
//           <button className="scissor btn" onClick={this.onClick("가위")}>
//             가위
//           </button>
//           <button className="paper btn" onClick={this.onClick("보")}>
//             보
//           </button>
//           <button className="restart" onClick={this.onClickRestart}>
//             ReStart
//           </button>
//         </div>
//         <div>{result}</div>
//         <div>{`Win : ${win}, Loss : ${loss}, Draw : ${draw}`}</div>
//         <div>현재 {score}점</div>
//       </>
//     );
//   }
// }

// export default RSP;
