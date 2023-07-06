import formatDuration from "format-duration";

export default function Score(props) {
  const scores = props.scoreList.sort((a, b) => a - b);
  const scoresElements = scores.map((score, index) => (
    <p key={index}>
      {index + 1} - {formatDuration(score * 1000)}
    </p>
  ));

  return (
    <div className="score-board">
      <div className="score-board--head">Top 5 Best Score's</div>
      <div className="score-board--body">{scoresElements}</div>
    </div>
  );
}
