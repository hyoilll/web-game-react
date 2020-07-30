//react, reactDom 불러오기
const React = require("react");
const ReactDom = require("react-dom");

//WordRelay 불러오기
const WordRelay = require("./WordRelay");

ReactDom.render(<WordRelay />, document.querySelector(".root"));
