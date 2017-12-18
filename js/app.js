window.onload = function() {

    var card_list = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
    var matched_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var current_cards = [];

    var moves = document.getElementsByClassName('moves')[0];
    var steps = 0;

    var deck = document.getElementsByClassName('deck')[0];

    var restart_btn = document.getElementsByClassName('restart')[0];

    function restart() {
        card_list = shuffle(card_list);
        matched_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        current_cards = [];
        steps = 0;
        moves.innerHTML = steps;
        for (var i = 0; i < card_list.length; i++) {
            deck.children[i].className = 'card';
            deck.children[i].children[0].className = 'fa' + ' ' + card_list[i];
        }
        for (var i = 0; i < deck.children.length; i++) {
            (function(i) {
                deck.children[i].onclick = function(e) {
                    steps += 1;
                    moves.innerHTML = steps;
                    deck.children[i].className = 'card open show';
                    check_match(i);
                    if (check_success()) {
                        setTimeout(() => {
                            alert('success!');
                        }, 1000);
                    }
                }
            })(i);
        }
    }

    restart();

    restart_btn.onclick = function(e) {
        restart();
    }

    function check_success() {
        var sum = 0;
        for (var i = 0; i < 16; i++) {
            sum += matched_list[i];
        }
        if (sum == 16) {
            return true;
        } else {
            return false;
        }
    }

    function check_match(i) {
        if (current_cards.length == 0) {
            current_cards.push([i, card_list[i]]);
            return false;
        } else if (current_cards.length == 1) {
            current_cards.push([i, card_list[i]]);
            if (current_cards[0][1] == current_cards[1][1]) {
                matched_list[current_cards[0][0]] = 1;
                deck.children[current_cards[0][0]].className = 'card match';
                matched_list[current_cards[1][0]] = 1;
                deck.children[current_cards[1][0]].className = 'card match';
                current_cards = [];
                return true;
            } else {
                deck.className = 'deck disabled';
                setTimeout(() => {
                    deck.children[current_cards[0][0]].className = 'card';
                    deck.children[current_cards[1][0]].className = 'card';
                    current_cards = [];
                    deck.className = 'deck';
                    return false;
                }, 1000);
            }
        }
    }

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /*
     * set up the event listener for a card. If a card is clicked:
     *  - display the card's symbol (put this functionality in another function that you call from this one)
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */
}