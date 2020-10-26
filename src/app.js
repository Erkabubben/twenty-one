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
let playersAmount = 3
if (process.argv.length > 2) {
  if (!Number.isInteger(parseInt(process.argv[2])) || !((parseInt(process.argv[2]) < 8 && parseInt(process.argv[2]) > 0) ||
     (parseInt(process.argv[2]) === 20 || parseInt(process.argv[2]) === 50))) {
    process.exitCode = 26
  }
}

playersAmount = parseInt(process.argv[2])

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
