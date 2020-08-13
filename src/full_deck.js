const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
const SUITS = ['♣️', '♦️', '♥️', '♠️']

const buildSuit = (suit) => {
  return VALUES.map((value) => {
    return {value, suit}
  })
}
const buildDeck = () => SUITS.reduce((deck, suit) => deck.concat(buildSuit(suit)), [])

export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}
const FULL_DECK = shuffle(buildDeck())

export default FULL_DECK