import "./StartScreen.css";

const StartGame = ({startGame}) => {
  return (
    <div className="start">
      <div className="test">
      <h1>Secret</h1>
      <h1>Wo<span>r</span>d</h1>
      </div>
      <button onClick={startGame}>Começar jogo</button>
    </div>
  );
};

export default StartGame;