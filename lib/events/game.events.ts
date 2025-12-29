export enum GameEvents {
    PLAYER_READY ="game:player_ready",
    START_ROUND = "game:start_round",
    SUBMIT_WORD = "game:submit_word", // LO EMITE EL JUGADOR
    WORD_SUBMITTED = "game:word_submitted", // LO EMITE EL SV PARA NOTIFICAR LA PALABRA INGRESADA
    DISCUSSION_TURN_END = "game:discussion_turn_end", // LO EMITE CADA JUGADOR Y EL SV CUANDO RECIBE TODOS EMITE EL VOTE TURN
    VOTE_TURN = "game:vote_turn", // LO EMITE EL SV PARA NOTIFICAR A QUIEN LE TOCA VOTAR
    SUBMIT_VOTE = "game:submit_vote", // LO EMITE CADA JUGADOR AL VOTAR
    VOTE_SUBMITTED = "game:vote_submitted", // LO EMITE EL SV PARA NOTIFICAR EL VOTO DE LOS JUGADORES Y PODER MOSTRAR EL CONTEO
    ROUND_RESULT = "game:round_result", // LO EMITE EL SV AL RECIBIR SUBMIT VOTE DE TODOS, CALCULA EL EJECUTADO Y LO NOTIFICA
    END_GAME = "game:end_game", // SI EL EL EXECUTED PLAYER ES EL IMPOSTOR, EMITE ESTE
    NEXT_ROUND = "game:next_round",
    PLAYER_LEFT_GAME = "game:player_left_game"
}