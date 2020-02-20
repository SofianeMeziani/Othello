document.addEventListener("DOMContentLoaded", function(){

    function updateScore () {

        // nombre de cases blanches
        $nb_white = jQuery('.tile.white').length;
        // nombre de cases noirs
        $nb_black = jQuery('.tile.black').length;

        jQuery('.score .white').css('width', $nb_white/($nb_white + $nb_black) * 100 + '%');
        jQuery('.score .black').css('width', $nb_black/($nb_white + $nb_black) * 100 + '%');
    }

    $black_turn = true;
    $white_turn = false;

    updateScore();

    jQuery('#othello td').click(function() {

        if ($black_turn && !$white_turn) {

            jQuery(this).find('.tile').addClass('black');
            $black_turn = false;
            $white_turn = true;
            updateScore();

        } else if (!$black_turn && $white_turn) {

            jQuery(this).find('.tile').addClass('white');
            $black_turn = true;
            $white_turn = false;
            updateScore();

        } else {
            alert('Error');
        }
        

    });

});