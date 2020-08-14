import React, { Component } from "react";

class Question extends Component {
  render() {
    return (
      <>
        <div>
          {this.props.first} x {this.props.second} = ?
        </div>
      </>
    );
  }
}

export default Question;
