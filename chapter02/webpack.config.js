//노드의 경로조작 방법
const path = require("path");

module.exports = {
  //웹팩설정의 이름
  name: "word-relay-setting",

  //개발용 모드
  mode: "development", //실 서비스:production

  //빠르게
  devtool: "eval",

  //entry에서 파일 불러올 때 확장자를 안써주고
  //resolve에 따로 적어줄 수 있음
  //./client.js or ./client.jsx 를 찾아줌
  resolve: {
    extensions: [".js", ".jsx"],
  },

  //입력
  entry: {
    //"./WordRelay.jsx"를 안해줘도 되는 이유는 client.jsx에서
    //WordRelay를 불러오고 있기 때문에 다시 안 불러와도 됨
    app: ["./client"],
  },

  //entry의 파일들을 읽고, 모듈을 적용한 후 output으로 보냄
  module: {
    //여러개의 규칙
    rules: [
      {
        // 정규표현식 : js, jsx에 룰을 적용
        test: /\.jsx?/,
        // 위의 js, jsx파일에 바벨을 적용해서 최신 문법을 호환되는 문법으로 바꿔주겠다.
        loader: "babel-loader",
        // js, jsx파일에 바벨을 적용해줌
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },

  //출력
  output: {
    //경로를 알아서 합쳐줌
    //__dirname : 현재 경로 = C:\Users\dlgyd\OneDrive\문서\GitHub\web-game-react\chapter02
    //__dirname의 "dist"
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },

  //웹팩이 하는 일
  //=> entry의 파일을 합쳐서 output의 path경로에 filename의 파일을 합쳐줌
};
