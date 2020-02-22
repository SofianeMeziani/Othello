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