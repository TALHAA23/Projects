import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import formatDuration from "format-duration";
import Die from "./component/Die";
import Score from "./component/Score";

function allNewDies() {
  return Array(10)
    .fill()
    .map(() => generateNewDie());
}

function generateNewDie() {
  return {
    value: `dice-six-faces-${Math.ceil(Math.random() * 6)}.svg`,
    // value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid(),
  };
}

export default function App() {
  const [dies, setDies] = React.useState(allNewDies);
  const [tenzies, setTenzeis] = React.useState(false);
  const [countRoll, setCountRoll] = React.useState(0);
  const [upTime, setUpTime] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(
    JSON.parse(localStorage.getItem("score")) || []
  );
  const dieElements = dies.map((die) => {
    return <Die key={die.id} {...die} handleChange={() => heldDie(die.id)} />;
  });

  React.useEffect(() => {
    const selectedNumber = dies[0].value;
    const allHeld = dies.every(
      (die) => die.isHeld && die.value == selectedNumber
    );
    if (allHeld) setTenzeis(true);
  }, [dies]);

  React.useEffect(() => {
    let intervalId;
    if (tenzies) {
      setBestScore((prevScore) => [upTime, ...prevScore]);
    } else {
      intervalId = setInterval(() => {
        setUpTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [tenzies]);

  React.useEffect(() => {
    if (bestScore.length > 5) bestScore.pop();
    localStorage.setItem("score", JSON.stringify(bestScore));
  }, [bestScore]);

  function rollDies() {
    if (tenzies) {
      setUpTime(0);
      setTenzeis(false);
      setCountRoll(0);
      setDies(allNewDies);
      return;
    }

    setDies((prevDies) =>
      prevDies.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );

    setCountRoll((prevCount) => prevCount + 1);
  }

  function heldDie(id) {
    setDies((prevDies) =>
      prevDies.map((die) => {
        return die.id == id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <>
      <div className="monitors roll-monitor">
        Count Roll: <b>{countRoll}</b>
      </div>
      <div className="monitors time-monitor">
        {formatDuration(upTime * 1000)}
      </div>
      <Score scoreList={bestScore} />
      <main>
        <div>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="dice-container">{dieElements}</div>
        <button className="roll-button" onClick={rollDies}>
          {tenzies ? "Start New" : "Roll"}
        </button>
        {tenzies && <Confetti />}
      </main>
    </>
  );
}
