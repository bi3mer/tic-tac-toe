import { BoardStatus, boardStatusToNumber } from "./BoardStatus";
import { BoardType, boardTypeToStr } from "./BoardTypes"

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
    player: BoardType

    constructor(board: Board | null) {
        this.b = []

        if(board === null) {
            this.player = BoardType.X;
            for(let i = 0; i < 9; ++i) {
                this.b.push(BoardType.Empty);
            }
        } else {
            this.player = board.player;
            for(let i = 0; i < 9; ++i) {
                this.b[i] = board.b[i];
            }
        }
    }

    boardStatus() : BoardStatus {
        // winner or game is still going
        for (let i = 0; i < winningConditions.length; ++i) {
            const a = this.b[winningConditions[i][0]];
            const b = this.b[winningConditions[i][1]];
            const c = this.b[winningConditions[i][2]];

            if (a === BoardType.Empty) {
                continue;
            }

            if (a === b && b == c) {
                if (a === BoardType.O) {
                    return BoardStatus.O;
                } else {
                    return BoardStatus.X;
                }
            }
        }

        // draw or game still going
        let count = 0;
        for(let i = 0; i < this.b.length; ++i) {
            if (this.b[i] !== BoardType.Empty) {
                count += 1;
            }
        }
        
        if (count === this.b.length) {
            return BoardStatus.Draw;
        }

        return BoardStatus.None;
    }

    updateBoard(index: number) : BoardType {
        if (this.b[index] === BoardType.Empty) {
            this.b[index] = this.player

            // switch player and success
            if (this.player == BoardType.O) {
                this.player = BoardType.X;
            } else {
                this.player = BoardType.O;
            }

            return this.b[index];
        }

        return BoardType.Empty;
    }

    /**
     * Convenient function for a random AI but I use it in the tree search one 
     * even though it is a tad memory inefficient. 
     * @returns all possible indexes that the AI can fill in
     */
    private getMoves() : number[] {
        let choices : Array<number> = [];
        for (let i = 0; i < this.b.length; ++i) {
            if (this.b[i] === BoardType.Empty) {
                choices.push(i);
            }
        }

        return choices;
    }

    /**
     * @returns [board status, index of move made, the board]
     */
    private possibleBoardStates() : [BoardStatus, number, Board][] {
        let boardStates : [BoardStatus, number, Board][] = [];
        const moves = this.getMoves();
        for(let i = 0; i < moves.length; ++i) {
            const index = moves[i];
            let newBoard = new Board(this);
            newBoard.updateBoard(index);
            
            const boardState = newBoard.boardStatus();
            boardStates.push([boardState, index, newBoard]);
        }

        return boardStates;
    }

    /**
     * @returns [score, index]
     */
    private getBoardScore() : number {
        // check if game is over and return result
        const status = this.boardStatus();
        if (status !== BoardStatus.None) {
            return boardStatusToNumber(status);
        }

        // Go through all possible board states and recursively evaluate them.
        let result = 0;
        let nodes = this.possibleBoardStates();

        if (this.player === BoardType.O) {
            for(let i = 0; i < nodes.length; ++i) {
                result = Math.max(result, nodes[i][2].getBoardScore());
            }
        } else {
            result = 10
            for(let i = 0; i < nodes.length; ++i) {
                result = Math.min(result, nodes[i][2].getBoardScore());
            }
        }
        
        return result;
    }

    getNextMove() : number {
        const nodes = this.possibleBoardStates();
        const moves : [number, number][] = [];

        for (let i = 0; i < nodes.length; ++i) {
            moves.push([nodes[i][1], nodes[i][2].getBoardScore()])
            console.log(nodes[i][1] + ',' + moves[moves.length -1][1])
        }
        
        let result = moves[0];
        for(let i = 1; i < moves.length; ++i) {
            if (result[1] < moves[i][1]) {
                result = moves[i];
            }
        }
        
        return result[0];
    }
}