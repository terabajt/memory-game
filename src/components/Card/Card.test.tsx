import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './index';

describe('Card Component', () => {
    const mockOnClick = vi.fn();

    it('should render card with question mark when not flipped and not matched', () => {
        const card = { id: 1, content: 'Card 1', isFlipped: false, isMatched: false };

        render(<Card card={card} onClick={mockOnClick} />);

        expect(screen.getByText('❓')).toBeTruthy();
    });

    it('should render card content when flipped', () => {
        const card = { id: 1, content: 'Card 1', isFlipped: true, isMatched: false };

        render(<Card card={card} onClick={mockOnClick} />);

        expect(screen.getByText('Card 1')).toBeTruthy();
    });

    it('should render matched card content', () => {
        const card = { id: 1, content: 'Card 1', isFlipped: true, isMatched: true };

        render(<Card card={card} onClick={mockOnClick} />);

        expect(screen.getByText('Card 1')).toBeTruthy();
    });

    it('should call onClick when card is clicked', () => {
        const card = { id: 1, content: 'Card 1', isFlipped: false, isMatched: false };

        render(<Card card={card} onClick={mockOnClick} />);

        fireEvent.click(screen.getByText('❓'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should have the correct classes based on props', () => {
        const card = { id: 1, content: 'Card 1', isFlipped: true, isMatched: true };

        const { container } = render(<Card card={card} onClick={mockOnClick} />);

        expect((container.firstChild as Element)?.classList).toContain('flipped');
        expect((container.firstChild as Element)?.classList).toContain('matched');
    });

    it('should have only flipped class when flipped but not matched', () => {
        const card = { id: 1, content: 'Card 1', isFlipped: true, isMatched: false };

        const { container } = render(<Card card={card} onClick={mockOnClick} />);

        expect((container.firstChild as Element)?.classList).toContain('flipped');
        expect((container.firstChild as Element)?.classList).not.toContain('matched');
    });
});
