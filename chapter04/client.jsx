import React from "react";
import ReactDom from "react-dom";

import ResponseCheck from "./ResponseCheck";

const { hot } = require("react-hot-loader/root");
const Hot = hot(ResponseCheck);

ReactDom.render(<Hot />, document.querySelector(".root"));
