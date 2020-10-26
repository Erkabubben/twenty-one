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
import { Deck } from './Deck.js'

/**
 * Represents a player versus dealer game - a separate game is initiated for every player
 * present. The card stack remains the same, and is re-shuffled when necessary.
 *
 * @class
 */
export class Game {
    /**
    * @param {Player} player - The player currently drawing against the dealer.
    * @param {Player} dealer - The dealer.
    */
    constructor(_player, _dealer) {
        this.player = _player
        this.dealer = _dealer
        this._winner = ""

        this.resultStringPlayer = "Player #" + this.player.playerNumber + ": "
        this.resultStringDealer = "Dealer" + ": "
    }

    /**
     * Starts the game round and presents the result.
     */
    Start() {
        this.PlayerTurn()

        if (this._winner !== "") {
            this.DisplayGameResult()
        }
        else {
            this.DealerTurn()
        }
        
        this.DisplayGameResult()

        this.dealer.ResetHand(this)
        this.player.ResetHand(this)
        
        /* Un-comment the line below to display deck sizes after every game */
        //console.log ("deck.length: " + Deck.deck.length + ", usedCardsPile.length: " + Deck.usedCardsPile.length)

        console.log ("--------------------------------------------------------------------------------\n")
    }

    /**
     * The player's turn to draw cards.
     */
    PlayerTurn() {
        this.player.Draw(this)
        if (this._winner === "") {
            if (this.player.totalScore === 21) {
                this._winner = "player"
            }
            else if (this.player.hand.length === 5 && this.player.totalScore <= 21) {
                this._winner = "player"
            }
            else if (this.player.totalScore > 21) {
                this._winner = "dealer"
            }
            else if (this.player.totalScore < this.player.stayPutScore) {
                this.PlayerTurn()
            }
        }
    }

    /**
     * The dealer's turn to draw cards.
     */
    DealerTurn() {
        this.dealer.Draw(this)
        if (this._winner === "") {
            if (this.dealer.totalScore === 21) {
                this._winner = "dealer"
            }
            else if (this.dealer.hand.length === 5 && this.dealer.totalScore <= 21) {
                this._winner = "dealer"
            }
            else if (this.dealer.totalScore > 21) {
                this._winner = "player"
            }
            else if  (this.dealer.totalScore >= this.player.totalScore){
                this._winner = "dealer"
            }
            else if (this.dealer.totalScore < this.player.totalScore) {
                this.DealerTurn()
            }
        }
    }

    /**
     * Prints the game results to the terminal - done at the end of every game.
     */
    DisplayGameResult() {
        if (this._winner === "player") {
            console.log(this.resultStringPlayer + this.player.PrintHand())
            console.log(this.resultStringDealer + this.dealer.PrintHand())
            console.log("\nPlayer wins!\n")
        }
        else if (this._winner === "dealer") {
            console.log(this.resultStringPlayer + this.player.PrintHand())
            console.log(this.resultStringDealer + this.dealer.PrintHand())
            console.log("\nDealer wins!\n")
        }
        else {
            console.log(this.resultStringPlayer + this.player.PrintHand())
            console.log(this.resultStringDealer + this.dealer.PrintHand())
            console.log("\nDealer wins!\n")
        }
    }

    /**
     * Method called by player class to reshuffle the deck.
     */ 
    ShuffleDeck() {
        Deck.usedCardsPile.forEach(element => {
            Deck.deck.push(element)
        });
        Deck.shuffle(Deck.deck)
        Deck.usedCardsPile.splice(0, Deck.usedCardsPile.length)
        console.log ("\n--- Deck is re-shuffled ---\n")
    }
}