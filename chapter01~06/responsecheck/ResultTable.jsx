//-------------------------function component------------------------

import React, { memo } from "react";

const ResultTable = memo(({ trys }) => {
  const averageResult = () => {
    let sum = 0;
    trys.forEach((v) => {
      sum = sum + v.record;
    });

    return sum / trys.length;
  };

  const printResult = () => {
    if (trys.length === 0) {
      return;
    } else {
      return (
        <>
          <ul>
            <div style={{ fontSize: "30px" }}>Result</div>
            {trys.map((v, i) => {
              return (
                <>
                  <li key={v.id}>{`${i + 1}차 결과 : ${v.record}ms`}</li>
                </>
              );
            })}
            <div>{`평균 : ${averageResult()}ms`}</div>
          </ul>
        </>
      );
    }
  };

  return <>{printResult()}</>;
});

export default ResultTable;

//-------------------------class-------------------------

// import React, { Component } from "react";

// class ResultTable extends Component {
//   averageResult = (trys) => {
//     let sum = 0;
//     trys.forEach((v) => {
//       sum = sum + v.record;
//     });

//     return sum / trys.length;
//   };

//   printResult = () => {
//     const { trys } = this.props;
//     if (trys.length === 0) {
//       return;
//     } else {
//       return (
//         <>
//           <ul>
//             <div style={{ fontSize: "30px" }}>Result</div>
//             {trys.map((v, i) => {
//               return (
//                 <>
//                   <li key={v.id}>{`${i + 1}차 결과 : ${v.record}ms`}</li>
//                 </>
//               );
//             })}
//             <div>{`평균 : ${this.averageResult(trys)}ms`}</div>
//           </ul>
//         </>
//       );
//     }
//   };

//   render() {
//     return <>{this.printResult()}</>;
//   }
// }

// export default ResultTable;
