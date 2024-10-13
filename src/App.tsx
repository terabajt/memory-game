import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import MemoryGame from './components/MemoryGame';

const App = () => {
    return (
        <div className="app">
            <div className="board-container">
                <Header />
                <MemoryGame />
                <Footer />
            </div>
        </div>
    );
};

export default App;
