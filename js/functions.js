// global variables

var $black_turn = true;
var $white_turn = false;
var rowPlayed;
var colPlayed;
var game_over = false;

var bot1 = false;
var bot2 = false;
var bot1_type = null;
var bot2_type = null;
var bot1_level = null;
var bot2_level = null;

var $history_moves = [];
var $last_moves = [];
var $last_move = null;

$unplay_possible = false;

class Move {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

class CompleteMove {
    constructor(last_move, last_moves, black_turn) {
        this.last_move = last_move;
        this.last_moves = last_moves;
        this.black_turn = black_turn;
    }
}

// 0 => empty // 1 => white // 2 => black // 3 => playable
function tile_type(i, j) {
    if (jQuery('#cell-' + i + '-' + j + ' > div').hasClass('white')) {
        return 1;
    } else if (jQuery('#cell-' + i + '-' + j + ' > div').hasClass('black')) {
        return 2;
    } else if (jQuery('#cell-' + i + '-' + j + ' > div').hasClass('playable')) {
        return 3;
    } else {
        return 0;
    }
}

function set_playable(row, col) {
    jQuery('#cell-' + row + '-' + col + ' > div').addClass('playable')
}

function updateScore() {

    // nombre de cases blanches
    $nb_white = jQuery('.tile.white').length;
    // nombre de cases noirs
    $nb_black = jQuery('.tile.black').length;

    jQuery('.score-black').text($nb_black);
    jQuery('.score-white').text($nb_white);

    jQuery('.score .white').css('width', $nb_white / ($nb_white + $nb_black) * 100 + '%');
    jQuery('.score .black').css('width', $nb_black / ($nb_white + $nb_black) * 100 + '%');
}

function update_playable_tiles() {
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
        setTimeout(function () {
            if (jQuery('.playable').length == 0) {
                end_game();
            }
        }, 1000);
    }
}

function clear_playable_tiles() {
    jQuery('.playable').removeClass('playable');
}

function end_game() {
    game_over = true;
    play_sound('game_over');

    jQuery('.tiles-stock-white').removeClass('pulse');
    jQuery('.tiles-stock-black').removeClass('pulse');

    jQuery('.score .white').removeClass('pulse');
    jQuery('.score .black').removeClass('pulse');

    var el = document.getElementById('bar');
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
    el.style.animation = null;

    clearTimeout(timer_timeout);
    stop_chronometer();

    Swal.fire(
        "Partie terminée !",
        "Résultat : " + jQuery('.score .black').text() + " : " + jQuery('.tile.black').length + " - " + jQuery('.score .white').text() + ' : ' + jQuery('.tile.white').length,
        "success"
    );
}

function swap_turns() {
    if ($black_turn && !$white_turn) {
        $black_turn = false;
        $white_turn = true;
        jQuery('.tiles-stock-white').addClass('pulse');
        jQuery('.tiles-stock-black').removeClass('pulse');

        jQuery('.score .white').addClass('pulse');
        jQuery('.score .black').removeClass('pulse');

        if (bot2) {
            bot();
        }

    } else {
        $black_turn = true;
        $white_turn = false;
        jQuery('.tiles-stock-white').removeClass('pulse');
        jQuery('.tiles-stock-black').addClass('pulse');

        jQuery('.score .white').removeClass('pulse');
        jQuery('.score .black').addClass('pulse');

        if (bot1) {
            bot();
        }
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


        timer_timeout = setTimeout(function () {
            // si le joueur n'a pas joué pendant 20 secondes => passer le tour
            //swap_turns();
            //start_timer();
            // si le joueur n'a pas joué pendant 20 secondes => jouer un coup aléatoire 
            jQuery('.playable').random().click();
        }, 20000);
    }

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

    jQuery('.score .white').removeClass('pulse');
    jQuery('.score .black').addClass('pulse');

    updateScore();
    start_timer();
    start_chronometer();
    update_playable_tiles();
    //swal("Nouvelle partie")

    // CECI EST UN TEST
    if (bot1) {
        bot();
    }
}

function bot() {

    if (bot1) {
        switch (bot1_type) {
            case 'Minimax':
                minimax(bot1_level)
                break;
            case 'AlphaBeta':
                alphaBeta(bot1_level)
                break;
            case 'Negamax':
                negamax(bot1_level)
                break;
            default:
                console.log('Algo inconnu');
        }
    } else {
        switch (bot2_type) {
            case 'Minimax':
                minimax(bot2_level)
                break;
            case 'AlphaBeta':
                alphaBeta(bot2_level)
                break;
            case 'Negamax':
                negamax(bot2_level)
                break;
            default:
                console.log('Algo inconnu');
        }
    }

}

document.addEventListener("DOMContentLoaded", function () {
    if (jQuery(window).width() < 800) {
        startGame();
    }
});

