import Card from '../Card';
import './style.scss';

type BoardProps = {
    cards: { id: number; content: string; isFlipped: boolean; isMatched: boolean }[];
    onCardClick: (id: number) => void;
};

const Board = (props: BoardProps) => {
    const { cards, onCardClick } = props;
    return (
        <div className="board">
            {cards.map(card => (
                <Card key={card.id} card={card} onClick={() => onCardClick(card.id)} />
            ))}
        </div>
    );
};

export default Board;
