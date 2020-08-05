import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  onClickScreen = () => {};

  renderAverage = () => {
    //구조분해
    const { result } = this.state;

    return result.length === 0 ? null : (
      <div>
        평균시간:
        {result.reduce((a, c) => a + c) / result.length}
        ms
      </div>
    );
  };

  render() {
    //구조분해
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
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

        {/* 함수로 바깥에 뺼 수 있음 */}
        {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;
