window.onload = function() {

    // card list && status list
    let cardList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
    let matchedList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // opened cards
    let openedCards = [];

    let moveArea = document.getElementsByClassName('moves')[0];
    let moves = 0;

    let starArea = document.getElementsByClassName('stars')[0];
    let stars = 3;

    let timeArea = document.getElementsByClassName('time')[0];
    let time = 0;
    let intervalId;
    let timing = false;

    let deck = document.getElementsByClassName('deck')[0];
    // bundle click event
    for (let i = 0; i < deck.children.length; i++) {
        deck.children[i].onclick = function(e) {
            if (timing == false) {
                startTimer();
            }
            deck.children[i].className = 'card open show';
            checkMatch(i);
            if (moves < 10) {
                stars = 3;
            } else if (moves >= 10 && moves < 20) {
                stars = 2;
            } else if (moves >= 20) {
                stars = 1;
            }
            drawStar();
            if (checkSuccess()) {
                stopTimer();
                setTimeout(() => {
                    let again = confirm('Congratulations!\n' + 'your moves is ' + moves + '\n' + 'your spend ' + time + ' seconds\n' + 'your star is ' + stars + '\n' + 'Do you want to play again?');
                    if (again) {
                        restart();
                    }
                }, 1000);
            }
        }
    }

    /**
     * @description draw star
     */
    function drawStar() {
        // clear
        let star_count = starArea.children.length;
        for (let i = 0; i < star_count; i++) {
            starArea.removeChild(starArea.children[0]);
        }
        // redraw
        for (let i = 0; i < 3; i++) {
            let star_li = document.createElement('li');
            let star_i = document.createElement('i');
            if (i < stars) {
                star_i.className = 'fa fa-star';
            } else {
                star_i.className = 'fa fa-star-o';
            }
            star_li.appendChild(star_i);
            starArea.appendChild(star_li);
        }
    }

    /**
     * @description start timer
     */
    function startTimer() {
        timing = true;
        intervalId = setInterval(() => {
            time += 1;
            timeArea.innerHTML = time;
        }, 1000);
    }

    /**
     * @description stop timer
     */
    function stopTimer() {
        timing = false;
        clearInterval(intervalId);
    }

    /**
     * @description reset all status
     */
    function restart() {
        // shuffle
        cardList = shuffle(cardList);
        // reset status
        matchedList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // reset opened cards
        openedCards = [];
        // reset moves
        moves = 0;
        moveArea.innerHTML = moves;
        // reset stars
        stars = 3;
        drawStar();
        // reset time
        time = 0;
        timeArea.innerHTML = time;
        // reset cards
        for (let i = 0; i < cardList.length; i++) {
            deck.children[i].className = 'card';
            deck.children[i].children[0].className = 'fa' + ' ' + cardList[i];
        }
    }

    restart();

    let restartBtn = document.getElementsByClassName('restart')[0];
    restartBtn.onclick = function(e) {
        stopTimer();
        restart();
    }

    /**
     * @description check success
     * @returns {bool} - success or not
     */
    function checkSuccess() {
        let sum = 0;
        for (let i = 0; i < 16; i++) {
            sum += matchedList[i];
        }
        if (sum == 16) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description check match
     * @param {int} i - the index of the card in the cardList
     * @returns {bool} - match or not
     */
    function checkMatch(i) {
        if (openedCards.length == 0) {
            openedCards.push([i, cardList[i]]);
            return false;
        } else if (openedCards.length == 1) {
            openedCards.push([i, cardList[i]]);
            moves += 1;
            moveArea.innerHTML = moves;
            if (openedCards[0][1] == openedCards[1][1]) {
                matchedList[openedCards[0][0]] = 1;
                deck.children[openedCards[0][0]].className = 'card match';
                matchedList[openedCards[1][0]] = 1;
                deck.children[openedCards[1][0]].className = 'card match';
                openedCards = [];
                return true;
            } else {
                deck.className = 'deck disabled';
                setTimeout(() => {
                    deck.children[openedCards[0][0]].className = 'card';
                    deck.children[openedCards[1][0]].className = 'card';
                    openedCards = [];
                    deck.className = 'deck';
                    return false;
                }, 1000);
            }
        }
    }

    /**
     * @description Shuffle function from http://stackoverflow.com/a/2450976
     * @param {array} array - the cardList to be shuffled 
     * @returns {array} - the shuffled cardList
     */
    function shuffle(array) {
        let currentIndex = array.length,
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
}