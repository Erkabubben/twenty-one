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
        this.totalScore = 0
    }

    CalculateTotalScore() {

        let testScore1 = 0
        let testScore2 = 0
        hand.forEach(element => {
            testScore1 += element.valueOf
        })

        hand.forEach(element => {
            let countedAce = false;
            if (element.valueOf === 1 && !countedAce) {
                countedAce = true
                testScore2 += 14
            }
            else testScore2 += element.valueOf
        })

        if (testScore1 > 21) {
            this.totalScore = testScore2
        }
        else if (testScore2 > 21) {
            this.totalScore = testScore1
        }
        else {
            this.totalScore = Math.max(testScore1, testScore2)
        }
    }

    Draw() {
        let newCard = playingCards.splice(0, 1)
        hand.push(newCard)
        CalculateTotalScore()
    }
}