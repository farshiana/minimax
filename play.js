import readline from 'readline';
import minimax from './src/minimax';
import TicTacToe from './src/ticTacToe/game';
import Nim from './src/nim/game';
import { PLAYER_ONE, PLAYER_TWO, getRandom } from './src/utils';

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const announceWinner = (game) => {
    const score = game.getScore(PLAYER_ONE);
    if (score === PLAYER_ONE) {
        console.log('Player ONE won!');
    } else if (score === PLAYER_TWO) {
        console.log('Player TWO won!');
    } else {
        console.log('It\'s a tie!');
    }
};

const main = () => {
    console.log(`Playing ${process.env.game} in ${process.env.engine} mode`);

    let game;
    if (process.env.game === 'Nim') {
        game = new Nim();
    } else if (process.env.game === 'TicTacToe') {
        game = new TicTacToe();
    }
    game.print();

    while (true) {
        let { move } = minimax(game, PLAYER_ONE);
        game.applyMove(move);
        game.print();
        console.log('AI moved', move);

        if (game.isFinished()) {
            announceWinner(game);
            break;
        }

        if (process.env.engine === 'human') {
            if (process.env.game === 'Nim') {
                reader.question('Enter number of matches', (answer) => {
                    move = parseInt(answer, 10);
                });
            } else {
                reader.question('Enter position on the board (0 to 8)', (answer) => {
                    move = parseInt(answer, 10);
                });
            }
        } else {
            const moves = game.getMoves();
            move = moves[getRandom(0, moves.length)];
        }

        game.applyMove(move);
        game.print();
        console.log('Opponent moved', move);

        if (game.isFinished()) {
            announceWinner(game);
            break;
        }
    }
};

main();
