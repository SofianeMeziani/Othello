document.addEventListener("DOMContentLoaded", function () {

    // Séléctionner un élément aléatoire à partir d'un sélécteur
    jQuery.fn.random = function () {
        return this.eq(Math.floor(Math.random() * this.length));
    }

    function play(move) {
        jQuery('#cell-' + move.row + '-' + move.col + ' > div').click();
    }

    function unplay() {
        // si elle était blanche
        move = $last_move;
        jQuery('#cell-' + move.row + '-' + move.col + ' > div').removeClass('white');
        // si elle était noir
        jQuery('#cell-' + move.row + '-' + move.col + ' > div').removeClass('black');

        // dé-jouer les derniers mouvements (lastmoves)

        $last_moves.forEach(function(move) {
            flip(move.row, move.col);
            $last_moves.pop();
        });

        $last_moves = [];

        updateScore();
        update_playable_tiles();
        swap_turns();
        clearTimeout(timer_timeout);
        clearTimeout(minimax_timeout);
        clearTimeout(negamax_timeout);
        clearTimeout(alphabeta_timeout);
        start_timer();
    }

    jQuery(document).on("click", ".refresh", function () {
        location.reload();
    });

    jQuery(document).on("click", "#othello .playable", function () {

        rowPlayed = parseInt(jQuery(this).parent().attr('id').split('-')[1]);
        colPlayed = parseInt(jQuery(this).parent().attr('id').split('-')[2]);

        $last_move = new Move(rowPlayed, colPlayed);

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

            jQuery('.score .white').addClass('pulse');
            jQuery('.score .black').removeClass('pulse');

            flip_tiles();
            updateScore();
            update_playable_tiles();
            clearTimeout(timer_timeout);
            start_timer();

            // CECI EST UN TEST
            if (bot2) {
                bot();
            }

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

            jQuery('.score .white').removeClass('pulse');
            jQuery('.score .black').addClass('pulse');

            flip_tiles();
            updateScore();
            update_playable_tiles();
            clearTimeout(timer_timeout);
            start_timer();

            // CECI EST UN TEST
            if (bot1) {
                bot();
            }

        } else {
            alert('Error');
        }


    });

});