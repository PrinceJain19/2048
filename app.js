document.addEventListener('DOMContentLoaded', () => {
    var gridDisplay = document.querySelector(".grid");
    var scoreDisplay = document.getElementById("score");
    var resultDisplay = document.getElementById("result");
    var btnRetry = document.querySelector("#btn-retry");
    let squares = [];
    let score = 0;

    function createBoard() {
        for(let i = 0; i < 16; i++) {
            let square = document.createElement('div');
            square.innerHTML = '';
            gridDisplay.appendChild(square);
            squares.push(square);
        }

        generateRandom();
        generateRandom();
    }

    createBoard();

    function generateRandom() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0)
            squares[randomNumber].innerHTML = 2;
        else generateRandom()
    }

    function moveRight() {
        for(let i = 0; i < 16; i++) {
            if(i % 4 === 0) {
                let One = squares[i].innerHTML;
                let Two = squares[i+1].innerHTML;
                let Three = squares[i+2].innerHTML;
                let Four = squares[i+3].innerHTML;
                let row = [parseInt(One),parseInt(Two),parseInt(Three),parseInt(Four)];

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }


    function moveLeft() {
        for(let i = 0; i < 16; i++) {
            if(i % 4 === 0) {
                let One = squares[i].innerHTML;
                let Two = squares[i+1].innerHTML;
                let Three = squares[i+2].innerHTML;
                let Four = squares[i+3].innerHTML;
                let row = [parseInt(One),parseInt(Two),parseInt(Three),parseInt(Four)];

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }


    function moveUp() {
        for(let i = 0; i < 4; i++) {
            let One = squares[i].innerHTML;
            let Two = squares[i+4].innerHTML;
            let Three = squares[i+8].innerHTML;
            let Four = squares[i+12].innerHTML;
            let column = [parseInt(One),parseInt(Two),parseInt(Three),parseInt(Four)];

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i+4].innerHTML = newColumn[1];
            squares[i+8].innerHTML = newColumn[2];
            squares[i+12].innerHTML = newColumn[3];
        }
    }

    function moveDown() {
        for(let i = 0; i < 4; i++) {
            let One = squares[i].innerHTML;
            let Two = squares[i+4].innerHTML;
            let Three = squares[i+8].innerHTML;
            let Four = squares[i+12].innerHTML;
            let column = [parseInt(One),parseInt(Two),parseInt(Three),parseInt(Four)];

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i+4].innerHTML = newColumn[1];
            squares[i+8].innerHTML = newColumn[2];
            squares[i+12].innerHTML = newColumn[3];
        }
    }

    function combineLeft() {
        for(let i = 0; i < 15; i++) {
            if(((i+1) % 4) !== 0) {
                if(squares[i].innerHTML === squares[i+1].innerHTML) {
                    let a = parseInt(squares[i].innerHTML) || 0;
                    let b = parseInt(squares[i+1].innerHTML) || 0;
                    let combineTotal = a + b;
                    squares[i].innerHTML = combineTotal;
                    squares[i+1].innerHTML = 0
                    score += combineTotal;
                    scoreDisplay.innerHTML = score;
                }
            }
        }
        checkWin();
    }

    function combineRight() {
        for(let i = 0; i < 4; i++)
            for(let j = 3; j > 0; j--) {
                if(squares[(i*4) + j].innerHTML === squares[(i*4) + j - 1].innerHTML) {
                    let a = parseInt(squares[(i*4) + j].innerHTML) || 0;
                    let b = parseInt(squares[(i*4) + j - 1].innerHTML) || 0;
                    let combineTotal = a + b;
                    squares[(i*4) + j].innerHTML = combineTotal;
                    squares[(i*4) + j - 1].innerHTML = 0
                    score += combineTotal;
                    scoreDisplay.innerHTML = score;
                }
            }
        checkWin();
    }

    function combineUp() {
        for(let i = 0; i < 12; i++) {
            if(squares[i].innerHTML === squares[i+4].innerHTML) {
                let a = parseInt(squares[i].innerHTML) || 0;
                let b = parseInt(squares[i+4].innerHTML) || 0;
                let combineTotal = a + b;
                squares[i].innerHTML = combineTotal;
                squares[i+4].innerHTML = 0
                score += combineTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkWin();
    }

    function combineDown() {
        for(let i = 15; i > 3; i--) {
            if(squares[i].innerHTML === squares[i-4].innerHTML) {
                let a = parseInt(squares[i].innerHTML) || 0;
                let b = parseInt(squares[i-4].innerHTML) || 0;
                let combineTotal = a + b;
                squares[i].innerHTML = combineTotal;
                squares[i-4].innerHTML = 0
                score += combineTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkWin();
    }

    function control(e) {
        if(e.keyCode === 39)
            keyRight();

        else if(e.keyCode === 37)
            keyLeft();

        else if(e.keyCode === 38)
            keyUp();

        else if(e.keyCode === 40) 
            keyDown();
    }
    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRight();
        moveRight();
        generateRandom();
    }

    function keyLeft() {
        moveLeft();
        combineLeft();
        moveLeft();
        generateRandom();
    }

    function keyUp() {
        moveUp();
        combineUp();
        moveUp();
        generateRandom();
    }

    function keyDown() {
        moveDown();
        combineDown();
        moveDown();
        generateRandom();
    }

    function checkWin() {
        for(let i = 0; i < 16; i++)
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You Win! Play till Game Over...';
                document.getElementById("result").style.animation = "mymove 0.5s";
            }
    }

    function checkGameOver() {
        let flag = 0
        for(let i = 0; i < 16; i++)
            if(squares[i].innerHTML == 0)
                flag = 1;
        if(flag == 0) {
            resultDisplay.innerHTML = 'Game Over!';
            document.removeEventListener('keyup', control)
        }
    }

    function PlayAgain() {
        for(let i = 0; i < 16; i++) 
            squares[i].innerHTML = '';
        generateRandom();
        generateRandom();

        scoreDisplay.innerHTML = '0';
        score = 0;
        resultDisplay.innerHTML = '';
        document.getElementById("result").style.animation = "unset";
    }

    btnRetry.addEventListener("click", PlayAgain);

    document.addEventListener('touchstart', handleTouch, false);
    document.addEventListener('touchmove', handleMove, false);

    var x1 = null;
    var y1 = null;

    function getTouches(evt) {
        return evt.touches || evt.originalEvent.touches;
    }

    function handleTouch(evt) {
        const firstTouch = getTouches(evt)[0];
        x1 = firstTouch.clientX;
        y1 = firstTouch.cliebtY;
    };

    function handleMove(evt) {
        if(!x1 || !y1)
            return;

        var x2 = evt.touches[0].clientX;                                    
        var y2 = evt.touches[0].clientY;

        var xDiff = x1 - x2;
        var yDiff = y1 - y2;

        if(Math.abs(xDiff) > Math.abs(yDiff)) {
            if(xDiff > 0)
                keyRight();
            else
                keyLeft();
        }
        else {
            if(yDiff > 0)
                keyUp();
            else
                keyDown();
        }

        x1 = null;
        y1 = null;
    };
})