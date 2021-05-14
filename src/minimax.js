const minimax = (game, player, depth = 10, maximizingPlayer = true) => {
    if (depth === 0 || game.isFinished()) {
        return { value: game.getScore(player), move: null };
    }

    const compare = (a, b) => (maximizingPlayer ? a > b : a < b);
    let bestValue = maximizingPlayer ? -Infinity : Infinity;
    let bestMove = null;

    game.getMoves().forEach((move) => {
        const child = game.copy();
        child.applyMove(move);
        const result = minimax(child, player, depth - 1, !maximizingPlayer);

        if (compare(result.value, bestValue)) {
            bestValue = result.value;
            bestMove = move;
        }
    });

    return { value: bestValue, move: bestMove };
};

export default minimax;
