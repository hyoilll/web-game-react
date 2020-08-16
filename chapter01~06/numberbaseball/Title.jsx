//---------------------------Hooks------------------------

import React, { memo } from "react";

const Title = memo(({ chance }) => {
  return (
    <>
      <div style={{ fontSize: "40px" }}>
        Welcome to NumberBaseball world / Chance : {chance}
      </div>
    </>
  );
});

export default Title;

//---------------------------class-------------------------

// import React, { PureComponent } from "react";

// class Title extends PureComponent {
//   render() {
//     const { chance } = this.props;
//     return (
//       <>
//         <div style={{ fontSize: "40px" }}>
//           Welcome to NumberBaseball world / Chance : {chance}
//         </div>
//       </>
//     );
//   }
// }

// export default Title;
