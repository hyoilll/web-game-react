import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log("getWinNumbers");

  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];

  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }

  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  // 두번째 인자가 바뀌지 않으면 처음의 콜백함수는 실행되지 않음
  // 두번째 배열의 요소가 바뀌면 콜백함수 다시 실행 됨
  //  => 두번쨰 요소에 의해 값이 바뀌기 전까지는 getWinNumbers()는 한번만 실행됨
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);

  const timeouts = useRef([]);

  const paintBall = () => {
    console.log("paintBall");
    for (let i = 0; i < winNumbers.length - 1; ++i) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prev) => {
          return [...prev, winNumbers[i]];
        });
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
  };

  // useEffect의 콜백함수 - render || re-render가 되었을 때 실행하는 콜백함수
  useEffect(() => {
    console.log("useEffect");
    paintBall();

    return () => {
      //componentWillUnmount
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]);
  // 빈 배열이면 componentDidMount와 동일
  // 빈 배열이 아니면 componentDidMount + componentDidUpdate 둘 다 수행
  // 배열 안의 원소를 변화를 감지하여 componentDidUpdate처럼 수행
  // 배열안의 timeouts.current의 의미
  //  => timeouts.current의 상태가 변하면 re-render하겠다. (= componentDidUpdate)
  // if a변수가 바뀔때마다 실행하는 함수, b변수가 바뀔때마다 실행하는 함수 이렇게 여러개라면
  // useEffect()를 여러개 써주면 됨
  // class에서는 componentDidUpdate안에 조건문으로 여러개 적어줌

  const onClick = useCallback(() => {
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);
  // default이면 useCallback이 없는 것과 마찬가지로 계속해서 함수 재 생성됨
  // 빈 배열이면 상태변화를 감지하는 변수가 없으므로 처음 한번 생성하고 재생성 안함
  // 빈 배열이 아니면 해당 변수가 변화하면 다시 재생성함

  return (
    <>
      <div>당첨 숫자</div>
      <div id="result">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClick}>한번 더!</button>}
    </>
  );
};

export default Lotto;

// import React, { Component } from "react";
// import Ball from "./Ball";

// function getWinNumbers() {
//   console.log("getWinNumbers");

//   const candidate = Array(45)
//     .fill()
//     .map((v, i) => i + 1);
//   const shuffle = [];

//   while (candidate.length > 0) {
//     shuffle.push(
//       candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
//     );
//   }

//   const bonusNumber = shuffle[shuffle.length - 1];
//   const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

//   return [...winNumbers, bonusNumber];
// }

// class Lotto extends Component {
//   state = {
//     winNumbers: getWinNumbers(), //당첨 숫자
//     winBalls: [],
//     bonus: null, //보너스 공
//     redo: false,
//   };

//   timeouts = [];

//   paintBall = () => {
//     const { winNumbers } = this.state;
//     for (let i = 0; i < winNumbers.length - 1; ++i) {
//       this.timeouts[i] = setTimeout(() => {
//         this.setState((prevState) => {
//           return {
//             winBalls: [...prevState.winBalls, winNumbers[i]],
//           };
//         });
//       }, (i + 1) * 1000);
//     }

//     this.timeouts[6] = setTimeout(() => {
//       this.setState({
//         bonus: winNumbers[6],
//         redo: true,
//       });
//     }, 7000);
//   };

//   //first render
//   componentDidMount() {
//     this.paintBall();
//   }

//   //re render 마다
//   //onClick의 setState가 실행되서 componentDidUpdate가 실행됨
//   componentDidUpdate(prevProps, prevState) {
//     console.log("hi");
//     if (this.state.winBalls.length === 0) {
//       this.paintBall();
//       console.log("bye");
//     }
//   }

//   //exit
//   componentWillUnmount() {
//     this.timeouts.forEach((v) => {
//       clearTimeout(v);
//     });
//   }

//   onClick = () => {
//     this.setState({
//       winNumbers: getWinNumbers(), //당첨 숫자
//       winBalls: [],
//       bonus: null, //보너스 공
//       redo: false,
//     });
//     this.timeouts = [];
//   };

//   render() {
//     const { winBalls, bonus, redo } = this.state;
//     return (
//       <>
//         <div>당첨 숫자</div>
//         <div id="result">
//           {winBalls.map((v) => (
//             <Ball key={v} number={v} />
//           ))}
//         </div>
//         <div>보너스!</div>
//         {bonus && <Ball number={bonus} />}
//         {redo && <button onClick={this.onClick}>한번 더!</button>}
//       </>
//     );
//   }
// }

// export default Lotto;
