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
import { Game } from './Game.js'

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

    /**
     * Recalculates the player's total score (done after every new card draw.)
     */
    CalculateTotalScore() {

        let testScore1 = 0
        let testScore2 = 0
        if (this.hand.length > 0) {
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
        }

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

    /**
     * A single card draw - deck will be reshuffled if there is only one card left.
     * 
     * @param {Game} game - The current game.
     */
    Draw(game) {
        if (Deck.deck.length === 1) {
            game.ShuffleDeck()
        }
        let newCard = Deck.deck.splice(0, 1)
        this.hand.push(newCard[0])
        this.CalculateTotalScore()
    }

    /**
     * Prints out the player's hand to the terminal - done at the end of every game.
     * 
     * @returns {string} A string showing the player's hand and total score.
     */
    PrintHand() {
        let printString = ""
        this.hand.forEach(element => {
            printString += element.toString() + " "
        });
        printString += "(" + this.totalScore + ")"
        return printString
    }

    /** 
     * Throws all the player's cards to the usedCardPile - done at the end of every game
     * for both player and dealer.
     * 
     * @param {Game} game - The current game.
     */
    ResetHand(game) {
        this.hand.forEach(element => {
            Deck.usedCardsPile.push(element)
        });
        this.hand.splice(0, this.hand.length)
        this.totalScore = 0
    }
}
