const board = (function(){

    let state = [null, null, null, null, null, null, null, null, null];

    const allFields = () => {
        const container = document.querySelector("#board-container");
        return container.children;
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
    };

    const setClick = () => {
        let fields = allFields();
        for(let field of fields){
            field.addEventListener('click', consumeTurn, false);
            function consumeTurn() {
            let number = +this.getAttribute('data-index');
            game.turn(number);
            };
        };
    };

return {state, render, setClick, field, clear};
})();

board.setClick();


/* --------------------------------------------------------------------------------*/

const Player = (name, symbol) => {
    
    const play = (number) => {
            const playedField = board.field(number);
            playedField.textContent = symbol;
            board.state[number] = symbol;
            console.log(board.state)
            };
    
return {name, symbol, play};
};

const player1 = Player('cas', 'X');
const player2 = Player('vincent', 'O');

/* --------------------------------------------------------------------------------*/

const game = (function(){
    let currentPlayer = player1;

    const changePlayer = () => {
    currentPlayer == player1? currentPlayer = player2 : currentPlayer = player1;
    console.log(`It's now ${currentPlayer.name}'s turn`);
    };
    
    const turn = (number) => {
        if (board.state[number] !== null) return
        currentPlayer.play(number);
        console.log(`${currentPlayer.name} played`);
        game.updateState(number);
        changePlayer();
    };


    let state = {
        row1: [null, null, null],
        row2: [null, null, null],
        row3: [null, null, null],

        column1: [null, null, null],
        column2: [null, null, null],
        column3: [null, null, null],

        diagonal1: [null, null, null],
        diagonal2: [null, null, null]
    };


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

    const checkRow = (row) => {
        const result = row.every(e => {
            if (row[0] != null && e === row[0]){
                return true;
            }
        });
     return result;
    };

    const checkWin = () => {
       // find a way to loop over all entries in state
       // perform checkRow for each
       // return the row that returns true 
       // perform some visual crap on that row
       // count a win for the current player
    };

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

return {currentPlayer, turn, updateState, state, clearState, checkRow, checkWin}
})();