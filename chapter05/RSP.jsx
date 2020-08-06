import React, { Component } from "react";

class RSP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      win: 0,
      loss: 0,
      draw: 0,
      obj: {
        가위: "0",
        바위: "-170px",
        보: "-357px",
      },
    };
    this.divRef = React.createRef();
  }

  computerSelect = "0";
  interval = 0;
  intervalFleg = false;

  makeInterval = () => {
    const { obj } = this.state;
    console.log("interval");

    this.interval = setInterval(() => {
      if (this.computerSelect === obj.가위) {
        this.computerSelect = obj.바위;
      } else if (this.computerSelect === obj.바위) {
        this.computerSelect = obj.보;
      } else if (this.computerSelect === obj.보) {
        this.computerSelect = obj.가위;
      }
    }, 50);

    console.log(this.divRef.current);
    const cmp = this.divRef.current;
    cmp.style.backGround = "url(image.jpg)" + this.computerSelect + " 0";
  };

  render() {
    return (
      <>
        <div
          ref={this.divRef}
          className="computer"
          onClick={this.makeInterval}
        ></div>
        <button>가위</button>
        <button>바위</button>
        <button>보</button>
        <button>ReStart</button>
      </>
    );
  }
}

export default RSP;
