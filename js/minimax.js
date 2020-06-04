var count = 0;

function minimax(level) {

    /*minimax_timeout = setTimeout(function () {
        jQuery('.playable').random().click();
    }, 1000);*/
    // ici au lieu d'utiliser random utiliser bestMove
    minimax_timeout = setTimeout(function () {
        let mo = bestMove(level);
        console.error("Mouvement à faire est : ", mo); 
        play(mo);
    }, 1000);
}

// Retourner l'état de terrain de jeu  :
function getBoardState() {
    let terrain = [];
    for (i = 0; i < 8; i++) {
        let row;
        for (j = 0; j < 8; j++) {
            row = []; // vider la ligne 
            switch (tile_type(i, j)) {
                case 0:
                    row[j] = 0; // vide
                case 1:
                    row[j] = 1; // white 
                case 2:
                    row[j] = 2; // black
                case 3:
                    row[j] = 3; // playable 
            }

        }
        terrain.push(row);
    }
    return terrain;
}

// retourner les mouvements possibles : 
function getPlayableCells() {
    let playable = [];
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            // si la cellule est playable alors l'ajouter à la liste de ce niveau 
            if (tile_type(i, j) == 3) {
                playable.push(new Move(i, j));
            }
        }
    }
    return playable;
}

// cette fonction pour évaluer un mouvement.
function evaluate(board) {
    

    let eval = evaluation_simple(1, 2);
    //let eval = dynamic_heuristic_evaluation_function(board);
    //console.log('evaluation ', eval);    
        return eval;
}

// c'est cette fonction qui va retrouner le mouvement à faire au lieu de random 
function bestMove(depth) {
    let bestScore = Number.NEGATIVE_INFINITY;
    let move;
    let playables = getPlayableCells();
    
    var i;
    if(playables.length!=0){
        console.log("playables : ", playables);
    for (i = 0; i < playables.length; i++) {
        //for(mouvement in playables) {
        // pour chaque mouvement possible on joue et on appel minimax
        mouvement=playables[i];
        console.log("length :",playables.length);
        console.log("i : ", i);
        play(mouvement);
        // appeler minimax recursivement : en passant les cells playables
        let board = getBoardState();
        //console.warn("depth bestMove: ", depth);
        let score = minimax2(board, depth-1, $white_turn);
        //console.log("Le score est :", score)
        // unplay pour revenir à l'état précédent 
        unplay();
        console.log("i after : ",i)
        // bestScore = Math.max(score, bestScore); 
        if (score >= bestScore) {
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

function minimax2(board, depth, is_max_player) {
    // normalement je vérifie si il y a encore des mouvement ou pas 
    // si je suis dans une feuille (leaf) ou il y a plus de mouvement possible
    plays = getPlayableCells();
    if (depth < 1 || plays.length === 0 ) { 
        return evaluate(board);
        // retourner l'évaluation normalment 
    }

    if (is_max_player) {
        // maximizing player 
         bestScore = Number.NEGATIVE_INFINITY;
        var playablesMax = getPlayableCells();
        console.log("playables max",playablesMax)
        var j;
        for (j = 0; j < playablesMax.length; j++) {
            var mouvMax = playablesMax[j];
            play(mouvMax);
            let terrain = getBoardState();
            console.log("terrain :",terrain);
            console.warn("depth max: ", depth)
            let score = minimax2(terrain, depth - 1, false);
            unplay();
            bestScore = Math.max(score, bestScore);
        };
        return bestScore;
    } else {
        // minimizing player 
         bestScore = Number.POSITIVE_INFINITY;
        var playablesMin = getPlayableCells();
        var k;
        console.log("playables min",playablesMin);
        for (k = 0; k < playablesMin.length; k++) {
            var mouvMin = playablesMin[k];
            play(mouvMin);
            let terrain = getBoardState();
            console.warn('depth min: ', depth); 
            let score = minimax2(terrain, depth - 1, true);
            unplay();
            bestScore = Math.min(score, bestScore);
        };
        return bestScore;
    }
}