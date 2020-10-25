/**
 * Module for the type Game.
 *
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @version 1.0.0
 */

import { Ranks } from './Ranks.js'
import { Suits } from './Suits.js'
import { PlayingCard } from './PlayingCard.js'
import { Player } from './Player.js'

/**
 * Represents a game.
 *
 * @class
 */
export class Game {

    constructor(player) {
        this.hand = []
        this.totalScore = 0
        this.stayPutScore = 8 + Math.floor(Math.random() * 11)
    }
}