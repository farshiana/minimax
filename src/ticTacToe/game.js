import Board from './board';
import { BOARD_CELLS } from './constants';
import { PLAYER_ONE } from '../utils';

export default class TicTacToe {
    constructor(board = new Board(), playerToMove = PLAYER_ONE) {
        this.board = board;
        this.playerToMove = playerToMove;
    }

    getCopy() {
        return new TicTacToe(this.board.copy(), this.playerToMove);
    }

    getMoves() {
        const moves = [];
        for (let i = 0; i < BOARD_CELLS; ++i) {
            if (!this.board.grid[i]) {
                moves.push(i);
            }
        }
        return moves;
    }

    getScore(player) {
        if (!this.board.winner) return 0.5;

        return player === this.board.winner ? 1 : 0;
    }

    applyMove(move) {
        this.board.applyMove(move, this.playerToMove);
        this.playerToMove = -this.playerToMove;
    }

    isFinished() {
        return this.board.isFinished();
    }

    print() {
        this.board.print();
    }
}
