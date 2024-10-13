import React from 'react';
import Card from '../Card';
import './style.scss';

interface BoardProps {
    cards: { id: number; content: string; isFlipped: boolean; isMatched: boolean }[];
    onCardClick: (id: number) => void;
}

const Board: React.FC<BoardProps> = ({ cards, onCardClick }) => {
    return (
        <div className="board">
            {cards.map(card => (
                <Card key={card.id} card={card} onClick={() => onCardClick(card.id)} />
            ))}
        </div>
    );
};

export default Board;
