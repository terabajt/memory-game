import { GameState, TCard } from './game.model.ts';

const TIME_FOR_CHECK_IN_MILLISECONDS = 1000;

export const cardContents = [
    '🍎',
    '🍌',
    '🍇',
    '🍒',
    '🍍',
    '🍓',
    '🍑',
    '🍉',
    '🍋',
    '🍈',
    '🍏',
    '🍐',
    '🍊',
    '🥭',
    '🥥',
    '🍅',
    '🍆',
    '🥑',
    '🥝',
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
] as const;

export const generateNewCardPairs = (numberOfCards: number): TCard[] => {
    if (numberOfCards % 2 !== 0) {
        return [];
    }

    const selectedContents = cardContents.slice(0, numberOfCards / 2);
    const pairedContents = [...selectedContents, ...selectedContents];

    return pairedContents
        .sort(() => Math.random() - 0.5)
        .map(
            (content, index): TCard => ({
                id: index,
                type: content,
                isFlipped: false,
                isMatched: false,
            }),
        );
};

const isMatched = (cards: TCard[]) => {
    const flippedCards = cards.filter(card => card.isFlipped);

    return flippedCards.some(firstCard =>
        flippedCards.find(
            secondCard => secondCard.id !== firstCard.id && secondCard.type === firstCard.type,
        ),
    );
};

export const flipCard = (
    cardId: number,
    state: GameState,
    set: (callback: () => Partial<GameState>) => void,
) => {
    const clickedCard = state.cards.find(card => card.id === cardId);
    const flippedCards = state.cards.filter(card => card.isFlipped);

    if (
        !clickedCard ||
        flippedCards.length >= 2 ||
        clickedCard.isFlipped ||
        clickedCard.isMatched
    ) {
        return;
    }

    const updatedCards = state.cards.map(card =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card,
    );

    if (!isMatched(updatedCards)) {
        set(() => ({
            stats: {
                ...state.stats,
                attempts:
                    updatedCards.filter(card => card.isFlipped).length >= 2
                        ? state.stats.attempts + 1
                        : state.stats.attempts,
            },
            cards: updatedCards,
        }));

        if (updatedCards.filter(card => card.isFlipped).length >= 2) {
            setTimeout(() => {
                set(() => ({ cards: updatedCards.map(card => ({ ...card, isFlipped: false })) }));
            }, TIME_FOR_CHECK_IN_MILLISECONDS);
        }

        return;
    }

    set(() => ({
        cards: updatedCards,
        stats: {
            ...state.stats,
            attempts:
                updatedCards.filter(card => card.isFlipped).length >= 2
                    ? state.stats.attempts + 1
                    : state.stats.attempts,
            matchedPairs: state.stats.matchedPairs + 1,
        },
    }));

    setTimeout(() => {
        const matchedCards = updatedCards.map(card =>
            card.isFlipped ? { ...card, isMatched: true, isFlipped: false } : card,
        );

        if (matchedCards.every(card => card.isMatched)) {
            state.finishGame();
        } else {
            set(() => ({ cards: matchedCards }));
        }
    }, TIME_FOR_CHECK_IN_MILLISECONDS);
};
