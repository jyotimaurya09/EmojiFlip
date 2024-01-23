import React from 'react'
import './Card.css'

interface CardProps {
  card: { src: string; matched: boolean, id: number };
  handleChoice: (card: { src: string; matched: boolean, id: number }) => void;
  flipped: boolean;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({card, handleChoice, flipped, disabled}) => {
  const handleClick = () => {
    if(!disabled){
        handleChoice(card);
    }    
}
  return (
    <div className='cardItem' key={card.id}>
      <div className={flipped ? "flipped": ""}>
      <img src={card.src} className='card-image-front' />
      <img src="/img/7.png" className='card-image-back' onClick={handleClick} />
      </div>
    </div>
  )
}

export default Card;