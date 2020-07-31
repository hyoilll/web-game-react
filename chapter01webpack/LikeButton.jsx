const React = require("react");

const LikeButton = () => {
  const [likeCnt, setLikeCnt] = React.useState(0);

  const onClickLike = () => {
    setLikeCnt((preState) => {
      const cnt = preState + 1;
      return cnt;
    });
  };
  const onClickHate = () => {
    setLikeCnt((preState) => {
      const cnt = preState - 1;
      if (cnt >= 0) {
        return cnt;
      } else {
        return 0;
      }
    });
  };

  return (
    <React.Fragment>
      <button type="submit" onClick={onClickLike}>
        Like
      </button>
      <button type="submit" onClick={onClickHate}>
        Hate
      </button>

      <div>current Like Count : {likeCnt}</div>
    </React.Fragment>
  );
};

module.exports = LikeButton;
