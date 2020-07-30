//각 jsx파일마다 쓰이는 애를 다시 생성해줘야함
const React = require("react");
//const { Component } = React;

class WordRelay extends React.Component {
  state = {
    text: "hello, webpack",
  };

  render() {
    return <h1>{this.state.text}</h1>;
  }
}

// const WordRelay = () => {
//   const [text, setText] = React.useState("hello, webpack hooks");

//   return <h1>{text}</h1>;
// };

//쪼갠 파일에서 만든 컴포넌트를 바깥에서도 쓸 수 있게 반환해주는 개념
module.exports = WordRelay;
