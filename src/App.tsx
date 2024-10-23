import './App.scss';

import MemoryGame from './components/MemoryGame';
import Header from './components/Header';

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
