import React, {useState} from 'react'
import './App.css'
import cardBack from './cardback.svg'
import FULL_DECK, {shuffle} from './full_deck'

function CardPile(props) {
  let {cards} = props
  if (cards.length > 4) {
    cards = cards.slice(cards.length - 4, cards.length)
  }
  const cardPile = cards.map(card => {
    const cardClass = ['♦️', '♥️'].includes(card.suit) ? 'card red' : 'card'
    return (
      <div className={cardClass} key={card.suit + card.value}>
        <p className="card-value">{card.value}</p>
        <p className="card-suit">{card.suit}</p>
      </div>
    )
  })

  return <div id="pile" className="cards">{cardPile}</div>
}

function Game() {
  const [cards, setCards] = useState(FULL_DECK)
  const [pile, setPile] = useState([])
  const [score, setScore] = useState(0)

  function draw() {
    const newCards = [...cards]
    const newPile = [...pile]  
    do {    
      const drawnCard = newCards.shift()    
      newPile.push(drawnCard)     
    }
    while (newPile.length < 4 && newCards.length > 0)

    setCards(newCards)
    setPile(newPile)
  }

  function eliminate() {
    const newPile = [...pile]

    newPile.splice(newPile.length - 4, 1)
    newPile.splice(newPile.length -1, 1)
    setScore(score + 2)

    setPile(newPile)
  }

  let canEliminate = false
  if (pile.length >= 4) {
    const fourthDown = pile[pile.length - 4],
          lastCard = pile[pile.length - 1]
    
    canEliminate = lastCard.value === fourthDown.value || lastCard.suit === fourthDown.suit
  }
  const canDraw = cards.length > 0

  function restart() {
    setPile([])
    setCards(shuffle(FULL_DECK))
    setScore(0)
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
