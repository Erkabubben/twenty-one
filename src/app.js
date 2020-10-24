/**
 * The starting point of the application.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @version 1.0.0
 */

// TODO: Replace the code below with your own game logic.

import { Deck } from './Deck.js'
import { Player } from './Player.js'

try {
  // Create 52 playing cards and...
  const playingCards = Deck.create()
  console.log(playingCards.join(', '), '\n')

  // ...shuffle them.
  Deck.shuffle(playingCards)
  console.log(playingCards.join(', '), '\n')

  // Draw three playing cards, view the remaining playing cards, the drawn playing cards and
  // then calculate the value of them.
  // (`value + playingCard` implicitly calls PlayingCard#valueOf to get
  //  the primitive value of the current PlayingCard object.)
  const hand = playingCards.splice(0, 3)

  console.log(playingCards.join(', '))

  const value = hand.reduce((value, playingCard) => value + playingCard, 0)
  console.log(`${hand.join(' ')} (${value})`)
} catch (e) {
  console.error(e.message)
}

const deck = Deck.create()
Deck.shuffle(deck)

const playersAmount = 3

const players = []
players.push(new Player())  // Add dealer as player 0
const dealer = players[0];

// Add other players to game
for (let index = 0; index < playersAmount; index++) {
  const element = players[index];
  players.push(new Player())
}

let currentPlayer = 1

function NewDraw(player) {
  player.Draw(deck)
  if (player.totalScore > 21 || player.totalScore > player.stayPutScore ) {
    resultString += player.PrintHand()
    console.log(resultString)
  }
  else NewDraw()
}

// Player's turn
for (let index = 1; index <= playersAmount; index++) {
  const player = players[index];
  let resultString = "Player #" + index + ": "

  NewDraw(player)
  
  // Dealers's turn
  resultString = "Dealer #" + index + ": "
  NewDraw(dealer)

}