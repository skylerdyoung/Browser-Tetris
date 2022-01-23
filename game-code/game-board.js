/*
    Game Board
*/

class GameBoard{

    constructor(){
        
        this.game_array = [];
        this.color_array = [];
        this.active_piece = null;
        this.active_piece_color = null;
        this.piece_array = [];
        this.next_piece = null;
        this.next_piece_color = null;
        this.next_array = [];
        this.rotate_position = 0;
        this.active_piece_positions = [];
   
        /*  
            game_array is a 2d matrix that tracks the piece positions, 
            including those that are already set. 

            0 = empty square
            1 = active piece square
            2 = static piece square

            The top 4 rows are not represented graphically and are just there 
            for piece generation. 
            
            The bottom row is also not represented graphically and is there
            to convert an active piece that touches it into a static piece.  
            
        */
      
        for (let i = 0; i < 24; i++){

            this.game_array.push(Array(10).fill(0));

        }

        this.game_array.push(Array(10).fill(2));

        /*
            color_array is also a 2d matrix which tracks the piece colors of static pieces
            after they have been set. 

            If no piece has been set in a square, that empty position is represened by
            null.

        */
      
        for (let i = 0; i < 25; i++){

            this.color_array.push(Array(10).fill(null));

        }

        this.setNextPiece();

    }

    fillPieceArray(){

        // piece_array contains 4 of each piece by default. 

        for (let i = 0; i < 4; i++){

            this.piece_array.push('l', 'j', 'i', 'o', 's', 'z', 't');

        }

    }

    setActivePiece(){

        this.active_piece_positions = [];   // tracks positions for rotations
        this.rotate_position = 0; 

        this.active_piece = this.next_piece;
        this.active_piece_color = this.next_piece_color;

        /*
            This method makes an arrangement of 1s in the top 4 rows of 
            the game_array which corresponds to the shape of the chosen
            piece. 

        */
        
        if (this.active_piece === 'l'){
            
            for (let i = 1; i < 4; i++){

                this.game_array[i][4] = 1;
                this.active_piece_positions.push([i, 4]);

            }

            this.game_array[3][5] = 1;
            this.active_piece_positions.push([3, 5]);

        }
        else if (this.active_piece === 'j'){

            for (let i = 1; i < 4; i++){

                this.game_array[i][5] = 1;
                this.active_piece_positions.push([i, 5]);

            }

            this.game_array[3][4] = 1;
            this.active_piece_positions.push([3, 4]);

        }
        else if (this.active_piece === 'i'){
            
            for (let i = 0; i < 4; i++){

                this.game_array[i][5] = 1;
                this.active_piece_positions.push([i, 5]);

            }

        } 
        else if (this.active_piece === 'o'){

            for (let i = 2; i < 4; i++){

                this.game_array[i][4] = 1;
                this.game_array[i][5] = 1;
                this.active_piece_positions.push([i, 4]);
                this.active_piece_positions.push([i, 5]);

            }

        }
        else if (this.active_piece === 's'){

            for (let i = 1; i < 3; i++){

                this.game_array[i][4] = 1;
                this.active_piece_positions.push([i, 4]);

            }

            for (let i = 2; i < 4; i++){

                this.game_array[i][5] = 1;
                this.active_piece_positions.push([i, 5]);

            }

        } 
        else if (this.active_piece === 'z'){
            
            for (let i = 1; i < 3; i++){

                this.game_array[i][5] = 1;
                this.active_piece_positions.push([i, 5]);

            }

            for (let i = 2; i < 4; i++){

                this.game_array[i][4] = 1;
                this.active_piece_positions.push([i, 4]);

            }

        }
        else if (this.active_piece === 't'){

            this.game_array[2][4] = 1;
            this.active_piece_positions.push([2, 4]);

            for (let i = 1; i < 4; i++){

                this.game_array[i][5] = 1;
                this.active_piece_positions.push([i, 5]);
                
            }

        }  

    }

    setNextPiece(){

        /*
            This method picks the next piece 
            randomly from piece_array.
            
        */

        var piece_index = null;

        if (this.piece_array.length === 0){     // refills piece_array if it is empty
            
            this.fillPieceArray();

        }

        piece_index = Math.floor(Math.random() * this.piece_array.length); 
        this.next_piece = this.piece_array[piece_index];
        this.piece_array.splice(piece_index, 1);

        if (this.next_piece === 'l'){this.next_piece_color = 'orange';}
        else if (this.next_piece === 'j'){this.next_piece_color = 'blue';}
        else if (this.next_piece === 'i'){this.next_piece_color = '#87CEFA';} 
        else if (this.next_piece === 'o'){this.next_piece_color = '#FFD700';}
        else if (this.next_piece === 's'){this.next_piece_color = '#5c9900';} 
        else if (this.next_piece === 'z'){this.next_piece_color = 'red';}
        else if (this.next_piece === 't'){this.next_piece_color = 'purple';}  

    }

    movePiece(direction){

        var temp_move_array = [];
        var check = true;

        /*
            All new block positions are pushed into temp_move array 
            so that they can be checked before execution.

        */

        if (direction === 'left'){

            for (let i = 0; i < this.active_piece_positions.length; i++){

                temp_move_array.push([this.active_piece_positions[i][0] , this.active_piece_positions[i][1] - 1]);

            }

        }
        else if (direction === 'right'){

            for (let i = 0; i < this.active_piece_positions.length; i++){

                temp_move_array.push([this.active_piece_positions[i][0] , this.active_piece_positions[i][1] + 1]);

            }

        }

        /*
            If any new block position is already occupied or is outside
            the bounds of the 2d matrix game_array, the check fails
            and the move is not executed.
            
        */

        loop:

            for (let i = 0; i < temp_move_array.length; i++){

                var check_value = this.game_array[temp_move_array[i][0]][temp_move_array[i][1]]; 

                if (check_value === undefined || check_value === 2){
                    
                    check = false;
                    break loop;

                }

            }

        /*
            Otherwise, the new active piece position is added to game_array
            (after removing the old one) and the new block positions are 
            stored in active_piece_positions.

            The checking mechanism is similar in every method that
            requires the position of the active piece to be changed.

        */

        if (check === true){

            for (let i = 0; i < this.active_piece_positions.length; i++ ){

                this.game_array[this.active_piece_positions[i][0]][this.active_piece_positions[i][1]] = 0;

            }

            this.active_piece_positions = [];

            for (let i = 0; i < temp_move_array.length; i++ ){

                this.active_piece_positions.push([temp_move_array[i][0], temp_move_array[i][1]]);
                this.game_array[temp_move_array[i][0]][temp_move_array[i][1]] = 1;

            }

        }

    }

    rotatePiece(){

        var temp_move_array = [];
        var check = true;
        var axis_block = this.active_piece_positions[2];
        var y = axis_block[0];
        var x = axis_block[1];

        /*
            This method rotates the piece that is currently active
            on its axis block, which is the 3rd block in the
            active_piece_positions array.

            axis_block[0] = y-position of the axis block
            axis_block[1] = x-position of the axis block

        */

        if (this.active_piece === 'l'){   

            if (this.rotate_position === 0){temp_move_array.push([y + 1, x], [y, x + 1], [y, x], [y, x + 2]);}
            else if (this.rotate_position === 1){temp_move_array.push([y, x - 1], [y + 1, x], [y, x], [y + 2, x]);}
            else if (this.rotate_position === 2){temp_move_array.push([y - 1, x], [y, x - 1], [y, x], [y, x - 2]);} 
            else if (this.rotate_position === 3){temp_move_array.push([y, x + 1], [y - 1, x], [y, x], [y - 2, x]);} 

        }
        else if (this.active_piece === 'j'){   

            if (this.rotate_position === 0){temp_move_array.push([y - 1, x], [y, x + 1], [y, x], [y, x + 2]);}
            else if (this.rotate_position === 1){temp_move_array.push([y, x + 1], [y + 1, x], [y, x], [y + 2, x]);}
            else if (this.rotate_position === 2){temp_move_array.push([y + 1, x], [y, x - 1], [y, x], [y, x - 2]);}
            else if (this.rotate_position === 3){temp_move_array.push([y, x - 1], [y - 1, x], [y, x], [y - 2, x]);}

        }
        else if (this.active_piece === 'i'){   

            if (this.rotate_position === 0){temp_move_array.push([y, x - 1], [y, x + 1], [y, x], [y, x + 2]);}
            else if (this.rotate_position === 1){temp_move_array.push([y - 1, x], [y + 1, x], [y, x], [y + 2, x]);}
            else if (this.rotate_position === 2){temp_move_array.push([y, x + 1], [y, x - 1], [y, x], [y, x - 2]);}
            else if (this.rotate_position === 3){temp_move_array.push([y + 1, x], [y - 1, x], [y, x], [y - 2, x]);}

        }
        else if (this.active_piece === 'o'){

            check = false;

        }
        else if (this.active_piece === 's'){

            if (this.rotate_position === 0){temp_move_array.push([y - 1, x], [y - 1, x + 1], [y, x], [y, x - 1]);}
            else if (this.rotate_position === 1){temp_move_array.push([y, x + 1], [y + 1, x + 1], [y, x], [y - 1, x]);}
            else if (this.rotate_position === 2){temp_move_array.push([y + 1, x], [y + 1, x - 1], [y, x], [y, x + 1]);}
            else if (this.rotate_position === 3){temp_move_array.push([y, x - 1], [y - 1, x - 1], [y, x], [y + 1, x]);}

        }
        else if (this.active_piece === 'z'){

            if (this.rotate_position === 0){temp_move_array.push([y + 1, x + 1], [y + 1, x], [y, x], [y, x - 1]);}
            else if (this.rotate_position === 1){temp_move_array.push([y, x - 1], [y + 1, x - 1], [y, x], [y - 1, x]);}
            else if (this.rotate_position === 2){temp_move_array.push([y - 1, x], [y - 1, x - 1], [y, x], [y, x + 1]);}
            else if (this.rotate_position === 3){temp_move_array.push([y, x + 1], [y - 1, x + 1], [y, x], [y + 1, x]);}

        }
        else if (this.active_piece === 't'){

            if (this.rotate_position === 0){temp_move_array.push([y - 1, x], [y, x - 1], [y, x], [y, x + 1]);}
            else if (this.rotate_position === 1){temp_move_array.push([y - 1, x], [y, x + 1], [y, x], [y + 1, x]);}
            else if (this.rotate_position === 2){temp_move_array.push([y, x - 1], [y + 1, x], [y, x], [y, x + 1]);}
            else if (this.rotate_position === 3){temp_move_array.push([y - 1, x], [y, x - 1], [y, x], [y + 1, x]);}

        }

        if (temp_move_array.length > 0){

            loop:
            
                if (temp_move_array.length > 0){

                    for (let i = 0; i < temp_move_array.length; i++){

                        var check_value = this.game_array[temp_move_array[i][0]][temp_move_array[i][1]]; 

                        if (check_value === undefined || check_value === 2){
                            
                            check = false;
                            break loop;

                        }

                    }
        
                }
        
        }
            
        if (check === true){

            for (let i = 0; i < this.active_piece_positions.length; i++ ){

                this.game_array[this.active_piece_positions[i][0]][this.active_piece_positions[i][1]] = 0;

            }

            this.active_piece_positions = [];

            for (let i = 0; i < temp_move_array.length; i++){

                this.active_piece_positions.push([temp_move_array[i][0], temp_move_array[i][1]]);
                this.game_array[temp_move_array[i][0]][temp_move_array[i][1]] = 1;

            }

            if (this.rotate_position < 3){

                this.rotate_position += 1;

            }
            else{

                this.rotate_position = 0;

            }
    
        }
        
    }

    clearFullRows(){

        /*
            This method checks every row in game_array and, if that
            row does not contain a 1 or a 0, it is removed and
            a new blank row containing only 0s is added directly
            at the top of the visible area.
            
        */

        var columnLength = this.game_array.length - 2;

        var count = 0;
    
        for (let i = columnLength; i >= 4; i-- ){
    
            if (!(this.game_array[i].includes(1)) && !(this.game_array[i].includes(0))){

                this.game_array.splice(i, 1);
                this.color_array.splice(i, 1);

                this.game_array.splice(4, 0, Array(10).fill(0));
                this.color_array.splice(4, 0, Array(10).fill(null));

                count += 1;

                i+= 1;

            }
    
        }

        return count;   // amount of removed rows is returned for scoring purposes

    }

    update(){

        /*
            This method moves every block in the active piece down by
            one position, unless any of the potential new positions 
            already contain a 2, in which case the active piece will be 
            converted into a static piece.

        */

        var check = true;
        var temp_move_array = [];

        for (let i = 0; i < this.active_piece_positions.length ; i++){

            temp_move_array.push([this.active_piece_positions[i][0] + 1, this.active_piece_positions[i][1]]);  
            
        }

        loop:

            for (let i = 0; i < temp_move_array.length; i++){

                var check_value = this.game_array[temp_move_array[i][0]][temp_move_array[i][1]]; 

                if (check_value === 2){
                    
                    check = false;
                    break loop;

                }

            }
        
        if (check === true){


            for (let i = 0; i < this.active_piece_positions.length; i++){
                
                this.game_array[this.active_piece_positions[i][0]][this.active_piece_positions[i][1]] = 0;

            }

            this.active_piece_positions = [];

            for (let i = 0; i < temp_move_array.length; i++){

                this.game_array[temp_move_array[i][0]][temp_move_array[i][1]] = 1;
                this.active_piece_positions.push([temp_move_array[i][0], temp_move_array[i][1]]);

            }

        }
        else{

            for (let i = 0; i < this.active_piece_positions.length; i++ ){

                this.game_array[this.active_piece_positions[i][0]][this.active_piece_positions[i][1]] = 2;
                this.color_array[this.active_piece_positions[i][0]][this.active_piece_positions[i][1]] = this.active_piece_color;
                
            }
    
            this.active_piece = null;
            this.active_piece_color = null;
            this.active_piece_positions = [];

        }

    }

    checkLoss(){

        /*
            This method checks the first 4 rows of game_array,
            and if any of them contain a 2 (which indicates
            a static piece outside of the game bounds),
            the function will return true. Otherwise, it will
            return false.

        */

        for (let i = 0; i < 4; i++ ){

            for (let j= 0; j < this.game_array[0].length; j++){

                if(this.game_array[i][j] === 2){
                    return true;
                }

            }
     
        }

        return false;

    }

}