function init_parsing_variables() {
    seq_begin_white = -1;
    seq_end_white = -1;
    seq_begin_black = -1;
    seq_end_black = -1;
}

function parse_top_bottom() {
    row = 0;
    col = 0;

    init_parsing_variables();

    while (col < 8) {
        while (row < 8) {

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

                    if (($white_turn && (seq_end_white < seq_end_black)) || ($black_turn && (seq_end_black < seq_end_white))) {
                        set_playable(row, col);
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

function parse_bottom_top() {
    row = 7;
    col = 7;

    init_parsing_variables();

    while (col >= 0) {
        while (row >= 0) {

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

                    if (($white_turn && (seq_end_white > seq_end_black)) || ($black_turn && (seq_end_black > seq_end_white))) {
                        set_playable(row, col);
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

    while (row < 8) {
        while (col < 8) {

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

                    if (($white_turn && (seq_end_white < seq_end_black)) || ($black_turn && (seq_end_black < seq_end_white))) {
                        set_playable(row, col);
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

function parse_right_left() {
    row = 7;
    col = 7;

    init_parsing_variables();

    while (row >= 0) {
        while (col >= 0) {

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

                    if (($white_turn && (seq_end_white > seq_end_black)) || ($black_turn && (seq_end_black > seq_end_white))) {
                        set_playable(row, col);
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

function parse_diag_top_bottom_left_right() {

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

                    if (($white_turn && (seq_end_white < seq_end_black)) || ($black_turn && (seq_end_black < seq_end_white))) {
                        set_playable(parse_row, col);
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

                    if (($white_turn && (seq_end_white < seq_end_black)) || ($black_turn && (seq_end_black < seq_end_white))) {
                        set_playable(row, parse_col);
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

function parse_diag_bottom_top_right_left() {

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

                    if (($white_turn && (seq_end_white > seq_end_black)) || ($black_turn && (seq_end_black > seq_end_white))) {

                        set_playable(row, parse_col);
                    }
                }
                row--;
                parse_col--;
                init_parsing_variables();
            }

        }

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

                    if (($white_turn && (seq_end_white > seq_end_black)) || ($black_turn && (seq_end_black > seq_end_white))) {

                        set_playable(parse_row, col);
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

function parse_diag_top_bottom_right_left() {

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

                    if (($white_turn && (seq_end_white < seq_end_black)) || ($black_turn && (seq_end_black < seq_end_white))) {
                        set_playable(col, (7 - parse_row));
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

                    if (($white_turn && (seq_end_white < seq_end_black)) || ($black_turn && (seq_end_black < seq_end_white))) {
                        set_playable(parse_col, (7 - row));
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

function parse_diag_bottom_top_left_right() {

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

                    if (($white_turn && (seq_end_white > seq_end_black)) || ($black_turn && (seq_end_black > seq_end_white))) {

                        set_playable(row, (7 - parse_col));
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
            if (tile_type(parse_row, (7 - col)) == 1) {

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
            if (tile_type(parse_row, (7 - col)) == 2) {

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
            if (tile_type(parse_row, (7 - col)) == 3) {
                parse_row--;
                col--;
                init_parsing_variables();
            }

            // empty
            if (tile_type(parse_row, (7 - col)) == 0) {

                if (seq_begin_white != -1 && seq_end_white != -1 && seq_begin_black != -1 && seq_end_black != -1) {


                    if (($white_turn && (seq_end_white > seq_end_black)) || ($black_turn && (seq_end_black > seq_end_white))) {

                        set_playable(parse_row, (7 - col));
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