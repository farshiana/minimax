import { PLAYER_ONE, PLAYER_TWO } from '../utils';
import { BOARD_SIZE, BOARD_CELLS } from './constants';

export default class Board {
    constructor(grid = new Array(BOARD_CELLS).fill(null), emptyCellsCount = BOARD_CELLS, winner = null) {
        this.grid = grid;
        this.emptyCellsCount = emptyCellsCount;
        this.winner = winner;
    }

    getCopy() {
        const grid = new Array(BOARD_CELLS);
        for (let i = 0; i < BOARD_CELLS; ++i) {
            grid[i] = this.grid[i];
        }
        return new Board(grid, this.emptyCellsCount, this.winner);
    }

    applyMove(move, player) {
        this.grid[move] = player;
        this.emptyCellsCount -= 1;

        if (this.completesBoard(move)) {
            this.winner = player;
        }
    }

    completesBoard(move) {
        const x = move % BOARD_SIZE;
        const y = ~~(move / BOARD_SIZE);

        return this.completesHorizontalLine(y) || this.completesVerticalLine(x)
            || this.completesDiagonal(x, y) || this.completesAntiDiagonal(x, y);
    }

    completesHorizontalLine(y) {
        return this.grid[BOARD_SIZE * y] === this.grid[BOARD_SIZE * y + 1]
            && this.grid[BOARD_SIZE * y + 1] === this.grid[BOARD_SIZE * y + 2];
    }

    completesVerticalLine(x) {
        return this.grid[x] === this.grid[x + BOARD_SIZE]
            && this.grid[x + BOARD_SIZE] === this.grid[x + 2 * BOARD_SIZE];
    }

    completesDiagonal(x, y) {
        return x === y && this.grid[0] === this.grid[4] && this.grid[4] === this.grid[8];
    }

    completesAntiDiagonal(x, y) {
        return x + y === 2 && this.grid[2] === this.grid[4] && this.grid[4] === this.grid[6];
    }

    isFinished() {
        return this.emptyCellsCount === 0 || this.winner;
    }

    print() {
        console.log('\n');
        let row = '';

        for (let i = 0; i < BOARD_CELLS; ++i) {
            if (this.grid[i] === PLAYER_ONE) {
                row += ' x';
            } else if (this.grid[i] === PLAYER_TWO) {
                row += ' o';
            } else {
                row += ' _';
            }
            if (i % BOARD_SIZE === 2) {
                console.log(row);
                row = '';
            }
        }
    }
}
