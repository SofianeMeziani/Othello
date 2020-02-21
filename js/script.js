document.addEventListener("DOMContentLoaded", function(){

    function startGame() {
        jQuery('.tile').removeClass('black');
        jQuery('.tile').removeClass('white');

        jQuery('#cell-3-3 .tile').addClass('white');
        jQuery('#cell-3-4 .tile').addClass('black');
        jQuery('#cell-4-3 .tile').addClass('black');
        jQuery('#cell-4-4 .tile').addClass('white');

        // Définir les cases jouables
        jQuery('#cell-2-3 .tile').addClass('playable');
        jQuery('#cell-3-2 .tile').addClass('playable');
        jQuery('#cell-4-5 .tile').addClass('playable');
        jQuery('#cell-5-4 .tile').addClass('playable');

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

    function change_color() {
        if (jQuery('#cell-3-3 > div').hasClass('white')) {
            jQuery('#cell-3-3 > div').removeClass('white');
            jQuery('#cell-3-3 > div').addClass('black');
        } else if (jQuery('#cell-3-3 > div').hasClass('black')) {
            jQuery('#cell-3-3 > div').removeClass('black');
            jQuery('#cell-3-3 > div').addClass('white');
        }
    }

    jQuery('#flip').click(function() {

        jQuery('#cell-3-3 > div').css('transform', 'rotate(-90deg) scaleX(-1)');
        setTimeout(function() {
            jQuery('#cell-3-3 > div').css('transform', 'rotate(0deg) scaleX(1)');
        }, 100);

        change_color();
    });

    jQuery('#othello .playable').click(function() {

        if ($black_turn && !$white_turn) {

            jQuery(this).unbind("click");
            jQuery(this).removeClass('playable');
            jQuery(this).addClass('black');
            jQuery('.tiles-stock-black .tile-stock').first().remove();

            $black_turn = false;
            $white_turn = true;
            updateScore();

        } else if (!$black_turn && $white_turn) {

            jQuery(this).unbind("click");
            jQuery(this).removeClass('playable');
            jQuery(this).addClass('white');
            jQuery('.tiles-stock-white .tile-stock').first().remove();
            
            $black_turn = true;
            $white_turn = false;
            updateScore();

        } else {
            alert('Error');
        }
        

    });

});