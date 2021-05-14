import { PLAYER_ONE } from '../utils';

const MAX_MATCHES_PER_MOVE = 3;

export default class Nim {
    constructor(matchesCount = 21, playerToMove = PLAYER_ONE) {
        this.matchesCount = matchesCount;
        this.playerToMove = playerToMove;
    }

    getCopy() {
        return new Nim(this.matchesCount, this.playerToMove);
    }

    getMoves() {
        const moves = [];
        for (let i = 1; i <= Math.min(this.matchesCount, MAX_MATCHES_PER_MOVE); ++i) {
            moves.push(i);
        }
        return moves;
    }

    getScore(player) {
        return player === this.playerToMove ? 1 : 0;
    }

    applyMove(move) {
        this.matchesCount -= move;
        this.playerToMove = -this.playerToMove;
    }

    isFinished() {
        return this.matchesCount === 0;
    }

    print() {
        console.log('\n');
        console.log('| '.repeat(this.matchesCount));
    }
}
