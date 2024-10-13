import React from 'react';
import './style.scss';

interface CardProps {
    card: { id: number; content: string; isFlipped: boolean; isMatched: boolean };
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
    return (
        <div
            className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
            onClick={onClick}
        >
            <div className="card__content">
                {card.isFlipped || card.isMatched ? card.content : '❓'}
            </div>
        </div>
    );
};

export default Card;
