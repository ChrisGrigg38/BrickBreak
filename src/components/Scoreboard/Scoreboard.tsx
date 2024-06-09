import "./Scoreboard.css"

export interface ScoreboardProps {
    score: number,
    ingame: boolean,
    levelnum: number,
    startNewGame: () => void;
};


const Scoreboard = ({score, ingame, levelnum, startNewGame}: ScoreboardProps) => {
    return (
      <div className="Scoreboard">
        <div className="leftSide" data-testid="score">Score: {score}</div>
        {!ingame ? <div><button data-testid="startGameBut" className="startButton" onClick={startNewGame}>Start game</button></div> : null}
        <div className="rightSide" data-testid="levelId">Level: {levelnum}</div>
      </div>
    );
  }
  
  export default Scoreboard;