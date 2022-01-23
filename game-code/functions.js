/*
    Functions
*/

function fillBoard(matrix, color_matrix, piece_positions, context, current_color){  
    
    var columnLength = matrix.length - 2;
    var rowLength = matrix[0].length;

    for (let i = columnLength; i >= 4; i-- ){   

        for (let j = 0; j < rowLength; j++ ){

            if(matrix[i][j] === 2){

                context.fillStyle = color_matrix[i][j];    
                context.fillRect(j * 20, (i -4) * 20, 20, 20);
                
            }

        }
    }

    for (let i = 0; i < piece_positions.length; i++){  

        context.fillStyle = current_color;
        context.fillRect(piece_positions[i][1] * 20, (piece_positions[i][0] - 4) * 20, 20, 20);

    }

}

function fillNext(next_piece, context, next_color){ 

    context.fillStyle = next_color;

    if (next_piece === 'l'){

        context.fillRect(30, 10, 20, 20);
        context.fillRect(30, 30, 20, 20);
        context.fillRect(30, 50, 20, 20);
        context.fillRect(50, 50, 20, 20);

    }
    else if (next_piece === 'j'){

        context.fillRect(50, 10, 20, 20);
        context.fillRect(50, 30, 20, 20);
        context.fillRect(50, 50, 20, 20);
        context.fillRect(30, 50, 20, 20);

    }
    else if (next_piece === 'i'){

        context.fillRect(40, 10, 20, 20);
        context.fillRect(40, 30, 20, 20);
        context.fillRect(40, 50, 20, 20);
        context.fillRect(40, 70, 20, 20);

    }
    else if (next_piece === 'o'){

        context.fillRect(30, 10, 20, 20);
        context.fillRect(30, 30, 20, 20);
        context.fillRect(50, 10, 20, 20);
        context.fillRect(50, 30, 20, 20);

    }
    else if (next_piece === 's'){

        context.fillRect(30, 10, 20, 20);
        context.fillRect(30, 30, 20, 20);
        context.fillRect(50, 30, 20, 20);
        context.fillRect(50, 50, 20, 20);

    }
    else if (next_piece === 'z'){        

        context.fillRect(30, 30, 20, 20);
        context.fillRect(30, 50, 20, 20);
        context.fillRect(50, 10, 20, 20);
        context.fillRect(50, 30, 20, 20);

    }
    else if (next_piece === 't'){

        context.fillRect(50, 10, 20, 20);
        context.fillRect(50, 30, 20, 20);
        context.fillRect(50, 50, 20, 20);
        context.fillRect(30, 30, 20, 20);

    }
    
}

function updateScore(){
    
    var temp_score_string = score.toString();
    var temp_zero_string = "";
    var new_score_string = null;
    var score_display = document.getElementById('score');
    
    for (let i = 0; i < (11 - temp_score_string.length); i++){      

        temp_zero_string += "0";

    }
    
    new_score_string = temp_zero_string + temp_score_string;

    score_display.innerHTML = new_score_string;

}

function endGame(){

    game_over = true;
    clearInterval(game_loop);
    document.getElementById('title').innerHTML = "Game Over";
    document.getElementById('retry').style.display = "initial";

}

function resetGame(){ 

    game_board = new GameBoard();
    time = 250;
    score = 0;
    point_multiplier = 250/time;
    game_over = false;

    document.getElementById('title').innerHTML = "Browser Tetris";
    document.getElementById('retry').style.display = "none";
    
    var canvas = document.getElementById('game');
    var next_canvas = document.getElementById('next');
    
    if (canvas.getContext){

        var ctx = canvas.getContext('2d');

    }

    if (next_canvas.getContext){

        var next_ctx = next_canvas.getContext('2d');
        
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    next_ctx.clearRect(0, 0, next_canvas.width, next_canvas.height);
    
    game_board.setActivePiece();
    game_board.setNextPiece();    

    clearInterval(game_loop);
    game_loop = setInterval(draw, time);

    updateScore();
   
}

function draw(){
    
    var canvas = document.getElementById('game');    
    var next_canvas = document.getElementById('next');
    
    if (canvas.getContext){

        var ctx = canvas.getContext('2d');

    }

    if (next_canvas.getContext){
        
        var next_ctx = next_canvas.getContext('2d');

    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    next_ctx.clearRect(0, 0, next_canvas.width, next_canvas.height);    
    next_ctx.fillStyle = "black";
    next_ctx.fillRect(0, 0, next_canvas.width, next_canvas.height);

    game_board.update();

    var cleared_rows = game_board.clearFullRows();
    
    if(cleared_rows > 0){          

        clearInterval(game_loop);

        if (time > 50){    

            time -= 5;  // game speeds up when a row is cleared

        }

        score += parseInt((750 * (2 ** (cleared_rows - 1))) * point_multiplier);  
        game_loop = setInterval(draw, time);

    }

    if(game_board.checkLoss()){

        endGame();

    }

    if (game_board.active_piece === null){

        game_board.setActivePiece();
        game_board.setNextPiece();

    }

    var game_array =  game_board.game_array;
    var color_array = game_board.color_array;
    var current_color = game_board.active_piece_color;
    var current_piece_positions = game_board.active_piece_positions;

    fillBoard(game_array, color_array, current_piece_positions, ctx, current_color);

    var next_piece =  game_board.next_piece;
    var next_color =  game_board.next_piece_color;

    fillNext(next_piece, next_ctx, next_color);

    updateScore();

    point_multiplier = 250/time;

    if(game_board.checkLoss()){

        endGame();

    }

}

function moveToBottom(){
     
    var canvas = document.getElementById('game');
    var next_canvas = document.getElementById('next');
    
    if (canvas.getContext){

        var ctx = canvas.getContext('2d');

    }

    if (next_canvas.getContext){

        var next_ctx = next_canvas.getContext('2d');

    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    next_ctx.clearRect(0, 0, next_canvas.width, next_canvas.height);
    next_ctx.fillStyle = "black";
    next_ctx.fillRect(0, 0, next_canvas.width, next_canvas.height);

    var update_count = 0;

    while(game_board.active_piece != null){

        update_count += 1;
        game_board.update();
    
    }

    score += parseInt((2 * update_count) * point_multiplier);

    var cleared_rows = game_board.clearFullRows();

    if(cleared_rows > 0){

        clearInterval(game_loop);

        if (time > 50){

            time -= 5;

        }

        score += parseInt((150 * update_count) * (2 ** (cleared_rows - 1)) * point_multiplier);
        game_loop = setInterval(draw, time);

    }

    if(game_board.checkLoss()){

        endGame();

    }
    
    if (game_board.active_piece === null){

        game_board.setActivePiece();
        game_board.setNextPiece();

    }

    var game_array =  game_board.game_array;
    var color_array = game_board.color_array;
    var current_color = game_board.active_piece_color;
    var current_piece_positions = game_board.active_piece_positions;

    fillBoard(game_array, color_array, current_piece_positions, ctx, current_color);

    var next_piece =  game_board.next_piece;
    var next_color =  game_board.next_piece_color;

    fillNext(next_piece, next_ctx, next_color);

    updateScore();

    point_multiplier = 250/time;
   
}

function move(direction){

    var canvas = document.getElementById('game');
    
    if (canvas.getContext){

        var ctx = canvas.getContext('2d');

    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    game_board.movePiece(direction);

    var array_board =  game_board.game_array;
    var array_color_board = game_board.color_array;
    var current_color = game_board.active_piece_color;
    var current_piece_positions = game_board.active_piece_positions;

    fillBoard(array_board, array_color_board, current_piece_positions, ctx, current_color);

}

function rotate(){

    var canvas = document.getElementById('game');
    
    if (canvas.getContext){

        var ctx = canvas.getContext('2d');

    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    game_board.rotatePiece();

    var array_board =  game_board.game_array;
    var array_color_board = game_board.color_array;
    var current_color = game_board.active_piece_color;
    var current_piece_positions = game_board.active_piece_positions;

    fillBoard(array_board, array_color_board, current_piece_positions, ctx, current_color);

}