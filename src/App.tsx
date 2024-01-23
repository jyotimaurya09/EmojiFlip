import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

const cardImages = [
  { "src": "/img/1.png", "matched": false },
  { "src": "/img/2.png", "matched": false },
  { "src": "/img/3.png", "matched": false },
  { "src": "/img/4.png", "matched": false },
  { "src": "/img/5.png", "matched": false },
  { "src": "/img/6.png", "matched": false },
]

function App() {
  const [cards, setCards] = useState<Array<{ src: string; matched: boolean, id: number }>>([]);
  const [score, setScore] = useState(0);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState<{ src: string, matched: boolean, id: number } | null >(null);
  const [choiceTwo, setChoiceTwo] = useState<{ src: string, matched: boolean, id: number } | null>(null);

  const [disabled, setDisabled] = useState<boolean>(false)

  const shuffleCards = () => {
    // shuffle cards and put into cards state
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => (
        Math.random() - 0.5
      ))
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setScore(0);
  }

  const handleChoice = (card: { src: string, matched: boolean, id: number }) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => (prevTurn + 1));
    setDisabled(false);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        console.log("Cards matched")
        setCards((prevCards) =>
          prevCards.map((prevCard) =>
            prevCard.src === choiceOne.src ? { ...prevCard, matched: true } : prevCard
          )
        );
        setScore((prevScore) => (prevScore+1));

        resetTurn();
      }
      else {
        console.log("Cards not matched")
        setTimeout(() => resetTurn(), 800)
      }
    }

  }, [choiceOne, choiceTwo])

  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <div className='header'>
        <img src='/img/7.png' className='App-logo' />
        <h1 className='heading'>Emoji Flip</h1>
      </div>
      <div className='second-header'>
        <p>Score: {score}</p>
        <p>Turns: {turns}</p>
      </div>
      <div className='grid-container'>
        <div className='grid'>
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={() => handleChoice(card)}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <div className='button-container'>
        <button className='button' onClick={shuffleCards}>New Game</button>
      </div>
    </div>
  );
}

export default App;
