/*
 *  isLegalMove() and num_valid_moves() are helper functions to 
 * count the number of valid moves for a given player in a given
 * board configuration
 */
function isLegalMove(row, col) {
    if (tile_type(row, col ) === 3) //|| tile_type(i,j)===0)
        return true;
    return false;
}

function num_valid_moves() {
    var count_valides = 0;
    var i_valides, j_valides;
    for (i_valides = 0; i_valides < 8; i_valides++) {
        for (j_valides = 0; j_valides < 8; j_valides++) {
            if (isLegalMove(i_valides, j_valides)) count_valides++;
        }
    }
    return count_valides;
}

/*
 * Assuming my_color stores your color and opp_color stores opponent's color
 * '-' indicates an empty square on the board
 * 'b' indicates a black tile and 'w' indicates a white tile on the board
 */
function dynamic_heuristic_evaluation_function(grid,my_color,opp_color) {
    var my_tiles = 0;
    var opp_tiles = 0;
    var my_front_tiles = 0;
    var opp_front_tiles = 0;
    var x, y;
    var pieces = 0; 
    var corners = 0;
    var closenes = 0; 
    var frontiers = 0;
    var diff = 0;
    var V = [];

    X1 = [-1, -1, 0, 1, 1, 1, 0, -1];
    Y1 = [0, 1, 1, 1, 0, -1, -1, -1];

    V[0] = [20, -3, 11, 8, 8, 11, -3, 20];
    V[1] = [-3, -7, -4, 1, 1, -4, -7, -3];
    V[2] = [11, -4, 2, 2, 2, 2, -4, 11];
    V[3] = [8, 1, 2, -3, -3, 2, 1, 8];
    V[4] = [8, 1, 2, -3, -3, 2, 1, 8];
    V[5] = [11, -4, 2, 2, 2, 2, -4, 11];
    V[6] = [-3, -7, -4, 1, 1, -4, -7, -3];
    V[7] = [20, -3, 11, 8, 8, 11, -3, 20];

    // Piece difference, frontier disks and disk squares
    for (i = 0; i < 8; i++)
        for (j = 0; j < 8; j++) {
            if (grid[i][j] == my_color) {
                diff += V[i][j];
                my_tiles++;
            } else if (grid[i][j] == opp_color) {
                diff -= V[i][j];
                opp_tiles++;
            }
            if (grid[i][j] != 0) {
                for (k = 0; k < 8; k++) {
                    x = i + X1[k];
                    y = j + Y1[k];
                    if (x >= 0 && x < 8 && y >= 0 && y < 8 && grid[x][y] == 0) {
                        if (grid[i][j] == my_color) my_front_tiles++;
                        else opp_front_tiles++;
                        break;
                    }
                }
            }
        }
    if (my_tiles > opp_tiles)
        pieces = (100.0 * my_tiles) / (my_tiles + opp_tiles);
    else if (my_tiles < opp_tiles)
        pieces = -(100.0 * opp_tiles) / (my_tiles + opp_tiles);
    else pieces = 0;

    if (my_front_tiles > opp_front_tiles)
        frontiers = -(100.0 * my_front_tiles) / (my_front_tiles + opp_front_tiles);
    else if (my_front_tiles < opp_front_tiles)
        frontiers = (100.0 * opp_front_tiles) / (my_front_tiles + opp_front_tiles);
    else frontiers = 0;

    // Corner occupancy
    // Vérifier les celluls des coins. 
    my_tiles = opp_tiles = 0;
    if (grid[0][0] == my_color) my_tiles++;
    else if (grid[0][0] == opp_color) opp_tiles++;
    if (grid[0][7] == my_color) my_tiles++;
    else if (grid[0][7] == opp_color) opp_tiles++;
    if (grid[7][0] == my_color) my_tiles++;
    else if (grid[7][0] == opp_color) opp_tiles++;
    if (grid[7][7] == my_color) my_tiles++;
    else if (grid[7][7] == opp_color) opp_tiles++;
    
    corners = 25 * (my_tiles - opp_tiles);

    // Corner closeness
    // Vérifier les 3 Cellules adjacents à la cellule de coin
    var my_tiles_clo =0;
    var opp_tiles_clo = 0;
    if (grid[0][0] == 0 || grid[0][0] == 3) {
        if (grid[0][1] == my_color) my_tiles_clo++;
        else if (grid[0][1] == opp_color) opp_tiles_clo++;
        if (grid[1][1] == my_color) my_tiles_clo++;
        else if (grid[1][1] == opp_color) opp_tiles_clo++;
        if (grid[1][0] == my_color) my_tiles_clo++;
        else if (grid[1][0] == opp_color) opp_tiles_clo++;
    }
    if (grid[0][7] == 0 || grid[0][7] == 3) {
        if (grid[0][6] == my_color) my_tiles_clo++;
        else if (grid[0][6] == opp_color) opp_tiles_clo++;
        if (grid[1][6] == my_color) my_tiles_clo++;
        else if (grid[1][6] == opp_color) opp_tiles_clo++;
        if (grid[1][7] == my_color) my_tiles_clo++;
        else if (grid[1][7] == opp_color) opp_tiles_clo++;
    }
    if (grid[7][0] == 0 || grid[7][0] == 3) {
        if (grid[7][1] == my_color) my_tiles_clo++;
        else if (grid[7][1] == opp_color) opp_tiles_clo++;
        if (grid[6][1] == my_color) my_tiles_clo++;
        else if (grid[6][1] == opp_color) opp_tiles_clo++;
        if (grid[6][0] == my_color) my_tiles_clo++;
        else if (grid[6][0] == opp_color) opp_tiles_clo++;
    }
    if (grid[7][7] == 0 || grid[7][7] == 3) {
        if (grid[6][7] == my_color) my_tiles_clo++;
        else if (grid[6][7] == opp_color) opp_tiles_clo++;
        if (grid[6][6] == my_color) my_tiles_clo++;
        else if (grid[6][6] == opp_color) opp_tiles_clo++;
        if (grid[7][6] == my_color) my_tiles_clo++;
        else if (grid[7][6] == opp_color) opp_tiles_clo++;
    }
    closenes = -12.5 * (my_tiles_clo - opp_tiles_clo);

    // final weighted score
    score = (10 * pieces) + (801.724 * corners) + (382.026 * closenes) + (74.396 * frontiers) + (10 * diff);
    return score;
}


function count_tiles(player) {
    var count = 0;
    for (i_count_tiles = 0; i_count_tiles < 8; i_count_tiles++) {
        for (j_count_tiles = 0; j_count_tiles < 8; j_count_tiles++) {
            if (tile_type(i_count_tiles, j_count_tiles) === player) {
                count++;
            }
        }
    }
    return count;
}

// fonction evaluation basique : 

function evaluation_simple() {
    my_tiles = count_tiles(1);
    opp_tiles = count_tiles(2);
    if (my_tiles + opp_tiles != 0)
        return 100 * (my_tiles - opp_tiles) / (my_tiles + opp_tiles);
    else
        return 0;
}