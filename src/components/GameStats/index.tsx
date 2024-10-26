import './style.scss';
import { useGameStore } from '../../store/game.store';
import { useEffect, useState } from 'react';

const getTime = (startTime: number) => {
    return Math.floor((Date.now() - startTime) / 1000);
};

const GameStats = () => {
    const { stats, status } = useGameStore();
    const [currentTime, setCurrentTime] = useState(
        status !== 'not-started' ? getTime(stats.startTime) : 0,
    );

    useEffect(() => {
        if (status === 'in-progress') {
            const timer = setInterval(() => {
                setCurrentTime(getTime(stats.startTime));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [getTime, status, stats.startTime, setCurrentTime]);

    return (
        <div className="game-stats">
            <p>Attempts: {stats.attempts}</p>
            <p>Elapsed Time: {currentTime} seconds</p>
            <p>Matched Pairs: {stats.matchedPairs}</p>
        </div>
    );
};

export default GameStats;
