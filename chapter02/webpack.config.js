//노드의 경로조작 방법
const path = require("path");
const webpack = require("webpack");

module.exports = {
  //웹팩설정의 이름
  name: "word-relay-setting",

  //개발용 모드
  mode: "development", //실 서비스:production

  //빠르게
  devtool: "eval", //실 서비스: hidden-source-map

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
          //presets은 plugins의 모음
          //babel/preset-env는 최신 문법을 과거의 브라우저에서도 돌아가게 해주는 것인데
          //너무 옛날 브라우저까지 호환하게 하려면 파일이 커져서 속도가 느려짐
          //그래서 최근 몇버전까지 구체적으로 작성하고 싶을 떄 이렇게 해줌
          // 'last 2 chrome versions' = 최근 2개버전만 지원
          // '> 5% in KR' = 한국안에서 점유율 5% 이상인 애들만 지원
          //[참고]
          //https://github.com/browserslist/browserslist
          // presets: [
          //   [
          //     "@babel/preset-env",
          //     {
          //       targets: {
          //         browsers: ["> 5% in KR", "last 2 chrome versions"],
          //       },
          //     },
          //   ],
          //   "@babel/preset-react",
          // ],

          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-hot-loader/babel",
          ],
        },
      },
    ],
  },

  //확장 프로그램
  //추가적으로 더 하고 싶을 떄
  //webpack.LoaderOptionsPlugin : module\rules\options에 dubug:true 다 넣어줌
  // plugins: [new webpack.LoaderOptionsPlugin({ dubug: true })],

  //출력
  output: {
    //경로를 알아서 합쳐줌
    //__dirname : 현재 경로 = C:\Users\dlgyd\OneDrive\문서\GitHub\web-game-react\chapter02
    //__dirname의 "dist"
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    //hot-loader
    publicPath: "/dist/",
  },

  //웹팩이 하는 일
  //=> entry의 파일을 합쳐서 output의 path경로에 filename의 파일을 합쳐줌
};
