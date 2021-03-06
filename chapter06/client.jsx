import React from "react";
import ReactDom from "react-dom";
import Lotto from "./Lotto";
import { hot } from "react-hot-loader/root";

const Hot = hot(Lotto);

ReactDom.render(
  <>
    <Hot />
  </>,
  document.querySelector(".root")
);
