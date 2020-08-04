import React from "react";

//const try = (props)
//=> 구조분해
//const try = ({tryInfo})
const Try = ({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};

export default Try;

// import React, { Component } from "react";

// class Try extends Component {
//   render() {
//     return (
//       <li>
//         <div>{this.props.tryInfo.try}</div>
//         <div>{this.props.tryInfo.result}</div>
//       </li>
//     );
//   }
// }

// export default Try;
