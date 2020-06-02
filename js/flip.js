function flip(f_row, f_col) {

    $last_moves.push(new Move(f_row, f_col));

    jQuery('#cell-' + f_row + '-' + f_col + ' > div').css('transform', 'rotate(-90deg) scaleX(-1)');
    setTimeout(function () {
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

function flip_tiles_top_bottom() {

    var search_row = rowPlayed + 1;

    if ($white_turn) {
        // la piece jouée était noir         
        while (search_row < 8) {
            // vide ou joubale
            if (tile_type(search_row, colPlayed) == 0 || tile_type(search_row, colPlayed) == 3) {
                return;
            }

            // noir
            if (tile_type(search_row, colPlayed) == 2) {

                for (i = rowPlayed + 1; i < search_row; i++) {

                    flip(i, colPlayed);
                }
                return;
            }

            // blanche
            if (tile_type(search_row, colPlayed) == 1) {
                search_row++;
            }
        }

    } else {
        // la piece jouée était blanche
        while (search_row < 8) {
            // vide ou joubale
            if (tile_type(search_row, colPlayed) == 0 || tile_type(search_row, colPlayed) == 3) {
                return;
            }

            // blanche
            if (tile_type(search_row, colPlayed) == 1) {

                for (i = rowPlayed + 1; i < search_row; i++) {

                    flip(i, colPlayed);
                }
                return;
            }

            // noir
            if (tile_type(search_row, colPlayed) == 2) {
                search_row++;
            }
        }
    }
}

function flip_tiles_bottom_top() {

    var search_row = rowPlayed - 1;

    if ($white_turn) {
        // la piece jouée était noir         
        while (search_row >= 0) {
            // vide ou joubale
            if (tile_type(search_row, colPlayed) == 0 || tile_type(search_row, colPlayed) == 3) {
                return;
            }

            // noir
            if (tile_type(search_row, colPlayed) == 2) {

                for (i = rowPlayed - 1; i > search_row; i--) {

                    flip(i, colPlayed);
                }
                return;
            }

            // blanche
            if (tile_type(search_row, colPlayed) == 1) {
                search_row--;
            }
        }

    } else {
        // la piece jouée était blanche
        while (search_row >= 0) {
            // vide ou joubale
            if (tile_type(search_row, colPlayed) == 0 || tile_type(search_row, colPlayed) == 3) {
                return;
            }

            // blanche
            if (tile_type(search_row, colPlayed) == 1) {

                for (i = rowPlayed - 1; i > search_row; i--) {

                    flip(i, colPlayed);
                }
                return;
            }

            // noir
            if (tile_type(search_row, colPlayed) == 2) {
                search_row--;
            }
        }
    }
}

function flip_tiles_left_right() {

    var search_col = colPlayed + 1;

    if ($white_turn) {
        // la piece jouée était noir         
        while (search_col < 8) {
            // vide ou joubale
            if (tile_type(rowPlayed, search_col) == 0 || tile_type(rowPlayed, search_col) == 3) {
                return;
            }

            // noir
            if (tile_type(rowPlayed, search_col) == 2) {

                for (j = colPlayed + 1; j < search_col; j++) {

                    flip(rowPlayed, j);
                }
                return;
            }

            // blanche
            if (tile_type(rowPlayed, search_col) == 1) {
                search_col++;
            }
        }

    } else {
        // la piece jouée était blanche
        while (search_col < 8) {
            // vide ou joubale
            if (tile_type(rowPlayed, search_col) == 0 || tile_type(rowPlayed, search_col) == 3) {
                return;
            }

            // blanche
            if (tile_type(rowPlayed, search_col) == 1) {

                for (j = colPlayed + 1; j < search_col; j++) {

                    flip(rowPlayed, j);
                }
                return;
            }

            // noir
            if (tile_type(rowPlayed, search_col) == 2) {
                search_col++;
            }
        }
    }
}

function flip_tiles_right_left() {

    var search_col = colPlayed - 1;

    if ($white_turn) {
        // la piece jouée était noir         
        while (search_col >= 0) {
            // vide ou joubale
            if (tile_type(rowPlayed, search_col) == 0 || tile_type(rowPlayed, search_col) == 3) {
                return;
            }

            // noir
            if (tile_type(rowPlayed, search_col) == 2) {

                for (j = colPlayed - 1; j > search_col; j--) {

                    flip(rowPlayed, j);
                }
                return;
            }

            // blanche
            if (tile_type(rowPlayed, search_col) == 1) {
                search_col--;
            }
        }

    } else {
        // la piece jouée était blanche
        while (search_col >= 0) {
            // vide ou joubale
            if (tile_type(rowPlayed, search_col) == 0 || tile_type(rowPlayed, search_col) == 3) {
                return;
            }

            // blanche
            if (tile_type(rowPlayed, search_col) == 1) {

                for (j = colPlayed - 1; j > search_col; j--) {

                    flip(rowPlayed, j);
                }
                return;
            }

            // noir
            if (tile_type(rowPlayed, search_col) == 2) {
                search_col--;
            }
        }
    }
}

function flip_diag_top_bottom_left_right() {
    var search_col = colPlayed + 1;
    var search_row = rowPlayed + 1;

    if ($white_turn) {

        // la piece jouée était noir         
        while (search_col < 8 && search_row < 8) {
            // vide ou joubale
            if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                return;
            }

            // noir
            if (tile_type(search_row, search_col) == 2) {
                local_rowPlayed = rowPlayed;
                for (j = colPlayed + 1; j < search_col; j++) {

                    flip(local_rowPlayed + 1, j);
                    local_rowPlayed++;
                }
                return;
            }

            // blanche
            if (tile_type(search_row, search_col) == 1) {
                search_col++;
                search_row++;
            }


        }

    } else {
        // la piece jouée était blanche         
        while (search_col < 8 && search_row < 8) {
            // vide ou joubale
            if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                return;
            }

            // blanche
            if (tile_type(search_row, search_col) == 1) {
                local_rowPlayed = rowPlayed;
                for (j = colPlayed + 1; j < search_col; j++) {


                    flip(local_rowPlayed + 1, j);
                    local_rowPlayed++;
                }
                return;
            }

            // noir
            if (tile_type(search_row, search_col) == 2) {
                search_col++;
                search_row++;
            }


        }
    }
}

function flip_diag_bottom_top_right_left() {
    var search_col = colPlayed - 1;
    var search_row = rowPlayed - 1;

    if ($white_turn) {

        // la piece jouée était noir         
        while (search_col >= 0 && search_row >= 0) {

            // vide ou joubale
            if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                return;
            }

            // noir
            if (tile_type(search_row, search_col) == 2) {
                local_rowPlayed = rowPlayed;
                for (j = colPlayed - 1; j > search_col; j--) {

                    flip(local_rowPlayed - 1, j);
                    local_rowPlayed--;
                }
                return;
            }

            // blanche
            if (tile_type(search_row, search_col) == 1) {
                search_col--;
                search_row--;
            }


        }

    } else {
        // la piece jouée était blanche         
        while (search_col >= 0 && search_row >= 0) {

            // vide ou joubale
            if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                return;
            }

            // blanche
            if (tile_type(search_row, search_col) == 1) {
                local_rowPlayed = rowPlayed;
                for (j = colPlayed - 1; j > search_col; j--) {


                    flip(local_rowPlayed - 1, j);
                    local_rowPlayed--;
                }
                return;
            }

            // noir
            if (tile_type(search_row, search_col) == 2) {
                search_col--;
                search_row--;
            }


        }
    }
}

function flip_diag_top_bottom_right_left() {
    var search_col = colPlayed - 1;
    var search_row = rowPlayed + 1;

    if ($white_turn) {

        // la piece jouée était noir         
        while (search_col >= 0 && search_row < 8) {
            // vide ou joubale
            if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                return;
            }

            // noir
            if (tile_type(search_row, search_col) == 2) {
                local_rowPlayed = rowPlayed;
                for (j = colPlayed - 1; j > search_col; j--) {


                    flip(local_rowPlayed + 1, j);
                    local_rowPlayed++;
                }
                return;
            }

            // blanche
            if (tile_type(search_row, search_col) == 1) {
                search_col--;
                search_row++;
            }



        }

    } else {
        // la piece jouée était blanche         
        while (search_col >= 0 && search_row < 8) {
            // vide ou joubale
            if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                return;
            }

            // blanche
            if (tile_type(search_row, search_col) == 1) {
                local_rowPlayed = rowPlayed;
                for (j = colPlayed - 1; j > search_col; j--) {


                    flip(local_rowPlayed + 1, j);
                    local_rowPlayed++;
                }
                return;
            }

            // noir
            if (tile_type(search_row, search_col) == 2) {
                search_col--;
                search_row++;
            }


        }
    }
}

function flip_diag_bottom_top_left_right() {
    var search_col = colPlayed + 1;
    var search_row = rowPlayed - 1;

    if ($white_turn) {

        // la piece jouée était noir         
        while (search_col < 8 && search_row >= 0) {
            // vide ou joubale
            if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                return;
            }

            // noir
            if (tile_type(search_row, search_col) == 2) {
                local_rowPlayed = rowPlayed;
                for (j = colPlayed + 1; j < search_col; j++) {


                    flip(local_rowPlayed - 1, j);
                    local_rowPlayed--;
                }
                return;
            }

            // blanche
            if (tile_type(search_row, search_col) == 1) {
                search_col++;
                search_row--;
            }


        }

    } else {
        // la piece jouée était blanche         
        while (search_col < 8 && search_row >= 0) {
            // vide ou joubale
            if (tile_type(search_row, search_col) == 0 || tile_type(search_row, search_col) == 3) {
                return;
            }

            // blanche
            if (tile_type(search_row, search_col) == 1) {
                local_rowPlayed = rowPlayed;
                for (j = colPlayed + 1; j < search_col; j++) {


                    flip(local_rowPlayed - 1, j);
                    local_rowPlayed--;
                }
                return;
            }

            // noir
            if (tile_type(search_row, search_col) == 2) {
                search_col++;
                search_row--;
            }


        }
    }
}

function flip_tiles() {

    $last_moves = [];

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