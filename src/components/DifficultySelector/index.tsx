import React from 'react';

type DifficultySelectorProps = {
    setTileCount: (count: number) => void;
    disabled: boolean;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ setTileCount, disabled }) => {
    const EASY =  12;
    const MEDIUM = 20;
    const HARD = 30;
    const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const difficulty = event.target.value;

        switch (difficulty) {
            case 'easy':
                setTileCount(EASY);
                break;
            case 'medium':
                setTileCount(MEDIUM);
                break;
            case 'hard':
                setTileCount(HARD);
                break;
            default:
                setTileCount(EASY);
                break;
        }
    };

    return (
        <select onChange={handleDifficultyChange} disabled={disabled}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
    );
};

export default DifficultySelector;
