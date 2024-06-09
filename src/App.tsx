import './App.css';
import Arena from './components/Arena/Arena';

const App = () => {
  return (
    <div data-testid="app" className="App">
      <header className="App-header">
         <Arena />
      </header>
    </div>
  );
}

export default App;
