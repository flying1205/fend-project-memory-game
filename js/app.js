window.onload = function() {

    // 卡组与状态
    var cardList = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-paper-plane-o', 'fa-cube'];
    var matchedList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // 翻开的卡片
    var openedCards = [];

    var moveArea = document.getElementsByClassName('moves')[0];
    // 步数
    var moves = 0;

    var starArea = document.getElementsByClassName('stars')[0];
    // 星级
    var stars = 3;

    var timeArea = document.getElementsByClassName('time')[0];
    // 时间
    var time = 0;
    var intervalId;
    var timing = false;

    var deck = document.getElementsByClassName('deck')[0];
    // 绑定鼠标单击事件
    for (var i = 0; i < deck.children.length; i++) {
        (function(i) {
            deck.children[i].onclick = function(e) {
                if (timing == false) {
                    startTimer();
                }
                moves += 1;
                moveArea.innerHTML = moves;
                if (moves < 30) {
                    stars = 3;
                } else if (moves >= 30 && moves < 40) {
                    stars = 2;
                } else if (moves >= 40) {
                    stars = 1;
                }
                drawStar();
                deck.children[i].className = 'card open show';
                checkMatch(i);
                if (checkSuccess()) {
                    stopTimer();
                    setTimeout(() => {
                        var again = confirm('Congratulations!\n' + 'your moves is ' + moves + '\n' + 'your spend ' + time + ' seconds\n' + 'your star is ' + stars + '\n' + 'Do you want to play again?');
                        if (again) {
                            restart();
                        }
                    }, 1000);
                }
            }
        })(i);
    }

    // 画星
    function drawStar() {
        // 清空
        var star_count = starArea.children.length;
        for (var i = 0; i < star_count; i++) {
            starArea.removeChild(starArea.children[0]);
        }
        // 重绘
        for (var i = 0; i < stars; i++) {
            var star_li = document.createElement('li');
            var star_i = document.createElement('i');
            star_i.className = 'fa fa-star';
            star_li.appendChild(star_i);
            starArea.appendChild(star_li);
        }
    }

    // 开始计时器
    function startTimer() {
        // 开始计时器 
        timing = true;
        intervalId = setInterval(() => {
            time += 1;
            timeArea.innerHTML = time;
        }, 1000);
    }

    // 停止计时器
    function stopTimer() {
        timing = false;
        clearInterval(intervalId);
    }

    // 重置(除时间外其他)
    function restart() {
        // 洗牌
        cardList = shuffle(cardList);
        // 重置状态
        matchedList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        // 重置打开的卡片
        openedCards = [];
        // 重置步数
        moves = 0;
        moveArea.innerHTML = moves;
        // 重置星级
        stars = 3;
        drawStar();
        // 重置时间
        time = 0;
        timeArea.innerHTML = time;
        // 重置卡片
        for (var i = 0; i < cardList.length; i++) {
            deck.children[i].className = 'card';
            deck.children[i].children[0].className = 'fa' + ' ' + cardList[i];
        }
    }

    restart();

    var restartBtn = document.getElementsByClassName('restart')[0];
    restartBtn.onclick = function(e) {
        stopTimer();
        restart();
    }

    // 检查成功
    function checkSuccess() {
        var sum = 0;
        for (var i = 0; i < 16; i++) {
            sum += matchedList[i];
        }
        if (sum == 16) {
            return true;
        } else {
            return false;
        }
    }

    // 检查匹配
    function checkMatch(i) {
        if (openedCards.length == 0) {
            openedCards.push([i, cardList[i]]);
            return false;
        } else if (openedCards.length == 1) {
            openedCards.push([i, cardList[i]]);
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

    // 洗牌
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
}