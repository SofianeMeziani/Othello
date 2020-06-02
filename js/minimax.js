function minimax(level) {
    minimax_timeout = setTimeout(function () {
        jQuery('.playable').random().click();
    }, 1000);
}

function getPlayableCells(){
    available: Array<any> new List(); 
    for (i =0; i<8;i++ ){
        for(j=0; j<8;j++){

            // 
            if(tile_type(i,j)==3){
                // available.add(Cell(i,j)); 
            }
            
        }
    }
    return available;
}

// Pour générer l'arbre des possibilité de chaque cas : 
function createTree(){
    // Pour créer la liste des possibilité il faut comme parametres: 
    // 1* L'état de terrain de jeu courante. 
    // 2* Le joueur qui va joué (MAX ou MIN) 
    // 3* 
}


/* Pseudo code de la function minimax */ 
// node est la liste des possibilités à partir de chaque mouvement (je suppose elle est généré par createTree)

function minimax (node, depth, max_player)
{
    // si je suis dans une feuille (leaf)
    if(depth==0 || !('children' in node))
    {return node.value}
    var best_value, v;
    if(max_player) {
        // maximizing player 
        best_value = Number.NEGATIVE_INFINITY;

        for (var child in node.children){
            v = minimax(node.children[child], depth-1, false);
            best_value = Math.max(v, best_value);
        }
        return best_value; 
    } else {
        // minimizing player 
        best_value = Number.POSITIVE_INFINITY;
        for (var child in node.children){
            v = minimax(node.children[child], depth-1, true);
            best_value = Math.max(v, best_value);
        }
        return best_value;
    }
}
