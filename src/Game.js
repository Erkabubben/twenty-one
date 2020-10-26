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
 * Represents a game.
 *
 * @class
 */
export class Game {

    constructor(_player, _dealer, _deck, _usedCardsPile) {
        this.player = _player
        this.dealer = _dealer
        this.winner = ""
        this.deck = _deck
        this.usedCardsPile = _usedCardsPile;

        this.resultStringPlayer = "Player #" + this.player.playerNumber + ": "
        this.resultStringDealer = "Dealer" + ": "
        

    }

    Start() {
        this.PlayerTurn()

        if (this.winner !== "") {
            this.DisplayGameResult()
        }
        else {
            this.DealerTurn()
        }
        
        this.DisplayGameResult()

        this.dealer.ResetHand(this)
        this.player.ResetHand(this)
        
        console.log ("deck size: " + this.deck.length + ", usedCardsPile: " + this.usedCardsPile.length)
        console.log ("-----------------------")
    }

    PlayerTurn() {
        this.player.Draw(this)
        if (this.winner === "") {
            if (this.player.totalScore === 21) {
                this.winner = "player"
            }
            else if (this.player.hand.length === 5 && this.player.totalScore <= 21) {
                this.winner = "player"
            }
            else if (this.player.totalScore > 21) {
                this.winner = "dealer"
            }
            else if (this.player.totalScore < this.player.stayPutScore) {
                this.PlayerTurn()
            }
            //this.DisplayGameResult()
        }
    }

    DealerTurn() {
        this.dealer.Draw(this)
        if (this.winner === "") {
            if (this.dealer.totalScore === 21) {
                this.winner = "dealer"
            }
            else if (this.dealer.hand.length === 5 && this.dealer.totalScore <= 21) {
                this.winner = "dealer"
            }
            else if (this.dealer.totalScore > 21) {
                this.winner = "player"
            }
            else if  (this.dealer.totalScore >= this.player.totalScore){
                this.winner = "dealer"
            }
            else if (this.dealer.totalScore < this.player.totalScore) {
                this.DealerTurn()
            }
            //this.DisplayGameResult()
        }
    }

    DisplayGameResult() {
        if (this.winner === "player") {
            console.log(this.resultStringPlayer + this.player.PrintHand())
            console.log(this.resultStringDealer + this.dealer.PrintHand())
            console.log("\nPlayer wins!\n")
        }
        else if (this.winner === "dealer") {
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

    ShuffleDeck() {
        this.usedCardsPile.push(this.deck[0])
        Deck.shuffle(this.usedCardsPile)
        this.deck = this.usedCardsPile
        this.usedCardsPile = []
        console.log ("\n--- Deck is re-shuffled... ---\n")
    }
}