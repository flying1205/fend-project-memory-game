# Memory Game Project

## How to setup

1. Copy or clone this project's folder to your computer.

2. Double click the 'index.html' file in the root path, you can open the game's homepage by your default browser.(the browser should be one of **_Chrome/Safari/Firefox/Opera/IE9+_** or other modern browser)

## How to play

The game board contains 16 "cards" in the form of a grid.The single board consists of 8 different cards, each with different symbols on each side.The cards are arranged at random on the grid, and the symbols are down.The game rules are simple: turn two hidden cards each time and find the matching cards!

Each round of games:

* The player turns over a card to see what the symbol is.
* The player then opens second card and tries to find a corresponding card with the same symbol.
* If the card matches, all two cards remain open.
* If the card do not match, all two cards continue to be covered.

When all the cards are correctly matched, the game ends.

## Special feature

* When you click the first card in a new game, the timer will start and record the time you have spent.
* The moves-area will record the moves you have done.
* The stars-area will record the stars you have earned according to the rules:
  * 3 stars: moves < 10
  * 2 stars: 10 <= moves < 20
  * 1 star: 20 <= moves

## Dependencies

* [font-awesome](https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css)
* [googleapis/fonts/Coda](https://fonts.googleapis.com/css?family=Coda)