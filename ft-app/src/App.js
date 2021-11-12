import logo from './logo.svg';
import newpict from './astra_zephyr2.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={newpict} className="App-logo" alt="astranaut" />
        <p>
        Learn how to track what you eat and how you exercise with the Astra-Zephyr fitness tracker!
        </p>
       <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
