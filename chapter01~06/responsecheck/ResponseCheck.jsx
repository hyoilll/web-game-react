//------------------------Hooks------------------------

import React, { useState, useRef, memo } from "react";
import ResultTable from "./ResultTable";

// let timeout = null;
// let startTime = 0;
// let endTime = 0;

const ResponseCheck = memo(() => {
  const [title, setTitle] = useState("클릭해서 시작해주세요.");
  const [color, setColor] = useState("aqua");
  const [className, setClassName] = useState("waiting");
  const [trys, setTrys] = useState([]);

  let timeout = useRef();
  let startTime = useRef();
  let endTime = useRef();

  const onClick = () => {
    console.log("click");

    if (className === "waiting") {
      console.log("waiting");

      setTitle("초록색이 되면 클릭");
      setColor("red");
      setClassName("ready");

      timeout.current = setTimeout(() => {
        setTitle("클릭!!");
        setColor("green");
        setClassName("now");

        startTime.current = new Date();
      }, Math.ceil(Math.random() * 3) * 2000);
    } else if (className === "ready") {
      console.log("ready");

      //너무 빨리 누른것 다시 시작
      setTitle("너무 빨리 눌렀습니다. 다시 시작하세요.");
      setColor("aqua");
      setClassName("waiting");

      clearTimeout(timeout.current);
    } else if (className === "now") {
      console.log("now");

      endTime.current = new Date();

      const record = endTime.current.getTime() - startTime.current.getTime();

      setTitle(`기록은 ${record}ms 입니다. 클릭해서 시작해주세요.`);
      setColor("aqua");
      setClassName("waiting");

      setTrys((prev) => {
        return [...prev, { id: prev.length + 1, record: record }];
      });
    }
  };

  return (
    <>
      <div
        id="screen"
        className={className}
        style={{ background: color }}
        onClick={onClick}
      >
        {title}
      </div>
      <ResultTable trys={trys} />
    </>
  );
});

export default ResponseCheck;

//------------------------class------------------------

// import React, { Component, createRef } from "react";
// import ResultTable from "./ResultTable";

// class ResponseCheck extends Component {
//   state = {
//     title: "클릭해서 시작해주세요.",
//     color: "aqua",
//     className: "waiting",
//     trys: [],
//   };

//   divRef = createRef();
//   timeout = null;
//   startTime = 0;
//   endTime = 0;

//   onClick = () => {
//     console.log("click");
//     const { title, color, className } = this.state;

//     if (this.divRef.current.className === "waiting") {
//       console.log("waiting");

//       this.setState({
//         title: "초록색이 되면 클릭",
//         color: "red",
//         className: "ready",
//       });

//       this.timeout = setTimeout(() => {
//         this.setState({
//           title: "클릭!!",
//           color: "green",
//           className: "now",
//         });
//         this.startTime = new Date();
//       }, Math.ceil(Math.random() * 3) * 2000);
//     } else if (this.divRef.current.className === "ready") {
//       console.log("ready");

//       //너무 빨리 누른것 다시 시작
//       this.setState({
//         title: "너무 빨리 눌렀습니다. 다시 시작하세요",
//         color: "aqua",
//         className: "waiting",
//       });

//       clearTimeout(this.timeout);
//     } else if (this.divRef.current.className === "now") {
//       console.log("now");

//       this.endTime = new Date();

//       const record = this.endTime.getTime() - this.startTime.getTime();

//       this.setState({
//         title: `기록은 ${record}ms 입니다. 클릭해서 시작해주세요.`,
//         color: "aqua",
//         className: "waiting",
//       });

//       this.setState((prev) => {
//         return {
//           trys: [...prev.trys, { id: prev.trys.length + 1, record: record }],
//         };
//       });
//     }
//   };

//   render() {
//     const { title, color, className, trys } = this.state;
//     return (
//       <>
//         <div
//           ref={this.divRef}
//           id="screen"
//           className={className}
//           style={{ background: color }}
//           onClick={this.onClick}
//         >
//           {title}
//         </div>
//         <ResultTable trys={trys} />
//       </>
//     );
//   }
// }

// export default ResponseCheck;
