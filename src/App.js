import { useState, useEffect, useCallback } from 'react';
import uniqid from 'uniqid';
import './App.css';
import Card from './components/Card';
import { cardsDefaults } from './defaults/cards';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [selectionOne, setSelectionOne] = useState(null);
  const [selectionTwo, setSelectionTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const newGame = () => {
    const shuffledCards = [...cardsDefaults, ...cardsDefaults]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uniqid() }));
    setCards(shuffledCards);
    setSelectionOne(null);
    setSelectionTwo(null);
    setTurns(0);
  };

  const handleSelection = (card) => {
    selectionOne ? setSelectionTwo(card) : setSelectionOne(card);
  };

  const resetTurn = useCallback(() => {
    setSelectionOne(null);
    setSelectionTwo(null);
    setTurns(turns + 1);
    setDisabled(false);
  }, [turns]);

  useEffect(() => {
    if (selectionOne && selectionTwo) {
      setDisabled(true);
      if (selectionOne.src === selectionTwo.src) {
        setCards((prev) => {
          return prev.map((card) =>
            card.src === selectionOne.src ? { ...card, matched: true } : card
          );
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }

    return () => {};
  }, [resetTurn, selectionOne, selectionTwo]);

  useEffect(() => {
    newGame();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={newGame}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleSelection={handleSelection}
            flipped={card === selectionOne || card === selectionTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
