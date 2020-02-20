document.addEventListener("DOMContentLoaded", function(){

    function startGame() {
        jQuery('.tile').removeClass('black');
        jQuery('.tile').removeClass('white');

        jQuery('#cell-3-3 .tile').addClass('white');
        jQuery('#cell-3-4 .tile').addClass('black');
        jQuery('#cell-4-3 .tile').addClass('black');
        jQuery('#cell-4-4 .tile').addClass('white');

        jQuery('#cell-4-5 .tile').addClass('playable');
        jQuery('#cell-5-5 .tile').addClass('playable');

        $black_turn = true;
        $white_turn = false;

        updateScore();

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

    jQuery('#othello .playable').click(function() {

        if ($black_turn && !$white_turn) {

            jQuery(this).addClass('black');
            $black_turn = false;
            $white_turn = true;
            updateScore();

        } else if (!$black_turn && $white_turn) {

            jQuery(this).addClass('white');
            $black_turn = true;
            $white_turn = false;
            updateScore();

        } else {
            alert('Error');
        }
        

    });

});