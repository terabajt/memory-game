import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from './index';
import { TCard } from '../../store/game.model.ts';

const cards :TCard[] = [
    { id: 1, type: '🍇', isFlipped: false, isMatched: false },
    { id: 2, type: '🍌', isFlipped: false, isMatched: false },
    { id: 3, type: '🍎', isFlipped: false, isMatched: false },
];

describe('Board Component', () => {
    test('should render all cards', () => {
        render(<Board cards={cards} onCardClick={() => {}} />);
        const questionMarks = screen.getAllByText('❓');
        expect(questionMarks).toHaveLength(cards.length);
    });

    test('should call onCardClick when a card is clicked', () => {
        const onCardClick = vi.fn();
        render(<Board cards={cards} onCardClick={onCardClick} />);
        fireEvent.click(screen.getAllByText('❓')[0]);
        expect(onCardClick).toHaveBeenCalledWith(cards[0].id);
    });
});
