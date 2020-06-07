
// cette fonction pour évaluer un mouvement.
function evaluate3(board) {
    //let eval = evaluation_simple();
    mine,opp;
    if ($white_turn) {
        mine = 1;
        opp = 2;
    } else {
        mine = 2; 
        opp = 1;
    }
    // il faut vérifier ça pour les roles (à fait dés le lancement de la partie)
    let evaluation = dynamic_heuristic_evaluation_function(board, 2, 1);
    
    return evaluation;
}

// c'est cette fonction qui va retrouner le mouvement à faire au lieu de random 
function bestMove3(depth) {
    let bestScore = Number.NEGATIVE_INFINITY;
    let move;
    let playables = getPlayableCells();

    var i;
    if (playables.length != 0) {
        //console.log("playables : ", playables);
        for (i = 0; i < playables.length; i++) {
            //for(mouvement in playables) {
            // pour chaque mouvement possible on joue et on appel alphabeta
            mouvement = playables[i];
            //console.log("length :",playables.length);
            //console.log("i : ", i);
            play(mouvement);
            // appeler alphabeta recursivement : en passant les cells playables
            let board = getBoardState();
            //console.warn("depth bestMove: ", depth);
            let score = alphabeta2(board, depth - 1, true);
            //console.log("Le score est :", score)
            // unplay pour revenir à l'état précédent 
            unplay();
            //console.log("i after : ",i)
            // bestScore = Math.max(score, bestScore); 
            if (score > bestScore) {
                bestScore = score;
                move = mouvement;
            }
        };
    }
    // à la fin de traitment on joue le meilleur coup possible 
    // retourner le move et on continue le traitement dans la fonction principale 
    return move;
}

// est ce que je passe la liste des playables ou toutes le terrain 
// ça dépende de la fonction d'évaluation. 


function alphaBeta2(board, depth, is_max_player, alpha, beta) {
    // normalement je vérifie si il y a encore des mouvement ou pas 
    // si je suis dans une feuille (leaf) ou il y a plus de mouvement possible
    plays = getPlayableCells();
    if (depth < 1 || plays.length === 0) {
        return evaluate(board);
        // retourner l'évaluation normalment 
    }

    if (is_max_player) {
        // maximizing player 
        bestScore = Number.NEGATIVE_INFINITY;
        var playablesMax = getPlayableCells();
        //console.log("playables max",playablesMax)
        var j;
        for (j = 0; j < playablesMax.length; j++) {
            var mouvMax = playablesMax[j];
            play(mouvMax);
            let terrain = getBoardState();
            //console.log("terrain :",terrain);
            console.warn("depth max: ", depth)
            var score = alphaBeta2(terrain, depth - 1, false, alpha, beta);
            unplay();
            bestScore = Math.max(score, bestScore, alpha, beta);
        };
        return bestScore;
    } else {
        // minimizing player 
        bestScore = Number.POSITIVE_INFINITY;
        var playablesMin = getPlayableCells();
        var k;
        //console.log("playables min",playablesMin);
        for (k = 0; k < playablesMin.length; k++) {
            var mouvMin = playablesMin[k];
            play(mouvMin);
            let terrain = getBoardState();
            console.warn('depth min: ', depth);
            var score = alphaBeta2(terrain, depth - 1, true);
            unplay();
            bestScore = Math.min(score, bestScore, alpha, beta);
        };
        return bestScore;
    }
}