import React, { Component } from "react";

class Test extends Component {
  state = {
    cnt: 0,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log("update");
    //현재의 cnt랑 미래의 cnt가 다르면 render해라
    if (this.state.cnt !== nextState.cnt) {
      return true; //랜더링해라
    } else {
      return false; //하지마라
    }
  }

  onClick = () => {
    console.log("onClick");
    this.setState((prev) => {
      return {
        // cnt: prev.cnt + 1,
      };
    });
  };

  render() {
    console.log("rendering");
    return (
      <>
        <div>
          <button onClick={this.onClick}>enter</button>
        </div>
        <div>{this.state.cnt}</div>
      </>
    );
  }
}

export default Test;
