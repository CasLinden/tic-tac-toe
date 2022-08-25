// To do: 

// - Red line through winning row/column/diagonal as new win animation

// - redraw board on reset?
// - fill board container with animated white strokes to mimic wiping board?

// - animation for draw

// - reset score button



const board = (function(){

    let state = [ null, null, null, 
                  null, null, null, 
                  null, null, null ];

    const allFields = () => {
        const container = document.querySelector("#board-container");
        return container.children;
    };

    const fields = (string) => {
        return document.getElementsByClassName(string);
    };

    const field = (number) => {
        return document.querySelector(`[data-index='${number}']`);
    };

    const testDiv = (number) => {
        return document.getElementById('test');
    }

    const render = () => {
        for(let i = 0; i <= 8; i++){
            let thisField = field(i);
            thisField.textContent = state[i];
        };
    };

    const clear = () => {
        for(let i = 0; i <= 8; i++){
            state[i] = null;
        };
        render();
        game.clearState();
        gameCount++
        game.startingPlayer();
        AI.AIFirst();
    };

    const arm = () => {
        let fields = allFields();
        for(let field of fields){
            field.addEventListener('click', consumeTurn);
        }

    }

    const disarm = () => {
        let fields = allFields();
        for(let field of fields){
            field.removeEventListener('click', consumeTurn);
        }
    }

    function consumeTurn(){
        let num = this.getAttribute('data-index');
        game.turn(num);
    };

    const freeze = (time) => {
        disarm();
        setTimeout(() => {
            arm();
            }, time);
    };

    const lightUp = (row) => {
        const squares = fields(row);
        for (let square of squares){
            square.classList.add('litup')
        }
    };

    const lightsOff = () => {
        let fields = allFields();
        for (let field of fields){
            field.addEventListener('transitionend', removeTransition)
            function removeTransition(){
            field.classList.remove('litup');
            };
        }
    }

    const drawAnimation = () => {
        const squares = allFields()
        for (let square of squares){
            square.classList.add('shaking')
        }
    };

    const drawBoard = () => {
    };


    arm();
    lightsOff();

return {state, field, fields, allFields, clear, freeze, lightUp, drawAnimation, testDiv, drawBoard};
})();

/* --------------------------------------------------------------------------------*/
const iFace = (function(){

    const eraser = () => {
        const button = document.querySelector('#eraser');
        button.addEventListener('click', erase, false); 
                function erase() {
                board.clear();
                turnCount = 0;
                };
    }
    eraser()

    const signalTurn = (playerNr) => {

        const arrowBox = (playerNr) => {
            return document.getElementById(`arrowBox${playerNr}`)
        }

        let other
        playerNr === 1? other = 2 : other = 1;

        let paths = arrowBox(other).querySelectorAll('path')
        for(let path of paths){
            path.remove()
        }

        setTimeout(() => {
            pencil.draw('largerThan',"M 18.6197 9.12406 C 18.6193 9.1235 18.3774 8.76931 18.4026 8.74413 C 18.5386 8.60814 18.6348 9.05521 18.7825 9.17833 C 19.1034 9.44572 19.6391 9.74536 19.9766 9.93818 C 20.6956 10.3491 21.338 10.8026 22.039 11.2408 C 23.8426 12.368 25.329 14.0105 27.0323 15.2028 C 27.2571 15.3602 28.4434 16.1158 28.4434 16.3969 C 28.4434 17.0936 27.3032 18.3876 26.9237 18.8935 C 25.68 20.5518 24.3811 22.3276 23.2331 24.0496 C 22.6524 24.9206 22.001 25.6589 21.3334 26.4377 C 21.1231 26.6831 20.9441 26.8876 20.7907 27.1433 C 20.718 27.2644 20.5193 27.6102 20.5193 27.4689 C 20.5193 27.3308 20.6703 27.1771 20.7364 27.089", arrowBox, playerNr, 4);
            }, 200);
            
            setTimeout(() => {
                pencil.draw('dash',"M 5.61527 17.7197 C 7.28996 17.301 9.56653 17.6105 11.2937 17.6105 C 13.8215 17.6105 16.4103 17.9687 18.9377 17.7743 C 21.3587 17.5881 24.1487 17.0159 26.5272 17.6105", arrowBox, playerNr, 4);
                }, 100);
        
        }

    const changeName = () => {
        const names = document.getElementsByClassName('name');
        for(let name of names){
            name.addEventListener('click', addInput, false);
            function addInput() {
                if(name.childElementCount < 1){
                name.textContent = '';
                const input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute('maxlength', '14')
                input.style.width ='100px';
                input.style.height = '30px'
                input.addEventListener('change', ownName, false);
                function ownName (){
                    name.textContent = input.value;
                }
                name.appendChild(input);
                }
            }
        }
    }

    changeName()


    const AIBtn = () => {
        const btn = document.getElementById('AI-btn');
        btn.addEventListener('click', toggleAI, false);
                
            function toggleAI() {
                if (btn.className === 'active'){
                    btn.className = 'inactive';
                    AI.off()
                  } else {
                    btn.className = 'active';
                    AI.on()
                  }
            };
    }

    AIBtn()
    
return {signalTurn}
})();

/* --------------------------------------------------------------------------------*/

const Player = (name, symbol, num) => {
    
    const play = (number) => {
            if (symbol === 'X'){
                setTimeout(() => {
                    pencil.draw('x',"M 30.6885 121.802 C 32.0467 118.406 34.9066 115.18 37.0605 112.28 C 42.2137 105.343 47.903 98.7013 53.6865 92.2852 C 68.5368 75.8106 83.3557 59.1383 99.1699 43.5791 C 105.416 37.434 111.844 31.4059 118.799 26.0742 C 119.573 25.4807 123.567 21.7934 124.512 22.2656", board.field, number, 4)
                    }, 200);
                pencil.draw('x',"M 26.7334 21.3135 C 29.7679 22.8307 32.1576 25.7855 34.4971 28.125 C 38.8061 32.434 43.1812 36.6701 47.4609 41.0156 C 59.6383 53.3803 71.6732 65.6323 82.9102 78.8818 C 86.1626 82.7168 89.7527 86.2074 92.8711 90.1611 C 99.4003 98.4392 106.17 106.667 114.185 113.599 C 116.456 115.563 119.828 119.238 123.047 119.238", board.field, number, 4);
            };
            if (symbol === 'O'){
                pencil.draw('o',"M 71.0083 21.46 C 70.2908 21.1339 75.1739 21.2117 76.9043 21.3135 C 83.2241 21.6852 89.3819 23.3573 94.8486 26.6602 C 109.735 35.654 120.368 51.5686 121.362 69.0674 C 122.347 86.4002 115.681 105.521 100.708 115.503 C 92.8552 120.738 84.6574 123.276 75.4395 125.171 C 68.8633 126.523 61.9876 127.413 55.2979 126.343 C 27.678 121.924 23.5079 86.6041 28.8574 64.2334 C 30.1065 59.0101 32.3037 53.917 34.7168 49.1455 C 39.2893 40.1045 46.7035 30.5342 56.1035 26.1475 C 59.5711 24.5292 63.1907 23.1141 66.8701 22.0459 C 67.607 21.832 72.1311 21.9702 71.0083 21.46 Z", board.field, number, 4);
            };
            board.state[number] = symbol;
            };

    let score = 0

 
return {name, symbol, play, score, num};
};

/* --------------------------------------------------------------------------------*/

let player1 = Player('player1', 'X', 1);
let player2 = Player('player2', 'O', 2);
let currentPlayer = player1;
let gameCount = 0;
let turnCount = 0;

/* --------------------------------------------------------------------------------*/

const game = (function(){

    const changePlayer = () => {
        currentPlayer === player1? currentPlayer = player2 : currentPlayer = player1;
    };

    const startingPlayer = () => {
        if (turnCount === 0){
            gameCount % 2 === 0 || gameCount === 0? currentPlayer = player1 : currentPlayer = player2;
            return;
        };
    };
    
    const turn = (number) => {
        if (board.state[number] !== null) return
        currentPlayer.play(number);
        updateState(number);
        turnCount++;
        if(checkDraw()){
            setTimeout(() => {
                board.clear()
                }, 400)
                AI.freeze(410);
                board.freeze(1000);
                return
            };
        checkWin();
        changePlayer();
        if(player2.name !== 'bot'){
            iFace.signalTurn(currentPlayer.num)
        }
    };

    let state = {};

    const clearState = () => {
        state.row1 = [null, null, null];
        state.row2 = [null, null, null];
        state.row3 = [null, null, null];
        state.column1 = [null, null, null];
        state.column2 = [null, null, null];
        state.column3 = [null, null, null];
        state.diagonal1 = [null, null, null];
        state.diagonal2 = [null, null, null];
    };

    clearState()

    const updateState = (number) => {
        if(number == 0){
            state.row1[0] = currentPlayer.symbol;
            state.column1[0] =  currentPlayer.symbol;
            state.diagonal1[0] = currentPlayer.symbol;
        }if(number == 1){
            state.row1[1] = currentPlayer.symbol;
            state.column2[0] =  currentPlayer.symbol;
        }if(number == 2){
            state.row1[2] = currentPlayer.symbol;
            state.column3[0] =  currentPlayer.symbol;
            state.diagonal2[2] = currentPlayer.symbol;
        }if(number == 3){
            state.row2[0] = currentPlayer.symbol;
            state.column1[1] =  currentPlayer.symbol;
        }if(number == 4){
            state.row2[1] = currentPlayer.symbol;
            state.column2[1] =  currentPlayer.symbol;
            state.diagonal1[1] = currentPlayer.symbol;
            state.diagonal2[1] = currentPlayer.symbol;
        }if(number == 5){
            state.row2[2] = currentPlayer.symbol;
            state.column3[1] =  currentPlayer.symbol;
        }if(number == 6){
            state.row3[0] = currentPlayer.symbol;
            state.column1[2] =  currentPlayer.symbol;
            state.diagonal2[0] = currentPlayer.symbol;
        }if(number == 7){
            state.row3[1] = currentPlayer.symbol;
            state.column2[2] =  currentPlayer.symbol;
        }if(number == 8){
            state.row3[2] = currentPlayer.symbol;
            state.column3[2] =  currentPlayer.symbol;
            state.diagonal1[2] = currentPlayer.symbol;
        };
    };

    const rowWin = (row) => {
        const result = row.every(e => {
            if (row[0] != null && e === row[0]){
                return true;
            }
        });
     return result;
    };


    const rowDraw = (row) => {
        const result = row.every(e => {
            if (row.includes('X') && row.includes('O') ){
                return true;
            }
        });
     return result;
    };

    const checkDraw = () => {
        let results = [];
        for (const key of Object.keys(state)){
            let result = rowDraw(state[key]);
            results.push(result);
        };
        if(!results.includes(false)){
            turnCount = 0;
            return true;
        };
    };


    const checkWin = () => {
        for (const key of Object.keys(state)){
            if (rowWin(state[key])){
                AI.freeze(410);
                board.freeze(1000);
                setTimeout(() => {
                    board.clear();
                }, 400);
                currentPlayer.score++
                scoreboard.update(currentPlayer.num)
                board.lightUp(key);
                clearState();
                turnCount = 0;
                return key;
            };
        };
    };

return {turn, state, clearState, changePlayer, startingPlayer}
})();

/* --------------------------------------------------------------------------------*/
const scoreboard = (function(){

    const update = (playerNr) => {
        let score = currentPlayer.score;
        
        if (score > 5) {
            score = score % 5;
            };

        if (score === 1){
            strokeOne(playerNr);
        };
        if (score === 2){
            strokeTwo(playerNr);
        };
        if (score === 3){
            strokeThree(playerNr);
        };
        if (score === 4){
            strokeFour(playerNr);
        };
        if (score === 5 || score === 0){
            strokeFive(playerNr);
        };     
        
        if (score % 5 === 0){
            newBox(currentPlayer.num);
        };
    }

    const currentBox = (playerNr) => {
        let current = document.querySelector(`#currentBox${playerNr}`)
        return current
    }

    const strokeOne = (playerNr) => {
        return pencil.draw('stroke1', 'M52.4341 19.9524C52.4341 43.3592 55.1794 66.7642 55.1794 90.2306', currentBox, playerNr, 14.1716)
    }

    const strokeTwo = (playerNr) => {
        return pencil.draw('stroke2', "M92.0571 20.593C92.0571 23.8332 92.9198 27.1224 92.7892 30.4758C92.2996 43.0419 90.6001 55.7059 90.959 68.2687C91.0946 73.0149 90.8645 77.7115 90.6845 82.4524C90.581 85.1784 90.593 84.7369 90.593 86.6618C90.593 87.2749 90.2276 88.7661 90.776 88.4919", currentBox, playerNr, 14.1716)
    }

    const strokeThree = (playerNr) => {
        return pencil.draw('stroke3', "M124.817 19.9524C124.817 22.9701 125.36 26.1135 125.275 29.1947C125.043 37.5175 124.58 45.8604 124.176 54.1764C123.871 60.4638 123.119 66.7167 123.353 73.0271C123.507 77.1813 123.972 81.3285 124.268 85.4722C124.344 86.5374 124.908 87.3698 124.908 88.4004", currentBox, playerNr, 14.1716)
    }

    const strokeFour = (playerNr) => {
        return pencil.draw('stroke4', "M159.682 18.1223C159.356 17.4715 159.584 20.3321 159.59 20.41C159.708 22.0591 159.729 22.5507 159.682 24.4363C159.545 29.902 159.074 35.3532 158.858 40.8163C158.48 50.3654 157.865 59.9048 157.76 69.4583C157.706 74.3553 156.96 79.815 158.034 84.6486", currentBox, playerNr, 14.1716)
    }

    const strokeFive = (playerNr) => {
        return pencil.draw('stroke5', "M32.5769 81.9949C36.1279 78.4438 42.3448 76.4264 46.7606 74.1252C55.7769 69.4266 65.1478 65.237 74.4876 61.2225C101.852 49.4606 130.362 40.0059 158.858 31.3909C166.629 29.0415 174.433 26.8685 182.284 24.8023C185.934 23.8419 190.176 22.1486 193.997 22.1486", currentBox, playerNr, 14.1716)
    }

    const newBox = (playerNr) => {
        let template = document.querySelector(`#currentBox${playerNr}`);
        let newBox = template.cloneNode(true);
        let paths = newBox.querySelectorAll('path')
            for(let path of paths){
                path.remove()
            }

        template.setAttribute('id', '');
        newBox.setAttribute('id', `currentBox${playerNr}`)

        let container = document.getElementById(`score-container${playerNr}`);
        container.appendChild(newBox)
    }

    return {update, currentBox}

})();

/* --------------------------------------------------------------------------------*/

const pencil = (function(){

    
    const draw = (strokeClass, path , container, number, width, z) => {
        let location = container(number);
        let newStroke = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newStroke.setAttributeNS(null, 'class', strokeClass);
        newStroke.setAttributeNS(null, 'd', path);
        newStroke.setAttributeNS(null, 'fill', 'none');
        newStroke.setAttributeNS(null, 'fill-rule', 'evenodd');
        newStroke.setAttributeNS(null, 'opacity', '.7');
        newStroke.setAttributeNS(null, 'stroke', '#000000');
        newStroke.setAttributeNS(null, 'stroke-linecap', 'round');
        newStroke.setAttributeNS(null, 'stroke-linejoin', 'round');
        newStroke.setAttributeNS(null, 'stroke-width', width);
        newStroke.setAttributeNS(null, 'z-index', z);
        location.appendChild(newStroke);
    }

    const testDraw = () =>{
        let testDiv = document.getElementById('test');
        return draw('stroke5', "M32.5769 81.9949C36.1279 78.4438 42.3448 76.4264 46.7606 74.1252C55.7769 69.4266 65.1478 65.237 74.4876 61.2225C101.852 49.4606 130.362 40.0059 158.858 31.3909C166.629 29.0415 174.433 26.8685 182.284 24.8023C185.934 23.8419 190.176 22.1486 193.997 22.1486", board.testDiv, 0, 5)
    }


    return {draw, testDraw}
})();

/* --------------------------------------------------------------------------------*/

const AI = (function(){

    const legalMoves = () => {
        const moves = [];
        for(let i = 0; i <= 8; i++){
            if(board.state[i] == null){
               moves.push(i);
               };
            };
        return moves;
    };

    const AIFirst = () =>{
        if (turnCount === 0 && gameCount % 2 !== 0  && currentPlayer.name == 'bot'){
            slowMove();
        }
    }
    
    const randomMove = () => {
        if(currentPlayer.name == 'bot'){
           let moves = legalMoves();
           let choice = Math.floor(Math.random() * legalMoves().length);
           game.turn(moves[choice]);
           };
        return;
    };

    const countValue = (row, value) => {
        let counter = 0;
        row.forEach(e => {
            if (e === value) {counter++};
        });
        return counter;
    };

    const win = () => {
        const state = game.state;
        for (const key of Object.keys(state)){ 
            if(countValue(state[key], 'O') === 2 && countValue(state[key], null) !== 0){;
            return key;
            }
        };
    };

    const blockWin = () => {
        const state = game.state;
        for (const key of Object.keys(state)){ 
            if(countValue(state[key], 'X') === 2 && countValue(state[key], null) !== 0){;
            return key ;
            }
        };
    };

    const makeMove = (move) => {
        let row
        if(move()){
           row = board.fields(move())
        } else{return};

        {for (let square of row){
            if(currentPlayer.name == 'bot'){
            game.turn(square.getAttribute('data-index'));
            };
        };
        };
};

    const cornerPrio = () => {
        let corners = board.fields('corner');
        for (let corner of corners){
                if(currentPlayer.name == 'bot'){
                game.turn(corner.getAttribute('data-index'))
                };
        };
    };

    const secureCenter = () => {
        if (board.state[4] === null && currentPlayer.name == 'bot'){
            game.turn(4);
        }else return;
    };

    const stopCornerExploit = () => {
        if(turnCount == 3 && board.state[4] == 'O'){
                if (currentPlayer.name == 'bot' && countValue(game.state.row2, 'X') === 0 ){
                    game.turn(3);
                    return;
                } else if (currentPlayer.name == 'bot' && countValue(game.state.column2, 'X') === 0) {
                    game.turn(1);
                    return;
                } else {
                    return;
                };
        };
    };

    const stopCornerExploit2 = () => {
        if(turnCount == 3 && board.state[5] == 'X' && board.state[7] == 'X'){
            game.turn(8)
        }
    }
   

    const smartMove = () => {
        if(!AI.frozen){
        makeMove(win);
        makeMove(blockWin);
        secureCenter();
        stopCornerExploit();
        stopCornerExploit2();
        cornerPrio();
        randomMove();
        };
    };

    const slowMove = () => {
        setTimeout(() => {
            smartMove();
        }, 400);
    }

    const displayBotName = (input) => {
        const name = document.querySelector('.p2name')
        name.textContent = input
    }

    const on = () => {
        player2.name = 'bot'
        displayBotName('RoboRob')

        if(currentPlayer == player2){
            slowMove()
            iFace.signalTurn(1)
        }
        

            let fields = board.allFields();
            for(let field of fields){
                field.addEventListener('click', botPlay, false);
                    
                    function botPlay() {
                    slowMove()
                    };
            }; 
    }

    const off = () => {
        player2.name = 'player2'
        displayBotName('Player2')

            let fields = board.allFields();
            for(let field of fields){
                field.removeEventListener('click', botPlay, false);

                    function botPlay() {
                    slowMove()
                    };  
            }; 
    };

    const freeze = (time) => {
        AI.frozen = true;
        setTimeout(() => {
            unFreeze();
            }, time);
    };

    const unFreeze = () => {
        AI.frozen = false;
    };
      
    return {on, off, freeze, unFreeze, AIFirst}
})();
 
