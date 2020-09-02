import React, {useState} from 'react'
import './App.css'
import cardBack from './cardback.svg'
import FULL_DECK, {shuffle} from './full_deck'

function CardPile(props) {
  let {cards} = props

  return <div id="pile" className="cards">{cards}</div>
}

function Game() {
  const [cards, setCards] = useState(FULL_DECK)
  const [pile, setPile] = useState([])
  const [score, setScore] = useState(0)

  function draw() {
    
  }

  function eliminate() {
    
  }

  let canEliminate = false
  const canDraw = cards.length > 0

  function restart() {

  }

  const isGameOver = !(canDraw || canEliminate)
  const restartBtn = isGameOver ? <button onClick={restart}>Restart</button> : ''
  const remaining = isGameOver ? <p>Remaining: {pile.length}</p> : ''
  const cardImg = canDraw ? <img src={cardBack} alt="card-back" /> : ''

  return (
    <div>
      <div className="game">
        <div id="deck" className="cards">
          {cardImg}
        </div>
        <CardPile cards={pile} />    
      </div>
      <button onClick={draw} disabled={!canDraw}>Draw</button>
      <button onClick={eliminate} disabled={!canEliminate}>Eliminate</button>    
      {restartBtn}    
      <p>Score: {score}</p>
      {remaining}
    </div>
  )
}

function App() {
  return (
    <div className="solitaire">
      <header>
        <p>
          Play like an idiot!
        </p>
      </header>
      <Game />
    </div>
  )
}

export default App
