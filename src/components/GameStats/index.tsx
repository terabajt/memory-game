type GameStatsProps = {
    attempts: number;
    elapsedTime: number;
    matchedPairs: number;
};

const GameStats = ({ attempts, elapsedTime, matchedPairs }: GameStatsProps) => {
    return (
        <div className="game-stats">
            <p>Attempts: {attempts}</p>
            <p>Elapsed Time: {elapsedTime} seconds</p>
            <p>Matched Pairs: {matchedPairs}</p>
        </div>
    );
};

export default GameStats;
