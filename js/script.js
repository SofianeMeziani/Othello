document.addEventListener("DOMContentLoaded", function(){

    // global variables

    var $black_turn = true;
    var $white_turn = false;

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

    function update_playable_tiles () {
        // parser dans toutes les directions
       
        // parse de haut en bas 
        parse_top_bottom();
        
        // parse bas haut
        parse_bottom_top();
        // parse gauche droite
        // parse droite gauche
        // parse diag haut bas gauche droite
        // parse diag haut bas droite gauche
        // parse diag bas haut gauche droite
        // parse diag bas haut droite gauche
    }

    jQuery('#flip').click(function() {
        jQuery('#cell-3-3 > div').css('transform', 'rotate(-90deg) scaleX(-1)');
        setTimeout(function() {
            jQuery('#cell-3-3 > div').css('transform', 'rotate(0deg) scaleX(1)');
        }, 100);

        // changer la couleur

        if (jQuery('#cell-3-3 > div').hasClass('white')) {
            jQuery('#cell-3-3 > div').removeClass('white');
            jQuery('#cell-3-3 > div').addClass('black');
        } else if (jQuery('#cell-3-3 > div').hasClass('black')) {
            jQuery('#cell-3-3 > div').removeClass('black');
            jQuery('#cell-3-3 > div').addClass('white');
        }

        updateScore();

    });

    function startGame() {
        jQuery('.tile').removeClass('black');
        jQuery('.tile').removeClass('white');

        jQuery('#cell-3-3 .tile').addClass('white');
        jQuery('#cell-3-4 .tile').addClass('black');
        jQuery('#cell-4-3 .tile').addClass('black');
        jQuery('#cell-4-4 .tile').addClass('white');

        // Définir les cases jouables
        //jQuery('#cell-2-3 .tile').addClass('playable');
        //jQuery('#cell-3-2 .tile').addClass('playable');
        //jQuery('#cell-4-5 .tile').addClass('playable');
        //jQuery('#cell-5-4 .tile').addClass('playable');

        $black_turn = true;
        $white_turn = false;

        updateScore();
        update_playable_tiles();
        //swal("Nouvelle partie")
    }

    function updateScore () {

        // nombre de cases blanches
        $nb_white = jQuery('.tile.white').length;
        // nombre de cases noirs
        $nb_black = jQuery('.tile.black').length;

        jQuery('.score .white').css('width', $nb_white/($nb_white + $nb_black) * 100 + '%');
        jQuery('.score .black').css('width', $nb_black/($nb_white + $nb_black) * 100 + '%');
    }

    startGame();

    jQuery('#restart').click(function() {
        startGame();
    });

    jQuery(document).on("click", "#othello .playable" , function() {

        if ($black_turn && !$white_turn) {

            jQuery(this).unbind("click");
            jQuery(this).removeClass('playable');
            jQuery(this).addClass('black');
            jQuery('.tiles-stock-black .tile-stock').first().remove();

            $black_turn = false;
            $white_turn = true;
            updateScore();
            update_playable_tiles();

        } else if (!$black_turn && $white_turn) {

            jQuery(this).unbind("click");
            jQuery(this).removeClass('playable');
            jQuery(this).addClass('white');
            jQuery('.tiles-stock-white .tile-stock').first().remove();
            
            $black_turn = true;
            $white_turn = false;
            updateScore();
            update_playable_tiles();

        } else {
            alert('Error');
        }
        

    });

});