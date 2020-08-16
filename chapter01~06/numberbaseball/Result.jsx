//---------------------------function component----------------

import React, { memo } from "react";

const Result = memo(({ trys, result }) => {
  const printResultText = () => {
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

  return <>{printResultText()}</>;
});

export default Result;

//-----------------------------class---------------------------

// import React, { PureComponent } from "react";

// class Result extends PureComponent {
//   printResultText = () => {
//     const { trys, result } = this.props;

//     if (trys.length === 0) {
//       return;
//     } else {
//       return (
//         <>
//           <div style={{ fontSize: "35px" }}>
//             Result Table (Result : {result})
//           </div>
//           <ul>
//             {trys.map((v, i) => {
//               return (
//                 <li key={v + i} style={{ fontSize: "30px" }}>
//                   {v}
//                 </li>
//               );
//             })}
//           </ul>
//         </>
//       );
//     }
//   };

//   render() {
//     return <>{this.printResultText()}</>;
//   }
// }

// export default Result;
