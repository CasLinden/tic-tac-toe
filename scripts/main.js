// Where to go from here:
// - Satisfying tally win counter
// - Better win animation
// - shake animation for draw
// - draw 10 times against the AI challenge 
// - Fixing the AI when player starts with opposite corners
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

    const armFields = () => {
        let fields = allFields();
        for(let field of fields){
            field.addEventListener('click', consumeTurn, false);
                
                function consumeTurn() {
                playPlay(this);
                };
        };
    };

    const disarmFields = () => {
        let fields = allFields();
        for(let field of fields){
            field.removeEventListener('click', consumeTurn, false);
                
                function consumeTurn() {
                playPlay(this);
                };
        };
    };


    const playPlay = (square) => {
        let number = +square.getAttribute('data-index');
        game.turn(number);
    };



    const freeze = (time) => {
        disarmFields();
        setTimeout(() => {
            armFields();
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

    armFields();
    lightsOff();


return {state, field, fields, allFields, clear, lightUp, freeze, armFields, disarmFields};
})();


/* --------------------------------------------------------------------------------*/
const interface = (function(){

    const eraser = () => {
        const button = document.querySelector('#eraser');
        button.addEventListener('click', erase, false); 
                function erase() {
                board.clear()
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
let currentPlayer = player1

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

    const smartMove = () => {
        if(!AI.frozen){
        makeMove(win);
        makeMove(blockWin);
        secureCenter();
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

    let count = 0;

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
            return true;
        };
    };

    const checkWin = () => {
        for (const key of Object.keys(state)){
            if (rowWin(state[key])){
                AI.freeze(410);
                board.freeze(1000);
                currentPlayer.win();
                board.lightUp(key);
                clearState();
                return key;
            };
        };
    };

return {turn, state, clearState}
})();
