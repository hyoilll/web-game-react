import React from "react";
import ReactDom from "react-dom";

import NumberBaseBall from "./NumberBaseball";

const { hot } = require("react-hot-loader/root");
const Hot = hot(NumberBaseBall);

ReactDom.render(
  <>
    <Hot />
  </>,
  document.querySelector(".root")
);
