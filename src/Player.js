/**
 * Module for the type Players.
 *
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @version 1.0.0
 */

import { Ranks } from './Ranks.js'
import { Suits } from './Suits.js'
import { PlayingCard } from './PlayingCard.js'

/**
 * Represents a player.
 *
 * @class
 */
export class Player {

    constructor() {
        this.hand = []
    }
}