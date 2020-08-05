import React, { memo } from "react";

//const try = (props)
//=> 구조분해
//const try = ({tryInfo})
const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;

// import React, { PureComponent } from "react";

// class Try extends PureComponent {
//   render() {
//     const { tryInfo } = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     );
//   }
// }

// export default Try;
