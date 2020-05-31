document.addEventListener("DOMContentLoaded", function () {

    class Move {
        constructor(row, col) {
            this.row = row;
            this.col = col;
        }
    }

    // Desactiver le clique droit

    /* jQuery(function() {
        jQuery(this).bind("contextmenu", function(e) {
            e.preventDefault();
        });
    }); */

    // Séléctionner un élément aléatoire à partir d'un sélécteur
    jQuery.fn.random = function () {
        return this.eq(Math.floor(Math.random() * this.length));
    }

    if (jQuery(window).width() < 800) {
        startGame();
    }

    jQuery(document).on("click", ".card", async function () {

        if (jQuery(this).hasClass('pvp')) {
            bot1 = false;
            bot2 = false;

            const {
                value: player1
            } = await Swal.fire({
                title: 'Joueur 1',
                input: 'text',
                confirmButtonText: "Suivant",
                inputValidator: (value) => {
                    if (!value) {
                        return 'Veuillez renseigner le nom du joueur 1'
                    }
                }
            })

            if (player1) {
                jQuery('.score .black').text(player1);

                const {
                    value: player2
                } = await Swal.fire({
                    title: 'Joueur 2',
                    input: 'text',
                    confirmButtonText: "Jouer",
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Veuillez renseigner le nom du joueur 2'
                        }
                    }
                })

                if (player2) {
                    jQuery('.score .white').text(player2);

                    jQuery('.pre-game').fadeOut();
                    jQuery('.game').css({
                        opacity: 0,
                        display: 'flex'
                    }).animate({
                        opacity: 1
                    }, 2500);

                    startGame();
                }

            }

        }
        if (jQuery(this).hasClass('pvb')) {
            bot1 = false;
            bot2 = true;

            const {
                value: player1
            } = await Swal.fire({
                title: 'Joueur 1',
                input: 'text',
                confirmButtonText: "Suivant",
                inputValidator: (value) => {
                    if (!value) {
                        return 'Veuillez renseigner le nom du joueur 1'
                    }
                }
            })

            if (player1) {
                jQuery('.score .black').text(player1);

                const {
                    value: algo
                } = await Swal.fire({
                    title: 'Séléctionnez l\'algo',
                    input: 'select',
                    inputOptions: {
                        Minimax: 'Minimax',
                        Negamax: 'Negamax',
                        AlphaBeta: 'AlphaBeta',
                    },
                    confirmButtonText: "Suivant",
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Veuillez renseigner l\'algo'
                        }
                    }
                })

                if (algo) {
                    jQuery('.score .white').text(algo);
                    bot2_type = algo;

                    const {
                        value: level
                    } = await Swal.fire({
                        title: 'Selectionnez le niveau',
                        input: 'select',
                        inputOptions: {
                            1: '1',
                            2: '2',
                            3: '3',
                        },
                        confirmButtonText: "Jouer",
                        inputValidator: (value) => {
                            if (!value) {
                                return 'Veuillez renseigner le niveau'
                            }
                        }
                    })

                    if (level) {

                        bot2_level = level;

                        jQuery('.score .white').text(jQuery('.score .white').text() + ' [' + level + ']');

                        jQuery('.pre-game').fadeOut();
                        jQuery('.game').css({
                            opacity: 0,
                            display: 'flex'
                        }).animate({
                            opacity: 1
                        }, 2500);

                        startGame();
                    }
                }

            }

        }
        if (jQuery(this).hasClass('bvb')) {
            bot1 = true;
            bot2 = true;


            const {
                value: algo1
            } = await Swal.fire({
                title: 'Séléctionnez l\'algo',
                input: 'select',
                inputOptions: {
                    Minimax: 'Minimax',
                    Negamax: 'Negamax',
                    AlphaBeta: 'AlphaBeta',
                },
                confirmButtonText: "Suivant",
                inputValidator: (value) => {
                    if (!value) {
                        return 'Veuillez renseigner l\'algo'
                    }
                }
            })

            if (algo1) {
                bot1_type = algo1;

                jQuery('.score .black').text(algo1);

                const {
                    value: level1
                } = await Swal.fire({
                    title: 'Selectionnez le niveau',
                    input: 'select',
                    inputOptions: {
                        1: '1',
                        2: '2',
                        3: '3',
                    },
                    confirmButtonText: "Suivant",
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Veuillez renseigner le niveau'
                        }
                    }
                })

                if (level1) {
                    bot1_level = level1;
                    jQuery('.score .black').text(jQuery('.score .black').text() + ' [' + level1 + ']');

                    const {
                        value: algo2
                    } = await Swal.fire({
                        title: 'Séléctionnez l\'algo',
                        input: 'select',
                        inputOptions: {
                            Minimax: 'Minimax',
                            Negamax: 'Negamax',
                            AlphaBeta: 'AlphaBeta',
                        },
                        confirmButtonText: "Suivant",
                        inputValidator: (value) => {
                            if (!value) {
                                return 'Veuillez renseigner l\'algo'
                            }
                        }
                    })

                    if (algo2) {
                        bot2_type = algo2;
                        jQuery('.score .white').text(algo2);

                        const {
                            value: level2
                        } = await Swal.fire({
                            title: 'Selectionnez le niveau',
                            input: 'select',
                            inputOptions: {
                                1: '1',
                                2: '2',
                                3: '3',
                            },
                            confirmButtonText: "Jouer",
                            inputValidator: (value) => {
                                if (!value) {
                                    return 'Veuillez renseigner le niveau'
                                }
                            }
                        })

                        if (level2) {
                            bot2_level = level2;
                            jQuery('.score .white').text(jQuery('.score .white').text() + ' [' + level2 + ']');

                            jQuery('.pre-game').fadeOut();
                            jQuery('.game').css({
                                opacity: 0,
                                display: 'flex'
                            }).animate({
                                opacity: 1
                            }, 2500);

                            startGame();

                        }
                    }
                }

            }

        }


    });

    function play(move) {
        jQuery('#cell-' + move.row + '-' + move.col + ' > div').click();
    }

    function unplay(move) {
        // si elle était blanche
        jQuery('#cell-' + move.row + '-' + move.col + ' > div').removeClass('white');
        // si elle était noir
        jQuery('#cell-' + move.row + '-' + move.col + ' > div').removeClass('black');
        updateScore();
        update_playable_tiles();
    }

    jQuery(document).on("click", ".refresh", function () {
        location.reload();
    });

    jQuery(document).on("click", "#othello .playable", function () {

        rowPlayed = parseInt(jQuery(this).parent().attr('id').split('-')[1]);
        colPlayed = parseInt(jQuery(this).parent().attr('id').split('-')[2]);

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