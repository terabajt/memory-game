import './App.scss';
import Header from './components/Header';
import MemoryGame from './components/MemoryGame';

const App = () => {
    return (
        <div className="app">
            <div className="board-container">
                <Header />
                <MemoryGame />
            </div>
        </div>
    );
};

export default App;
