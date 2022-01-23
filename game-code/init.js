/*
    Game Init Code
*/

var game_board = new GameBoard();
var time = 250;                      
var score = 0;
var point_multiplier = 250/time
var game_over = false;

game_board.setActivePiece();
game_board.setNextPiece();

var game_loop = setInterval(draw, time);

document.addEventListener('keydown', event => {     // Keyboard Assignments
    
    if(!(game_over)){
 
        if(event.key == 'ArrowLeft') {
            
            move('left');

        }
        else if(event.key == "ArrowRight") {

            move('right');

        }
        else if(event.key == "ArrowDown") {
            
            score += parseInt(1 * point_multiplier);
            updateScore()
            draw();

        }
        else if(event.key == "ArrowUp"){

            rotate();
        
        }
        else if(event.key == " ") {

            moveToBottom();

        }
    
    }
    
});
