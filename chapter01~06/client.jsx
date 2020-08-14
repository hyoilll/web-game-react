import React from "react";
import ReactDom from "react-dom";
import MyComponent from "./numberbaseball/NumberBaseball";

import { hot } from "react-hot-loader/root";

const Hot = hot(MyComponent);

ReactDom.render(<Hot />, document.querySelector(".root"));
