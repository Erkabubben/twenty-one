/**
 * The starting point of the application.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @version 1.0.0
 */

import { Deck } from './Deck.js'
import { Player } from './Player.js'
import { Game } from './Game.js'

// Create deck and used card pile
Deck.deck = Deck.create()
Deck.usedCardsPile = []
Deck.shuffle(Deck.deck)

// Retrieve command line arguments
let playersAmount = 0

// Checks validity of command line argument
if (process.argv.length > 2) {
  const arg = parseInt(process.argv[2])
  try {
    if (Number.isNan(arg)) {
      throw new Error('Command line argument must be a number in the range 1-7, 20 or 50.')
    } else if (arg > 7 || arg < 1) {
      if (arg !== 20 && arg !== 50) {
        throw new Error('Command line argument must be a number in the range 1-7, 20 or 50.')
      }
    }
    playersAmount = parseInt(process.argv[2])
  } catch (Error) {
    process.exitCode = 26
    process.exit()
  }
} else {
  playersAmount = 3
}
const players = []

// Add dealer as player 0
players.push(new Player(0))
const dealer = players[0]

// Add other players to game
for (let index = 0; index < playersAmount; index++) {
  players.push(new Player(index))
}

// Player's turn
for (let index = 1; index < playersAmount + 1; index++) {
  const player = players[index]
  const currentGame = new Game(player, dealer)
  currentGame.Start()
}

process.exitCode = 0
