import { BoardStatus } from "./BoardStatus";
import { BoardType } from "./BoardTypes"

// Modified from:
// https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export class Board {
    b : BoardType[]

    constructor(board: Board | null) {
        this.b = []

        if(board === null) {
            for(let i = 0; i < 9; ++i) {
                this.b.push(BoardType.Empty);
            }
        } else {
            for(let i = 0; i < 9; ++i) {
                this.b[i] = board.b[i];
            }
        }
    }

    boardStatus() : BoardStatus {
        // draw
        let count = 0;
        for(let i = 0; i < this.b.length; ++i) {
            if (this.b[i] !== BoardType.Empty) {
                count += 1;
            }
        }
        
        if (count === this.b.length) {
            return BoardStatus.Draw;
        }
        
        // winner or game is still going
        let winner = BoardStatus.None;
        for (let i = 0; i < winningConditions.length; ++i) {
            const a = this.b[winningConditions[i][0]];
            const b = this.b[winningConditions[i][1]];
            const c = this.b[winningConditions[i][2]];

            if (a === BoardType.Empty) {
                continue;
            }

            if (a === b && b == c) {
                if (a === BoardType.O) {
                    winner = BoardStatus.O;
                } else {
                    winner = BoardStatus.X;
                }
                
                break;
            }
        }

        return winner;
    }

    updateBoard(index: number, player: BoardType) : Boolean {
        if (this.b[index] === BoardType.Empty) {
            this.b[index] = player
            return true;
        }

        return false;
    }

}