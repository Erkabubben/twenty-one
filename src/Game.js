/**
 * Module for the type Game.
 *
 * @author Erik Lindholm <elimk06@student.lnu.se>
 * @version 1.0.0
 */

import { Player } from './Player.js'

/**
 * Represents a player versus dealer game - a separate game is initiated for every player
 * present. The card stack remains the same, and is re-shuffled when necessary.
 *
 * @class
 */
export class Game {
  /**
   * Constructor for the Game object, requires a player and a dealer.
   *
   * @param {Player} _player - The player currently drawing against the dealer.
   * @param {Player} _dealer - The dealer.
   */
  constructor (_player, _dealer) {
    this._player = _player
    this._dealer = _dealer
    this._winner = ''

    this._resultStringPlayer = 'Player #' + this._player.playerNumber + ': '
    this._resultStringDealer = 'Dealer' + ': '
  }

  /**
   * Starts the game round and presents the result.
   */
  Start () {
    this.PlayerTurn()

    if (this._winner !== '') {
      this.DisplayGameResult()
    } else {
      this.DealerTurn()
      this.DisplayGameResult()
    }

    this._dealer.ResetHand(this)
    this._player.ResetHand(this)

    /* Un-comment the line below to display deck sizes after every game */
    // console.log ('deck.length: ' + Deck.deck.length + ', usedCardsPile.length: ' + Deck.usedCardsPile.length)

    console.log('--------------------------------------------------------------------------------\n')
  }

  /**
   * The player's turn to draw cards.
   */
  PlayerTurn () {
    if (this._player.hand.length > 1) this._player.Draw()
    if (this._winner === '') {
      if (this._player.totalScore === 21) {
        this._winner = 'player'
      } else if (this._player.hand.length === 5 && this._player.totalScore <= 21) {
        this._winner = 'player'
      } else if (this._player.totalScore > 21) {
        this._winner = 'dealer'
      } else if (this._player.hand.length < 2) {
        this._player.Draw()
      } else if (this._player.totalScore < this._player.stayPutScore) {
        this.PlayerTurn()
      }
    }
  }

  /**
   * The dealer's turn to draw cards.
   */
  DealerTurn () {
    this._dealer.Draw()
    if (this._winner === '') {
      if (this._dealer.totalScore === 21) {
        this._winner = 'dealer'
      } else if (this._dealer.hand.length === 5 && this._dealer.totalScore <= 21) {
        this._winner = 'dealer'
      } else if (this._dealer.totalScore > 21) {
        this._winner = 'player'
      } else if (this._dealer.totalScore >= this._player.totalScore) {
        this._winner = 'dealer'
      } else if (this._dealer.totalScore < this._player.totalScore) {
        this.DealerTurn()
      }
    }
  }

  /**
   * Prints the game results to the terminal - done at the end of every game.
   */
  DisplayGameResult () {
    if (this._winner === 'player') {
      console.log(this._resultStringPlayer + this._player.PrintHand())
      console.log(this._resultStringDealer + this._dealer.PrintHand())
      console.log('\nPlayer wins!\n')
    } else if (this._winner === 'dealer') {
      console.log(this._resultStringPlayer + this._player.PrintHand())
      console.log(this._resultStringDealer + this._dealer.PrintHand())
      console.log('\nDealer wins!\n')
    } else {
      console.log(this._resultStringPlayer + this._player.PrintHand())
      console.log(this._resultStringDealer + this._dealer.PrintHand())
      console.log('\nDealer wins!\n')
    }
  }
}
