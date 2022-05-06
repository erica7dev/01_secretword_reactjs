import React from 'react'
import "./GameOver.css"

const GameOver = ({retry, score}) => {
  return (
    <div className='gameover'>
      <h1>Fim do jogo!</h1>
      <h2>Pontuação obtida: <span>{score}</span></h2>
      <button onClick={retry}>Reiniciar</button>
    </div>
  )
}

export default GameOver