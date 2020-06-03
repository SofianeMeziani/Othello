var count = 0;

function minimax(level) {
    setTimeout(function () {
        jQuery('.playable').random().click();
    }, 1000);
    // ici au lieu d'utiliser random utiliser 
}

// Retourner l'état de terrain de jeu  :
function getBoardState() {
    let terrain;
    for (i = 0; i < 8; i++) {
        let row;
        for (j = 0; j < 8; j++) {
            row = []; // vider la ligne 
            switch (tile_type(i,j)){
            case 0 : row[j] = 0; // vide
            case 1 : row[j] = 1; // white 
            case 2 : row[j] = 2; // black
            case 3 : row[j] = 3; // playable 
            }
            
        }
        terrain.push(row); 
    }
    return terrain;
}

// retourner les mouvements possibles : 
function getPlayableCells() {
    let playable;
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


// est ce que on évalue à partir de la liste des cases qu'on peut joué 
// ou bien à partir de tout le terrain 
function evaluate(playables) {
    // cette fonction pour évaluer un mouvement.

}

// c'est cette fonction qui va retrouner le mouvement à faire au lieu de random 
function bestMove(depth) {
    let bestScore = Number.NEGATIVE_INFINITY;
    let move;
    let playables = getPlayableCells();
    playables.forEach(mouvement => {
        // pour chaque mouvement possible on joue et on appel minimax
        play(mouvement)
        // appeler minimax recursivement : en passant les cells playables
        let plays = getPlayableCells();
        let score = minimax(plays, depth - 1, is_max_player);
        // unplay pour revenir à l'état précédent 
        unplay();
        // bestScore = Math.max(score, bestScore); 
        if (score > bestScore) {
            bestScore = score;
            move = mouvement;
        }
    });
    // à la fin de traitment on joue le meilleur coup possible 
    // retourner le move et on continue le traitement dans la fonction principale 
    return move;
}

// est ce que je passe la liste des playables ou toutes le terrain 
// ça dépende de la fonction d'évaluation. 

function minimax(plays, depth, is_max_player) {
    // normalement je vérifie si il y a encore des mouvement ou pas 
    // si je suis dans une feuille (leaf) ou il y a plus de mouvement possible
    if (depth == 0 || plays!=[]) {
        return evaluate(plays);
        // retourner l'évaluation normalment 
    }

    if (is_max_player) {
        // maximizing player 
        let bestScore = Number.NEGATIVE_INFINITY;
        let playables = getPlayableCells();

        playables.forEach(mouvement => {
            play(mouvement); 
            let plays = getPlayableCells();
            let score = minimax(plays, depth - 1, true);
            unplay(mouvement); 
            bestScore = Math.max(score, bestScore);
        });
        return bestScore;
    } else {
        // minimizing player 
        let bestScore = Number.POSITIVE_INFINITY;
        let playables = getPlayableCells();

        playables.forEach(mouvement => {
            play(mouvement);
            let plays = getPlayableCells(); 
            let score = minimax(plays, depth - 1, false);
            unplay(mouvement); 
            bestScore = Math.min(score, bestScore);
        });
        return bestScore;
    }
}