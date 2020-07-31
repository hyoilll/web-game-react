const React = require("react");
const ReactDom = require("react-dom");

const GuGuDan = require("./GuGuDan");
const LikeButton = require("./LikeButton");

ReactDom.render(
  <React.Fragment>
    <GuGuDan />
    <LikeButton />
  </React.Fragment>,
  document.querySelector(".root")
);
