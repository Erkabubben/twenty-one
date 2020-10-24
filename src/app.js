/**
 * The starting point of the application.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author // TODO: YOUR NAME <YOUR EMAIL>
 * @version 1.0.0
 */

// TODO: Replace the code below with your own game logic.

import { Deck } from './Deck.js'

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

const playersAmount = 3

const players = []
players.push(new Player())
const dealer = players[0];

for (let index = 0; index < playersAmount; index++) {
  const element = players[index];
  players.push(new Player())
}

let currentPlayer = 1

function NewDraw() {
  player.Draw()
  if (player.totalScore > 21 || player.totalScore > player.stayPutScore ) {
    resultString += player.PrintHand()
    console.log(resultString)
  }
  else NewDraw()
}

for (let index = 1; index <= playersAmount; index++) {
  const player = players[index];
  let resultString = "Player #" + index + ": "

  NewDraw()


}