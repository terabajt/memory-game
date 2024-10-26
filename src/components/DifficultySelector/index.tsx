import { GameLevel } from '../../store/game.model';
import { ChangeEvent, useCallback } from 'react';

type DifficultySelectorProps = {
    onDifficultyChange: (level: GameLevel) => void;
    disabled: boolean;
    value: GameLevel | undefined;
};

const options: { value: GameLevel; name: string }[] = [
    {
        value: 'easy',
        name: 'Easy',
    },
    {
        value: 'medium',
        name: 'Medium',
    },
    {
        value: 'hard',
        name: 'Hard',
    },
];

const DifficultySelector = ({ onDifficultyChange, value, disabled }: DifficultySelectorProps) => {
    const handleDifficultyChange = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            onDifficultyChange(event.target.value as GameLevel);
        },
        [onDifficultyChange],
    );

    return (
        <select value={value} onChange={handleDifficultyChange} disabled={disabled}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default DifficultySelector;
