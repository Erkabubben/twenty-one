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

    static dealerWinsMessage = "\nDealer wins!\n"
    static playerWinsMessage = "\nPlayer wins!\n"
    static tieMessage = "\nIt's a tie!\n"

    constructor(_player, _dealer, deck) {
        this.player = _player
        this.dealer = _dealer
        this.winner = ""
        this.deck = _deck

        this.resultStringPlayer = "Player #" + this.player.playerNumber + ": "
        this.resultStringDealer = "Dealer" + ": "
        let lastPlayerScore = 1000
        
        PlayerTurn()

        if (this.winner !== "") {
            DisplayGameResult()
        }
        else {
            DealerTurn()
        }
    
        
    }

    PlayerTurn() {
        this.player.Draw(deck)
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
            else if (this.player.totalScore < this.player.stayPutScore {
                PlayerTurn()
            }
        }
    }

    DealerTurn() {
        this.dealer.Draw(deck)
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
            else if (this.player.totalScore < this.player.stayPutScore {
                PlayerTurn()
            }
        }
    }


    
    
  
    NewDraw(player, resultString, lastPlayerScore)
    
    // Dealers's turn
    resultString = "Dealer" + ": "
    NewDraw(dealer, resultString, lastPlayerScore)

    if (dealer.totalScore <= 21) {
      if (player.totalScore > 21) {
        console.log(dealerWinsMessage)
      }
      else if (dealer.totalScore > player.totalScore) {
        console.log(dealerWinsMessage)
      }
      else if (dealer.totalScore === player.totalScore) {
        console.log(tieMessage)
      }
    }
    if (player.totalScore <= 21) {
      if (dealer.totalScore > 21) {
        console.log(playerWinsMessage)
      }
      else if (player.totalScore > dealer.totalScore) {
        console.log(playerWinsMessage)
      }
    }
    if (player.totalScore > 21 && dealer.totalScore > 21) {
      
    }
  
    dealer.ResetHand()
}