import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
function Dice(props) {
  return (
    <div
      onClick={props.toggle}
      style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
      className="die-face"
    >
      <h1 className="die-number">{props.value}</h1>
    </div>
  );
}
function Tenzi() {
  const [dice, setDice] = useState(createRandNumber());
  const [tenzies, setTenzies] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timeDisplay, setTimeDisplay] = useState(true)
  const [bestTime, setBestTime] = useState(JSON.parse(localStorage.getItem("bestTime")) || [])

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  useEffect(() =>{
    setTimeout(function(){
      setTimeDisplay(prev => !prev)},500)
  },[timeDisplay])

  ///Generate new die
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    };
  }
  useEffect(()=>{
      localStorage.setItem('bestTime', JSON.stringify(bestTime))
  },[bestTime])
  useEffect(() => {
    setTimeout(function(){
      setTimer(prev => prev + 1);
    }, 1000);
  },[timer]);
  function createRandNumber() {
    const newArr = [];

    for (let i = 0; i < 10; i++) {
      newArr.push(generateNewDie());
    }
    return newArr;
  }
  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }
  function newGame() {
    setDice(createRandNumber());
    setTenzies(false);
    setTimer(0)
    tenzies && setBestTime(prev => [...prev, timer])
  }

  function hold(id) {
    setDice((prevDice) => {
      const d = prevDice.map((item) =>
        item.id === id ? { ...item, isHeld: !item.isHeld } : item
      );
      return d;
    });
  }

  const diceElements = dice.map((die) => (
    <Dice
      toggle={() => hold(die.id)}
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti />}

      { tenzies === false && timeDisplay && <h1 className="timer">{timer}</h1>}
      {tenzies ? (
        <h1>Congratulations</h1>
      ) : (
        <div>
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
      )}
      <div className="dice-container">{diceElements}</div>
      <button onClick={tenzies ? newGame : rollDice} className="roll">
        {tenzies ? "New Game" : "Roll Dice!"}
      </button>
    </main>
  );
}

export default Tenzi;
