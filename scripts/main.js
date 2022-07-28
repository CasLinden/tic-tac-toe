// Where to go from here:
// - Satisfying tally win counter
// - redraw board on reset?
// - fill board container with random white stripes to mimic wiping?
// - Better win animation
// - shake animation for draw
// - draw 10 times against the AI challenge 
// - Editable names 



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
        game.clearState()
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
            clear();
            }
        }
    }

    arm();
    lightsOff();
    


return {state, field, fields, allFields, clear, freeze, lightUp};
})();


/* --------------------------------------------------------------------------------*/
const interface = (function(){

    const eraser = () => {
        const button = document.querySelector('#eraser');
        button.addEventListener('click', erase, false); 
                function erase() {
                board.clear()
                turnCount = 0;
                };
    }
    eraser()

    const signalTurn = (player) => {
        const one = document.getElementById('player1');
        const two = document.getElementById('player2');
        if (player == player1){
            one.style.color = 'black';
            two.style.color = 'grey'
        } if (player == player2){
            two.style.color = 'black';
            one.style.color = 'grey'
        }
    }

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
const scoreboard = (function(){

    const addStroke = (strokeClass, d, fill, fillRule, opacity, stroke, strokeLineCap, strokeLineJoin, strokeWidth) => {
        const scoreboard = document.getElementById('layer-1');
        let newStroke = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        newStroke.setAttributeNS(null, 'class', strokeClass);
        newStroke.setAttributeNS(null, 'd', d);
        newStroke.setAttributeNS(null, 'fill', fill)
        newStroke.setAttributeNS(null, 'fill-rule', fillRule)
        newStroke.setAttributeNS(null, 'opacity', opacity)
        newStroke.setAttributeNS(null, 'stroke', stroke)
        newStroke.setAttributeNS(null, 'stroke-linecap', strokeLineCap)
        newStroke.setAttributeNS(null, 'stroke-linejoin', strokeLineJoin)
        newStroke.setAttributeNS(null, 'stroke-width', strokeWidth)
        scoreboard.appendChild(newStroke)
    }

    const strokeOne = () => {
        return addStroke('stroke1', 'M52.4341 19.9524C52.4341 43.3592 55.1794 66.7642 55.1794 90.2306', 'none', 'evenodd', '1', '#000000', 'round', 'round', '14.1716')
    }

    const strokeTwo = () => {
        return addStroke('stroke2', "M92.0571 20.593C92.0571 23.8332 92.9198 27.1224 92.7892 30.4758C92.2996 43.0419 90.6001 55.7059 90.959 68.2687C91.0946 73.0149 90.8645 77.7115 90.6845 82.4524C90.581 85.1784 90.593 84.7369 90.593 86.6618C90.593 87.2749 90.2276 88.7661 90.776 88.4919", 'none', 'evenodd', '1', '#000000', 'round', 'round', '14.1716')
    }

    const strokeThree = () => {
        return addStroke('stroke3', "M124.817 19.9524C124.817 22.9701 125.36 26.1135 125.275 29.1947C125.043 37.5175 124.58 45.8604 124.176 54.1764C123.871 60.4638 123.119 66.7167 123.353 73.0271C123.507 77.1813 123.972 81.3285 124.268 85.4722C124.344 86.5374 124.908 87.3698 124.908 88.4004", 'none', 'evenodd', '1', '#000000', 'round', 'round', '14.1716')
    }

    const strokeFour = () => {
        return addStroke('stroke4', "M159.682 18.1223C159.356 17.4715 159.584 20.3321 159.59 20.41C159.708 22.0591 159.729 22.5507 159.682 24.4363C159.545 29.902 159.074 35.3532 158.858 40.8163C158.48 50.3654 157.865 59.9048 157.76 69.4583C157.706 74.3553 156.96 79.815 158.034 84.6486", 'none', 'evenodd', '1', '#000000', 'round', 'round', '14.1716')
    }

    const strokeFive = () => {
        return addStroke('stroke5', "M32.5769 81.9949C36.1279 78.4438 42.3448 76.4264 46.7606 74.1252C55.7769 69.4266 65.1478 65.237 74.4876 61.2225C101.852 49.4606 130.362 40.0059 158.858 31.3909C166.629 29.0415 174.433 26.8685 182.284 24.8023C185.934 23.8419 190.176 22.1486 193.997 22.1486", 'none', 'evenodd', '1', '#000000', 'round', 'round', '14.1716')
    }

    return {strokeOne, strokeTwo, strokeThree, strokeFour, strokeFive}

})();

// vector drawn with brush on 14 and pencil on 56% in Vectornator 

/* --------------------------------------------------------------------------------*/

const Player = (name, symbol) => {
    
    const play = (number) => {
            const playedField = board.field(number);
            if (symbol === 'X'){
                playedField.innerHTML = `
                <svg  class='x' width="120" height="120" fill="grey" viewBox="0 0 222 217"  xmlns="http://www.w3.org/2000/svg">
                <rect width="222" height="217" fill="#F5F5F5"/>
                <rect width="222" height="217" fill="white"/>
                <path d="M171.069 28C128.976 81.7712 84.9104 132.532 37.1745 180.049C36.4008 180.819 38.5245 178.227 38.8635 177.134C42.1638 166.486 41.7563 153.547 41.6274 142.608C41.2428 109.964 36.6913 77.7381 31.3396 45.72C30.7156 41.9863 29.4509 37.2545 30.2648 33.316C30.6339 31.5295 30.9155 31.4108 32.7728 32.6872C44.7687 40.9316 56.5666 57.0368 66.1441 67.4412C95.8841 99.749 125.874 131.646 157.25 161.986C173.492 177.691 190.118 191.44 207 206" stroke="black" stroke-width="5" stroke-linecap="round"/>
                </svg>`
            };
            if (symbol === 'O'){
                playedField.innerHTML =
                `<svg class='o'width="100" height="100" fill="grey"  viewBox="0 0 144 161"  xmlns="http://www.w3.org/2000/svg">
                <path d="M72 3C84.342 3 96.5836 7.82356 107 14.2222C114.999 19.136 121.772 24.694 125.778 33.5556C127.955 38.3729 132.024 41.6277 134.556 46.2222C137.454 51.4828 138.868 57.7067 140 63.5556C144.538 87.0028 135.811 110.958 121.333 129.222C108.854 144.965 88.8297 155.25 68.8889 157.778C55.2468 159.507 40.8527 149.932 30.4444 142.222C17.9763 132.987 11.3496 119.483 5.44445 105.444C0.465255 93.6071 2.92072 79.666 7 67.7778C10.8761 56.4817 13.4184 44.7747 19.2222 34.2222C23.5112 26.424 26.5398 21.2621 34.3333 17C40.364 13.702 46.8193 12.617 53.4444 11.2222C59.4155 9.96515 68.0063 10.3292 73 7" stroke="black" stroke-width="5" stroke-linecap="round"/>
                </svg>`
            };
            board.state[number] = symbol;
            console.log(board.state)
            };

    const win = () => {

    }
    
return {name, symbol, play, win};
};

/* --------------------------------------------------------------------------------*/

let player1 = Player('player1', 'X');
let player2 = Player('player2', 'O');
let currentPlayer = player1;
let turnCount = 0;

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
                    game.turn(3)
                    console.log('row 2 played')
                    return
                } else if (currentPlayer.name == 'bot' && countValue(game.state.column2, 'X') === 0) {
                    game.turn(1)
                    console.log('col 2 played')
                    return
                } else {
                    console.log('no exploit')
                    return
                }
    }

}

    

    const smartMove = () => {
        if(!AI.frozen){
        console.log(turnCount)
        makeMove(win);
        makeMove(blockWin);
        secureCenter();
        stopCornerExploit();
        cornerPrio();
        randomMove();
        };
    };

    const slowMove = () => {
        setTimeout(() => {
            smartMove();
        }, 400);
    }

    const on = () => {
        player2.name = 'bot'

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
      
    return {on, off, freeze, unFreeze}
})();

/* --------------------------------------------------------------------------------*/

const game = (function(){

    const changePlayer = () => {
        currentPlayer === player1? currentPlayer = player2 : currentPlayer = player1;
    };
    
    const turn = (number) => {
        if (board.state[number] !== null) return
        currentPlayer.play(number);
        updateState(number);
        if(checkDraw()){
            setTimeout(() => {
                board.clear()
                }, 400)
            };
        checkWin()
        changePlayer();
        turnCount++;
        interface.signalTurn(currentPlayer)
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
                board.freeze(2100);
                currentPlayer.win();
                board.lightUp(key);
                clearState();
                turnCount = 0;
                return key;
            };
        };
    };

return {turn, state, clearState}
})();
