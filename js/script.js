document.addEventListener("DOMContentLoaded", function(){

    // Desactiver le clique droit

    /* jQuery(function() {
        jQuery(this).bind("contextmenu", function(e) {
            e.preventDefault();
        });
    }); */

    function swap_turns () {
        if ($black_turn && !$white_turn) {
            $black_turn = false;
            $white_turn = true;
            jQuery('.tiles-stock-white').addClass('pulse');
            jQuery('.tiles-stock-black').removeClass('pulse');
        } else {
            $black_turn = true;
            $white_turn = false;
            jQuery('.tiles-stock-white').removeClass('pulse');
            jQuery('.tiles-stock-black').addClass('pulse');
        }
        update_playable_tiles();
    }

    function start_timer() {
        if (!game_over) {
            var el = document.getElementById('bar');
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null; 

            let timeLimit = "20s";
            document.querySelector('#bar').style.animationDuration = timeLimit;


            timer_timeout = setTimeout(function()
            {
                swap_turns();
                start_timer();
            }, 20000);
        }

    }

    // global variables

    var $black_turn = true;
    var $white_turn = false;
    var rowPlayed;
    var colPlayed;
    var game_over = false;

    // 0 => empty // 1 => white // 2 => black // 3 => playable
    function tile_type (i, j) {
        if (jQuery('#cell-' + i + '-' + j + ' > div').hasClass('white')) {
            return 1;
        } else  if (jQuery('#cell-' + i + '-' + j + ' > div').hasClass('black')) {
            return 2;
        } else if (jQuery('#cell-' + i + '-' + j + ' > div').hasClass('playable')) {
            return 3;
        } else {
            return 0;
        }
    }

    function set_playable (row, col) {
        jQuery('#cell-' + row + '-' + col + ' > div').addClass('playable')
    }

    function init_parsing_variables() {
        seq_begin_white = -1;
        seq_end_white = -1;
        seq_begin_black = -1;
        seq_end_black = -1;
    }

    function clear_playable_tiles() {
        jQuery('.playable').removeClass('playable');
    }

    function parse_top_bottom () {
        row = 0;
        col = 0;

        init_parsing_variables();

        while ( col < 8 ) {
            while ( row < 8) {

                // white
                if (tile_type(row, col) == 1) {
                    if (seq_begin_white == -1) {
                        seq_begin_white = row;
                        seq_end_white = row;
                    } else {
                        seq_end_white = row;
                    }
                    row++;
                }

                // black
                if (tile_type(row, col) == 2) {
                    if (seq_begin_black == -1) {
                        seq_begin_black = row;
                        seq_end_black = row;
                    } else {
                        seq_end_black = row;
                    }
                    row++;
                }

                // playable
                if (tile_type(row, col) == 3) {
                    init_parsing_variables();
                    row++;
                }

                // empty
                if (tile_type(row, col) == 0) {
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        
                        if ( ($white_turn && (seq_end_white <  seq_end_black)) || ($black_turn && (seq_end_black <  seq_end_white)) ) {
                            set_playable (row, col);
                        }
                    }
                    init_parsing_variables();
                    row++;
                }
        
            } 
            col++;
            row = 0;  
        }
    }

    function parse_bottom_top () {
        row = 7;
        col = 7;

        init_parsing_variables();

        while ( col >= 0 ) {
            while ( row >= 0) {

                // white
                if (tile_type(row, col) == 1) {
                    if (seq_begin_white == -1) {
                        seq_begin_white = row;
                        seq_end_white = row;
                    } else {
                        seq_end_white = row;
                    }
                    row--;
                }

                // black
                if (tile_type(row, col) == 2) {
                    if (seq_begin_black == -1) {
                        seq_begin_black = row;
                        seq_end_black = row;
                    } else {
                        seq_end_black = row;
                    }
                    row--;
                }

                // playable
                if (tile_type(row, col) == 3) {
                    init_parsing_variables();
                    row--;
                }

                // empty
                if (tile_type(row, col) == 0) {
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        
                        if ( ($white_turn && (seq_end_white >  seq_end_black)) || ($black_turn && (seq_end_black >  seq_end_white)) ) {
                            set_playable (row, col);
                        }
                    }
                    init_parsing_variables();
                    row--;
                }
        
            } 
            col--;
            row = 7;  
        }
    }

    function parse_left_right() {
        row = 0;
        col = 0;

        init_parsing_variables();

        while ( row < 8 ) {
            while ( col < 8) {

                // white
                if (tile_type(row, col) == 1) {
                    if (seq_begin_white == -1) {
                        seq_begin_white = col;
                        seq_end_white = col;
                    } else {
                        seq_end_white = col;
                    }
                    col++;
                }

                // black
                if (tile_type(row, col) == 2) {
                    if (seq_begin_black == -1) {
                        seq_begin_black = col;
                        seq_end_black = col;
                    } else {
                        seq_end_black = col;
                    }
                    col++;
                }

                // playable
                if (tile_type(row, col) == 3) {
                    init_parsing_variables();
                    col++;
                }

                // empty
                if (tile_type(row, col) == 0) {
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        
                        if ( ($white_turn && (seq_end_white <  seq_end_black)) || ($black_turn && (seq_end_black <  seq_end_white)) ) {
                            set_playable (row, col);
                        }
                    }
                    init_parsing_variables();
                    col++;
                }
        
            } 
            row++;
            col = 0;  
        }
    }

    function parse_right_left () {
        row = 7;
        col = 7;

        init_parsing_variables();

        while ( row >= 0 ) {
            while ( col >= 0) {

                // white
                if (tile_type(row, col) == 1) {
                    if (seq_begin_white == -1) {
                        seq_begin_white = col;
                        seq_end_white = col;
                    } else {
                        seq_end_white = col;
                    }
                    col--;
                }

                // black
                if (tile_type(row, col) == 2) {
                    if (seq_begin_black == -1) {
                        seq_begin_black = col;
                        seq_end_black = col;
                    } else {
                        seq_end_black = col;
                    }
                    col--;
                }

                // playable
                if (tile_type(row, col) == 3) {
                    init_parsing_variables();
                    col--;
                }

                // empty
                if (tile_type(row, col) == 0) {
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        
                        if ( ($white_turn && (seq_end_white >  seq_end_black)) || ($black_turn && (seq_end_black >  seq_end_white)) ) {
                            set_playable (row, col);
                        }
                    }
                    init_parsing_variables();
                    col--;
                }
        
            } 
            row--;
            col = 7;  
        }
    }

    function parse_diag_top_bottom_left_right () {

        row = 7;
        col = 0;

        init_parsing_variables();

        /* (7, 0)
        (6, 0) (7, 1)
        (5, 0) (6, 1) (7, 2)
        ... */

        while (row >= 0) {
            col = 0;
            parse_row = row;
            while (parse_row < 8) {

                // white
                if (tile_type(parse_row, col) == 1) {
                    
                    if (seq_begin_white == -1) {
                        seq_begin_white = parse_row;
                        seq_end_white = parse_row;
                    } else {
                        seq_end_white = parse_row;
                    }
                    parse_row++;
                    col++;
                }

                // black
                if (tile_type(parse_row, col) == 2) {
                    
                    if (seq_begin_black == -1) {
                        seq_begin_black = parse_row;
                        seq_end_black = parse_row;
                    } else {
                        seq_end_black = parse_row;
                    }
                    parse_row++;
                    col++;
                }

                // playable
                if (tile_type(parse_row, col) == 3) {
                    parse_row++;
                    col++;
                    init_parsing_variables();
                }

                // empty
                if (tile_type(parse_row, col) == 0) {
                    
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        //console.log(parse_row + ' ' + col);
                        if ( ($white_turn && (seq_end_white <  seq_end_black)) || ($black_turn && (seq_end_black <  seq_end_white)) ) {
                            set_playable (parse_row, col);
                        }
                    }
                    parse_row++;
                    col++;
                    init_parsing_variables();
                }
            }  
            row--;
        }

        row = 7;
        col = 0;

        /*
        (0, 5) (1, 6) (2, 7)
        (0, 6) (1, 7)
        (0, 7) */

        while (col < 8) {
            row = 0;
            parse_col = col;
            while (parse_col < 8) {


                // white
                if (tile_type(row, parse_col) == 1) {
                    
                    if (seq_begin_white == -1) {
                        seq_begin_white = row;
                        seq_end_white = row;
                    } else {
                        seq_end_white = row;
                    }
                    parse_col++;
                    row++;
                }

                // black
                if (tile_type(row, parse_col) == 2) {
                    
                    if (seq_begin_black == -1) {
                        seq_begin_black = row;
                        seq_end_black = row;
                    } else {
                        seq_end_black = row;
                    }
                    parse_col++;
                    row++;
                }

                // playable
                if (tile_type(row, parse_col) == 3) {
                    parse_col++;
                    row++;
                    init_parsing_variables();
                }

                // empty
                if (tile_type(row, parse_col) == 0) {
                    
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        
                        if ( ($white_turn && (seq_end_white <  seq_end_black)) || ($black_turn && (seq_end_black <  seq_end_white)) ) {
                            set_playable (row, parse_col);
                        }
                    }
                    parse_col++;
                    row++;
                    init_parsing_variables();
                }
                
                
            }  
            
            col++;
        } 

    }

    function parse_diag_bottom_top_right_left () {

        col = 0;

        init_parsing_variables();

        /* 
        (7, 0)
        (7, 1) (6, 0) 
        (7, 2) (6, 1) (5, 0)
        ... */

        while (col < 8) {

            row = 7;
            parse_col = col;

            while (parse_col >= 0) {
                //console.log(row + ' , ' + parse_col);

                // white
                if (tile_type(row, parse_col) == 1) {
                    
                    if (seq_begin_white == -1) {
                        seq_begin_white = row;
                        seq_end_white = row;
                    } else {
                        seq_end_white = row;
                    }
                    row--;
                    parse_col--;
                }

                // black
                if (tile_type(row, parse_col) == 2) {
                    
                    if (seq_begin_black == -1) {
                        seq_begin_black = row;
                        seq_end_black = row;
                    } else {
                        seq_end_black = row;
                    }
                    row--;
                    parse_col--;
                }

                // playable
                if (tile_type(row, parse_col) == 3) {
                    row--;
                    parse_col--;
                    init_parsing_variables();
                }

                // empty
                if (tile_type(row, parse_col) == 0) {
                    
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        
                        if ( ($white_turn && (seq_end_white >  seq_end_black)) || ($black_turn && (seq_end_black >  seq_end_white)) ) {
                            
                            set_playable (row, parse_col);
                        }
                    }
                    row--;
                    parse_col--;
                    init_parsing_variables();
                }

            } 
            //console.log('---'); 
            col++;
        }

        /*
        ...
        (2, 7) (1, 6) (0, 5)
        (1, 7) (0, 6) 
        (0, 7) */

        row = 7;

        while (row >= 0) {

            col = 7;
            parse_row = row; 

            while (parse_row >= 0) {

                // white
                if (tile_type(parse_row, col) == 1) {
                    
                    if (seq_begin_white == -1) {
                        seq_begin_white = parse_row;
                        seq_end_white = parse_row;
                    } else {
                        seq_end_white = parse_row;
                    }
                    parse_row--;
                    col--;
                }

                // black
                if (tile_type(parse_row, col) == 2) {
                    
                    if (seq_begin_black == -1) {
                        seq_begin_black = parse_row;
                        seq_end_black = parse_row;
                    } else {
                        seq_end_black = parse_row;
                    }
                    parse_row--;
                    col--;
                }

                // playable
                if (tile_type(parse_row, col) == 3) {
                    parse_row--;
                    col--;
                    init_parsing_variables();
                }

                // empty
                if (tile_type(parse_row, col) == 0) {
                    
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        
                        if ( ($white_turn && (seq_end_white > seq_end_black)) || ($black_turn && (seq_end_black > seq_end_white)) ) {
                            
                            set_playable (parse_row, col);
                        }
                    }
                    parse_row--;
                    col--;
                    init_parsing_variables();
                }

            } 
            //console.log('---'); 
            row--;
        }

    }

    function parse_diag_top_bottom_right_left () {

        row = 7;
        col = 0;

        init_parsing_variables();


        /* (0 , 0)
        (0, 1) (1, 0)
        (0, 2) (1, 1) (2, 0) */

        while (row >= 0) {
            col = 0;
            parse_row = row;
            while (parse_row < 8) {
                //console.log( col + ' ' + (7 - parse_row));
                // white
                if (tile_type(col, (7 - parse_row)) == 1) {
                    
                    if (seq_begin_white == -1) {
                        seq_begin_white = parse_row;
                        seq_end_white = parse_row;
                    } else {
                        seq_end_white = parse_row;
                    }
                    parse_row++;
                    col++;
                }

                // black
                if (tile_type(col, (7 - parse_row)) == 2) {
                    
                    if (seq_begin_black == -1) {
                        seq_begin_black = parse_row;
                        seq_end_black = parse_row;
                    } else {
                        seq_end_black = parse_row;
                    }
                    parse_row++;
                    col++;
                }

                // playable
                if (tile_type(col, (7 - parse_row)) == 3) {
                    parse_row++;
                    col++;
                    init_parsing_variables();
                }

                // empty
                if (tile_type(col, (7 - parse_row)) == 0) {
                    
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        //console.log(col + ' ' + (7 - parse_row));
                        if ( ($white_turn && (seq_end_white <  seq_end_black)) || ($black_turn && (seq_end_black <  seq_end_white)) ) {
                            set_playable (col, (7 - parse_row));
                        }
                    }
                    parse_row++;
                    col++;
                    init_parsing_variables();
                }
            } 
            //console.log('---'); 
            row--;
        }

        row = 7;
        col = 0;

        /*
        (0, 5) (1, 6) (2, 7)
        (0, 6) (1, 7)
        (0, 7) */

        while (col < 8) {
            row = 0;
            parse_col = col;
            while (parse_col < 8) {
                
                // white
                if (tile_type(parse_col, (7 - row)) == 1) {
                    
                    if (seq_begin_white == -1) {
                        seq_begin_white = row;
                        seq_end_white = row;
                    } else {
                        seq_end_white = row;
                    }
                    parse_col++;
                    row++;
                }

                // black
                if (tile_type(parse_col, (7 - row)) == 2) {
                    
                    if (seq_begin_black == -1) {
                        seq_begin_black = row;
                        seq_end_black = row;
                    } else {
                        seq_end_black = row;
                    }
                    parse_col++;
                    row++;
                }

                // playable
                if (tile_type(parse_col, (7 - row)) == 3) {
                    parse_col++;
                    row++;
                    init_parsing_variables();
                }

                // empty
                if (tile_type(parse_col, (7 - row)) == 0) {
                    
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        
                        if ( ($white_turn && (seq_end_white <  seq_end_black)) || ($black_turn && (seq_end_black <  seq_end_white)) ) {
                            set_playable (parse_col, (7 - row));
                        }
                    }
                    parse_col++;
                    row++;
                    init_parsing_variables();
                }  
                
            }  
            //console.log('---*');
            col++;
        } 

    }

    function parse_diag_bottom_top_left_right () {

        col = 0;

        init_parsing_variables();

        while (col < 8) {

            row = 7;
            parse_col = col;

            while (parse_col >= 0) {
                
                // white
                if (tile_type(row, (7 - parse_col)) == 1) {
                    
                    if (seq_begin_white == -1) {
                        seq_begin_white = row;
                        seq_end_white = row;
                    } else {
                        seq_end_white = row;
                    }
                    row--;
                    parse_col--;
                }

                // black
                if (tile_type(row, (7 - parse_col)) == 2) {
                    
                    if (seq_begin_black == -1) {
                        seq_begin_black = row;
                        seq_end_black = row;
                    } else {
                        seq_end_black = row;
                    }
                    row--;
                    parse_col--;
                }

                // playable
                if (tile_type(row, (7 - parse_col)) == 3) {
                    row--;
                    parse_col--;
                    init_parsing_variables();
                }

                // empty
                if (tile_type(row, (7 - parse_col)) == 0) {
                    
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        
                        if ( ($white_turn && (seq_end_white >  seq_end_black)) || ($black_turn && (seq_end_black >  seq_end_white)) ) {
                            
                            set_playable (row, (7 - parse_col));
                        }
                    }
                    row--;
                    parse_col--;
                    init_parsing_variables();
                }

            } 
            col++;
        }

        row = 7;

        while (row >= 0) {

            col = 7;
            parse_row = row; 

            while (parse_row >= 0) {
                
                // white
                if (tile_type(parse_row, ( 7 - col )) == 1) {
                    
                    if (seq_begin_white == -1) {
                        seq_begin_white = parse_row;
                        seq_end_white = parse_row;
                    } else {
                        seq_end_white = parse_row;
                    }
                    parse_row--;
                    col--;
                }

                // black
                if (tile_type(parse_row, ( 7 - col )) == 2) {
                    
                    if (seq_begin_black == -1) {
                        seq_begin_black = parse_row;
                        seq_end_black = parse_row;
                    } else {
                        seq_end_black = parse_row;
                    }
                    parse_row--;
                    col--;
                }

                // playable
                if (tile_type(parse_row, ( 7 - col )) == 3) {
                    parse_row--;
                    col--;
                    init_parsing_variables();
                }

                // empty
                if (tile_type(parse_row, ( 7 - col )) == 0) {
                    
                    if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {
                        
            
                        if ( ($white_turn && (seq_end_white > seq_end_black)) || ($black_turn && (seq_end_black > seq_end_white)) ) {
                            
                            set_playable (parse_row, ( 7 - col ));
                        }
                    }
                    parse_row--;
                    col--;
                    init_parsing_variables();
                }

            } 
            row--;
        }

    }

    function end_game() {
        game_over = true;
        play_sound('game_over');

        jQuery('.tiles-stock-white').removeClass('pulse');
        jQuery('.tiles-stock-black').removeClass('pulse');

        var el = document.getElementById('bar');
        el.style.animation = 'none';
        el.offsetHeight; /* trigger reflow */
        el.style.animation = null; 

        clearTimeout(timer_timeout);

        swal('Partie terminée')

        // afficher le score etc
    }

    function update_playable_tiles () {
        clear_playable_tiles();
        // parser dans toutes les directions
        parse_top_bottom();
        parse_bottom_top();
        parse_left_right();
        parse_right_left();
        parse_diag_top_bottom_left_right();
        parse_diag_bottom_top_right_left();
        parse_diag_top_bottom_right_left();
        parse_diag_bottom_top_left_right();
       
        if (jQuery('.playable').length == 0) {
            end_game();
        }
    }

    function flip (f_row, f_col) {

        jQuery('#cell-' + f_row + '-' + f_col + ' > div').css('transform', 'rotate(-90deg) scaleX(-1)');
        setTimeout(function() {
            jQuery('#cell-' + f_row + '-' + f_col + ' > div').css('transform', 'rotate(0deg) scaleX(1)');
        }, 100);

        // changer la couleur

        if (jQuery('#cell-' + f_row + '-' + f_col + ' > div').hasClass('white')) {
            jQuery('#cell-' + f_row + '-' + f_col + ' > div').removeClass('white');
            jQuery('#cell-' + f_row + '-' + f_col + ' > div').addClass('black');
        } else if (jQuery('#cell-' + f_row + '-' + f_col + ' > div').hasClass('black')) {
            jQuery('#cell-' + f_row + '-' + f_col + ' > div').removeClass('black');
            jQuery('#cell-' + f_row + '-' + f_col + ' > div').addClass('white');
        }

        updateScore();
        update_playable_tiles();

    }

    function startGame() {
        jQuery('.tile').removeClass('black');
        jQuery('.tile').removeClass('white');

        jQuery('#cell-3-3 .tile').addClass('white');
        jQuery('#cell-3-4 .tile').addClass('black');
        jQuery('#cell-4-3 .tile').addClass('black');
        jQuery('#cell-4-4 .tile').addClass('white');

        $black_turn = true;
        $white_turn = false;

        jQuery('.tiles-stock-white').removeClass('pulse');
        jQuery('.tiles-stock-black').addClass('pulse');

        updateScore();
        start_timer();
        update_playable_tiles();
        //swal("Nouvelle partie")
    }

    function updateScore () {

        // nombre de cases blanches
        $nb_white = jQuery('.tile.white').length;
        // nombre de cases noirs
        $nb_black = jQuery('.tile.black').length;

        jQuery('.score .black').text($nb_black);
        jQuery('.score .white').text($nb_white);
        jQuery('.score .white').css('width', $nb_white/($nb_white + $nb_black) * 100 + '%');
        jQuery('.score .black').css('width', $nb_black/($nb_white + $nb_black) * 100 + '%');
    }

    startGame();

    function flip_tiles_top_bottom () {

        search_row = rowPlayed + 1;

        if ($white_turn) {
            // la piece jouée était noir         
            while (search_row < 8) {
                // vide ou joubale
                if (tile_type(search_row, colPlayed) == 0 || tile_type(search_row, colPlayed) == 3) {
                    return;
                }
                // blanche
                if (tile_type(search_row, colPlayed) == 1) {
                    search_row++;
                }
                // noir
                if (tile_type(search_row, colPlayed) == 2) {
                   
                    for (i  = rowPlayed + 1; i < search_row; i++) {
                        flip(i, colPlayed);
                    }
                    return;
                }
                search_row++;
            }

        } else {
            // la piece jouée était blanche
            while (search_row < 8) {
                // vide ou joubale
                if (tile_type(search_row, colPlayed) == 0 || tile_type(search_row, colPlayed) == 3) {
                    return;
                }
                // noir
                if (tile_type(search_row, colPlayed) == 2) {
                    search_row++;
                }
                // blanche
                if (tile_type(search_row, colPlayed) == 1) {
                   
                    for (i  = rowPlayed + 1; i < search_row; i++) {
                        flip(i, colPlayed);
                    }
                    return;
                }
                search_row++;
            }
        }
    }

    function flip_tiles_bottom_top () {

        search_row = rowPlayed - 1;

        if ($white_turn) {
            // la piece jouée était noir         
            while (search_row >= 0) {
                // vide ou joubale
                if (tile_type(search_row, colPlayed) == 0 || tile_type(search_row, colPlayed) == 3) {
                    return;
                }
                // blanche
                if (tile_type(search_row, colPlayed) == 1) {
                    search_row--;
                }
                // noir
                if (tile_type(search_row, colPlayed) == 2) {
                   
                    for (i  = rowPlayed - 1; i > search_row; i--) {
                        flip(i, colPlayed);
                    }
                    return;
                }
                search_row--;
            }

        } else {
            // la piece jouée était blanche
            while (search_row >= 0) {
                // vide ou joubale
                if (tile_type(search_row, colPlayed) == 0 || tile_type(search_row, colPlayed) == 3) {
                    return;
                }
                // noir
                if (tile_type(search_row, colPlayed) == 2) {
                    search_row--;
                }
                // blanche
                if (tile_type(search_row, colPlayed) == 1) {
                   
                    for (i  = rowPlayed - 1; i > search_row; i--) {
                        flip(i, colPlayed);
                    }
                    return;
                }
                search_row--;
            }
        }
    }

    function flip_tiles_left_right () {

        search_col = colPlayed + 1;

        if ($white_turn) {
            // la piece jouée était noir         
            while (search_col < 8) {
                // vide ou joubale
                if (tile_type(rowPlayed, search_col) == 0 || tile_type(rowPlayed, search_col) == 3) {
                    return;
                }
                // blanche
                if (tile_type(rowPlayed, search_col) == 1) {
                    search_col++;
                }
                // noir
                if (tile_type(rowPlayed, search_col) == 2) {
                   
                    for (j  = colPlayed + 1; j < search_col; j++) {
                        flip(rowPlayed, j);
                    }
                    return;
                }
                search_col++;
            }

        } else {
            // la piece jouée était blanche
            while (search_col < 8) {
                // vide ou joubale
                if (tile_type(rowPlayed, search_col) == 0 || tile_type(rowPlayed, search_col) == 3) {
                    return;
                }
                // noir
                if (tile_type(rowPlayed, search_col) == 2) {
                    search_col++;
                }
                // blanche
                if (tile_type(rowPlayed, search_col) == 1) {
                   
                    for (j  = colPlayed + 1; j < search_col; j++) {
                        flip(rowPlayed, j);
                    }
                    return;
                }
                search_col++;
            }
        }
    }

    function flip_tiles_right_left () {

        search_col = colPlayed - 1;

        if ($white_turn) {
            // la piece jouée était noir         
            while (search_col >= 0) {
                // vide ou joubale
                if (tile_type(rowPlayed, search_col) == 0 || tile_type(rowPlayed, search_col) == 3) {
                    return;
                }
                // blanche
                if (tile_type(rowPlayed, search_col) == 1) {
                    search_col--;
                }
                // noir
                if (tile_type(rowPlayed, search_col) == 2) {
                   
                    for (j  = colPlayed - 1; j > search_col; j--) {
                        flip(rowPlayed, j);
                    }
                    return;
                }
                search_col--;
            }

        } else {
            // la piece jouée était blanche
            while (search_col >= 0) {
                // vide ou joubale
                if (tile_type(rowPlayed, search_col) == 0 || tile_type(rowPlayed, search_col) == 3) {
                    return;
                }
                // noir
                if (tile_type(rowPlayed, search_col) == 2) {
                    search_col--;
                }
                // blanche
                if (tile_type(rowPlayed, search_col) == 1) {
                   
                    for (j  = colPlayed - 1; j > search_col; j--) {
                        flip(rowPlayed, j);
                    }
                    return;
                }
                search_col--;
            }
        }
    }

    function flip_diag_top_bottom_left_right() {
        search_col = colPlayed + 1;
        search_row = rowPlayed + 1;

        if ($white_turn) {
            
            // la piece jouée était noir         
            while (search_col < 8 && search_row < 8) {
                // vide ou joubale
                if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                    return;
                }
                // blanche
                if (tile_type(search_row, search_col) == 1) {
                    search_col++;
                    search_row++;
                }
                // noir
                if (tile_type(search_row, search_col) == 2) {

                    for (j  = colPlayed + 1; j < search_col; j++) {
                        flip(rowPlayed + 1, j);
                        rowPlayed++;
                    }
                    return;
                }
                search_col++;
                search_row++;
            }

        } else {
            // la piece jouée était blanche         
            while (search_col < 8 && search_row < 8) {
                // vide ou joubale
                if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                    return;
                }
                // noir
                if (tile_type(search_row, search_col) == 2) {
                    search_col++;
                    search_row++;
                }
                // blanche
                if (tile_type(search_row, search_col) == 1) {

                    for (j  = colPlayed + 1; j < search_col; j++) {
                        flip(rowPlayed + 1, j);
                        rowPlayed++;
                    }
                    return;
                }
                search_col++;
                search_row++;
            }
        }
    }

    function flip_diag_bottom_top_right_left() {
        search_col = colPlayed - 1;
        search_row = rowPlayed - 1;

        if ($white_turn) {
            
            // la piece jouée était noir         
            while (search_col >= 0 && search_row >= 0) {
                // vide ou joubale
                if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                    return;
                }
                // blanche
                if (tile_type(search_row, search_col) == 1) {
                    search_col--;
                    search_row--;
                }
                // noir
                if (tile_type(search_row, search_col) == 2) {

                    for (j  = colPlayed - 1; j > search_col; j--) {
                        flip(rowPlayed - 1, j);
                        rowPlayed--;
                    }
                    return;
                }
                search_col--;
                search_row--;
            }

        } else {
            // la piece jouée était blanche         
            while (search_col >= 0 && search_row >= 0) {
                // vide ou joubale
                if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                    return;
                }
                // noir
                if (tile_type(search_row, search_col) == 2) {
                    search_col--;
                    search_row--;
                }
                // blanche
                if (tile_type(search_row, search_col) == 1) {

                    for (j  = colPlayed - 1; j > search_col; j--) {
                        flip(rowPlayed - 1, j);
                        rowPlayed--;
                    }
                    return;
                }
                search_col--;
                search_row--;
            }
        }
    }

    function flip_diag_top_bottom_right_left() {
        search_col = colPlayed - 1;
        search_row = rowPlayed + 1;

        if ($white_turn) {
            
            // la piece jouée était noir         
            while (search_col >= 0 && search_row < 8) {
                // vide ou joubale
                if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                    return;
                }
                // blanche
                if (tile_type(search_row, search_col) == 1) {
                    search_col--;
                    search_row++;
                }
                // noir
                if (tile_type(search_row, search_col) == 2) {

                    for (j  = colPlayed - 1; j > search_col; j--) {
                        flip(rowPlayed + 1, j);
                        rowPlayed++;
                    }
                    return;
                }
                search_col--;
                search_row++;
            }

        } else {
            // la piece jouée était blanche         
            while (search_col >= 0 && search_row < 8) {
                // vide ou joubale
                if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                    return;
                }
                // noir
                if (tile_type(search_row, search_col) == 2) {
                    search_col--;
                    search_row++;
                }
                // blanche
                if (tile_type(search_row, search_col) == 1) {

                    for (j  = colPlayed - 1; j > search_col; j--) {
                        flip(rowPlayed + 1, j);
                        rowPlayed++;
                    }
                    return;
                }
                search_col--;
                search_row++;
            }
        }
    }

    function flip_diag_bottom_top_left_right() {
        search_col = colPlayed + 1;
        search_row = rowPlayed - 1;

        if ($white_turn) {
            
            // la piece jouée était noir         
            while (search_col < 8 && search_row >= 0) {
                // vide ou joubale
                if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                    return;
                }
                // blanche
                if (tile_type(search_row, search_col) == 1) {
                    search_col++;
                    search_row--;
                }
                // noir
                if (tile_type(search_row, search_col) == 2) {

                    for (j  = colPlayed + 1; j < search_col; j++) {
                        flip(rowPlayed - 1, j);
                        rowPlayed--;
                    }
                    return;
                }
                search_col++;
                search_row--;
            }

        } else {
            // la piece jouée était blanche         
            while (search_col < 8 && search_row >= 0) {
                // vide ou joubale
                if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                    return;
                }
                // noir
                if (tile_type(search_row, search_col) == 2) {
                    search_col++;
                    search_row--;
                }
                // blanche
                if (tile_type(search_row, search_col) == 1) {

                    for (j  = colPlayed + 1; j < search_col; j++) {
                        flip(rowPlayed - 1, j);
                        rowPlayed--;
                    }
                    return;
                }
                search_col++;
                search_row--;
            }
        }
    }

    function flip_tiles() {
        flip_tiles_top_bottom();
        flip_tiles_bottom_top();
        flip_tiles_left_right();
        flip_tiles_right_left();

        // flip diag
        flip_diag_top_bottom_left_right();
        flip_diag_bottom_top_right_left();
        flip_diag_top_bottom_right_left();
        flip_diag_bottom_top_left_right();
    }

    function play_sound(name) {
        var obj = document.createElement("audio");
        obj.src = "sounds/"+name+".wav"; 
        obj.play(); 
    }
    
    jQuery(document).on("click", "#othello .playable" , function() {

        rowPlayed = parseInt(jQuery(this).parent().attr('id').split('-')[1]);
        colPlayed = parseInt(jQuery(this).parent().attr('id').split('-')[2]);

        if ($black_turn && !$white_turn) {

            play_sound('player1');

            jQuery(this).unbind("click");
            jQuery(this).removeClass('playable');
            jQuery(this).addClass('black');
            jQuery('.tiles-stock-black .tile-stock').first().remove();

            $black_turn = false;
            $white_turn = true;
            jQuery('.tiles-stock-white').addClass('pulse');
            jQuery('.tiles-stock-black').removeClass('pulse');

            flip_tiles();
            updateScore();
            update_playable_tiles();
            clearTimeout(timer_timeout);
            start_timer();

        } else if (!$black_turn && $white_turn) {

            play_sound('player2');

            jQuery(this).unbind("click");
            jQuery(this).removeClass('playable');
            jQuery(this).addClass('white');
            jQuery('.tiles-stock-white .tile-stock').first().remove();
            
            $black_turn = true;
            $white_turn = false;
            jQuery('.tiles-stock-white').removeClass('pulse');
            jQuery('.tiles-stock-black').addClass('pulse');

            flip_tiles();
            updateScore();
            update_playable_tiles();
            clearTimeout(timer_timeout);
            start_timer();

        } else {
            alert('Error');
        }
        

    });

});