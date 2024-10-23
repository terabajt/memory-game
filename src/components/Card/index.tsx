import React from 'react';
import './style.scss';
import { TCard } from '../../store/game.model';

type CardProps = {
    card: TCard;
    onClick: () => void;
};

const Card: React.FC<CardProps> = ({ card, onClick }) => {
    return (
        <div
            className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
            onClick={onClick}
        >
            <div className="card__content">
                {card.isFlipped || card.isMatched ? card.type : '❓'}
            </div>
        </div>
    );
};

export default Card;
