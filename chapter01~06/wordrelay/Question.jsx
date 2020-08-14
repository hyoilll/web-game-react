//-------------------------function component------------------

import React from "react";

const Question = ({ text }) => {
  return (
    <>
      <div style={{ fontSize: "40px" }}>{text}</div>
    </>
  );
};

export default Question;

//-------------------------class--------------------------

// import React, { Component } from "react";

// class Question extends Component {
//   render() {
//     const { text } = this.props;
//     return (
//       <>
//         <div style={{ fontSize: "40px" }}>{text}</div>
//       </>
//     );
//   }
// }

// export default Question;
