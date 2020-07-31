# web-game-react

<!--
 ---React, babel, webpack, react-hot-loader, webpack-dev-server 설정---

    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

리엑트, 바벨 설치 과정
리액트 개발에 필요한 패키지를 넣어줄 파일 생성
npm init

리액트, 리액트 돔
npm i react react-dom

웹팩 설치
-D : 개발용 웹팩
npm i -D webpack webpack-cli

바벨 설치
개발용
기본적인 바벨
npm i -D @babel/core
내 브라우저에 맞게 최신문법을 옛날문법으로
npm i @babel/preset-env
jsx 지원가능
npm i @babel/preset-react
바벨 웹펙 연결해줌
npm i babel-loader

webpack.config.js 파일 생성

웹팩 자동 빌드 (webpack.config.js파일은 변경시 서버 재실행 해야함)
npm i -D react-hot-loader 설치
프론트엔드 코드 변경점을 서버에서 관리해줌
npm i -D webpack-dev-server 설치
package.json => "dev" : "webpack-dev-server --hot" 으로 변경
client.jsx =>
const {hot} = require("react-hot-loader/root"); 추가
const Hot = hot(ComponentName); 추가
ReactDom.render(<Hot/>, document.querySelector(".root")); 변경
webpack.config.js =>
module\options\plugins:["react-hot-loader/babel"]; 추가
output\publicPath:'/dist/', 추가
-->
