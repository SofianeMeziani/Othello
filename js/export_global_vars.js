function negamax(level) {
    negamax_timeout = setTimeout(function () {
        jQuery('.playable').random().click();
    }, level * 1200);
}

function alphaBeta(level) {
    alphabeta_timeout = setTimeout(function () {
        jQuery('.playable').random().click();
    }, level * 1200);
}