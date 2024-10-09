import React from 'react';

interface DifficultySelectorProps {
    setTileCount: (count: number) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ setTileCount }) => {
    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const difficulty = event.target.value;

        switch (difficulty) {
            case 'easy':
                setTileCount(12);
                break;
            case 'medium':
                setTileCount(20);
                break;
            case 'hard':
                setTileCount(30);
                break;
            default:
                setTileCount(12);
                break;
        }
    };

    return (
        <select onChange={handleDifficultyChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    );
};

export default DifficultySelector;