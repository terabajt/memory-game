import MemoryGame from './components/MemoryGame';
import './styles/App.scss';
const App: React.FC = () => {
  return (
    <div className="app">
      <div className="board-container">
        <h1>Memory Game</h1>
        <MemoryGame />
      </div>

    </div>
  );
};

export default App;
