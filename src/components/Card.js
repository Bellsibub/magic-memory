import React from 'react';
import './Card.css';

const Card = ({ card, handleSelection, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) handleSelection(card);
  };

  return (
    <div className={`card${card.matched ? ' matched' : ''}`}>
      <div className={flipped ? 'flipped' : disabled ? 'disabled' : ''}>
        <img src={card.src} alt={`card front, a ${card.description}`} className="front" />
        <img
          src="/img/cover.png"
          alt="card back"
          className="back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
