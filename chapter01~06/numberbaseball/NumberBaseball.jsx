import React, { Component, createRef } from "react";

//문제 생성
function createQuestion() {
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

class NumberBaseball extends Component {
  state = {
    chance: 10,
    value: "",
    qArr: createQuestion(),
    trys: [],
    result: "",
  };

  inputRef = createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const { qArr, trys, chance } = this.state;

    console.log(this.state.qArr);
    const answer = this.inputRef.current.value;
    console.log(answer);

    if (answer === "") {
      return;
    }

    //minus Chance
    this.setState((prevState) => {
      return {
        chance: prevState.chance - 1,
      };
    });

    if (answer === qArr.join("")) {
      //맞을 떄
      this.setState({
        value: "",
        trys: [...trys, `${answer}, 홈런`],
        result: "success!!!",
      });

      setTimeout(() => {
        alert("game exit");
        this.setState({
          chance: 10,
          value: "",
          qArr: createQuestion(),
          trys: [],
          result: "",
        });
      }, 2000);
    } else {
      //틀릴 떄
      const resultStr = checkResult(answer, qArr);

      this.setState({
        value: "",
        result: "fail!!!",
        trys: [...trys, `${answer}, ${resultStr}`],
      });
    }

    //기회 끝
    if (chance === 1) {
      setTimeout(() => {
        alert("game exit");
        this.setState({
          chance: 10,
          value: "",
          qArr: createQuestion(),
          trys: [],
          result: "",
        });
      }, 2000);
    }
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  printResultText = () => {
    const { trys, result } = this.state;

    if (trys.length === 0) {
      return;
    } else {
      return (
        <>
          <div style={{ fontSize: "35px" }}>
            Result Table (Result : {result})
          </div>
          <ul>
            {trys.map((v, i) => {
              return (
                <li key={v + i} style={{ fontSize: "30px" }}>
                  {v}
                </li>
              );
            })}
          </ul>
        </>
      );
    }
  };

  render() {
    const { chance, value } = this.state;
    return (
      <>
        <div style={{ fontSize: "40px" }}>
          Welcome to NumberBaseball world / Chance : {chance}
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.inputRef}
            type="text"
            maxLength={4}
            minLength={4}
            placeholder="answer"
            value={value}
            onChange={this.onChange}
          ></input>
          <input type="submit" value="submit"></input>
        </form>
        {this.printResultText()}
      </>
    );
  }
}

export default NumberBaseball;
