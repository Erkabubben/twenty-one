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
import { Game } from './Game.js'

try {
  // Create 52 playing cards and...
  const playingCards = Deck.create()
  //console.log(playingCards.join(', '), '\n')

  // ...shuffle them.
  Deck.shuffle(playingCards)
  //console.log(playingCards.join(', '), '\n')

  // Draw three playing cards, view the remaining playing cards, the drawn playing cards and
  // then calculate the value of them.
  // (`value + playingCard` implicitly calls PlayingCard#valueOf to get
  //  the primitive value of the current PlayingCard object.)
  const hand = playingCards.splice(0, 3)

  //console.log(playingCards.join(', '))

  const value = hand.reduce((value, playingCard) => value + playingCard, 0)
  //console.log(`${hand.join(' ')} (${value})`)
} catch (e) {
  console.error(e.message)
}

const deck = Deck.create()
Deck.shuffle(deck)

let playersAmount = 1
if (process.argv.length > 2) playersAmount = parseInt(process.argv[2])


const players = []
players.push(new Player(0))  // Add dealer as player 0
const dealer = players[0];

// Add other players to game
for (let index = 0; index < playersAmount; index++) {
  const element = players[index];
  players.push(new Player(index))
}

let currentPlayer = 1

function NewDraw(player, resultString, lastPlayerScore) {
  if (lastPlayerScore !== 21) {
    player.Draw(deck)
  }
  if (player.totalScore > 21 || player.totalScore > player.stayPutScore 
    || player.totalScore > lastPlayerScore) {
    if (lastPlayerScore === 21) {
      resultString += "-"
    }
    else {
      resultString += player.PrintHand()
    }
    lastPlayerScore = player.totalScore
    console.log(resultString)
  }
  else NewDraw(player, resultString, lastPlayerScore)
}

// Player's turn
for (let index = 1; index < playersAmount + 1; index++) {
  const player = players[index];
  let currentGame = new Game(player, dealer, deck)
}



