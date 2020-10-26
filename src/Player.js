/**
 * Module for the type Players.
 *
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @version 1.0.0
 */

import { Ranks } from './Ranks.js'
import { Suits } from './Suits.js'
import { PlayingCard } from './PlayingCard.js'
import { Deck } from './Deck.js'

/**
 * Represents a player.
 *
 * @class
 */
export class Player {

    constructor(_playerNumber) {
        this.playerNumber = _playerNumber
        this.hand = []
        this.totalScore = 0
        this.stayPutScore = 8 + Math.floor(Math.random() * 11)
    }

    CalculateTotalScore() {

        let testScore1 = 0
        let testScore2 = 0
        this.hand.forEach(element => {
            testScore1 += element.valueOf()
        })

        let countedAce = false;
        this.hand.forEach(element => {
            if (element.valueOf() === 1 && !countedAce) {
                countedAce = true
                testScore2 += 14
            }
            else testScore2 += element.valueOf()
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

    Draw(game) {
        if (game.deck.length === 1) {
            game.ShuffleDeck()
        }
        let newCard = game.deck.splice(0, 1)
        this.hand.push(newCard[0])
        this.CalculateTotalScore()
    }

    PrintHand() {
        let printString = ""
        this.hand.forEach(element => {
            printString += element.toString() + " "
        });
        printString += "(" + this.totalScore + ")"
        return printString
    }

    ResetHand(game) {
        this.hand.forEach(element => {
            game.usedCardsPile.push(element)
        });
        this.hand = []
        this.totalScore = 0
    }
}