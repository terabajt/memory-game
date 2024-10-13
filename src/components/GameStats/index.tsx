import React from 'react';

interface GameStatsProps {
    attempts: number;
    elapsedTime: number;
    matchedPairs: number;
}

const GameStats: React.FC<GameStatsProps> = ({ attempts, elapsedTime, matchedPairs }) => {
    return (
        <div className="game-stats">
            <p>Attempts: {attempts}</p>
            <p>Elapsed Time: {elapsedTime} seconds</p>
            <p>Matched Pairs: {matchedPairs}</p>
        </div>
    );
};

export default GameStats;
