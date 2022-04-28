/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Board.ts":
/*!**********************!*\
  !*** ./src/Board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Board = void 0;
const BoardStatus_1 = __webpack_require__(/*! ./BoardStatus */ "./src/BoardStatus.ts");
const BoardTypes_1 = __webpack_require__(/*! ./BoardTypes */ "./src/BoardTypes.ts");
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
class Board {
    constructor(board) {
        this.b = [];
        if (board === null) {
            this.player = BoardTypes_1.BoardType.X;
            for (let i = 0; i < 9; ++i) {
                this.b.push(BoardTypes_1.BoardType.Empty);
            }
        }
        else {
            this.player = board.player;
            for (let i = 0; i < 9; ++i) {
                this.b[i] = board.b[i];
            }
        }
    }
    boardStatus() {
        // winner or game is still going
        for (let i = 0; i < winningConditions.length; ++i) {
            const a = this.b[winningConditions[i][0]];
            const b = this.b[winningConditions[i][1]];
            const c = this.b[winningConditions[i][2]];
            if (a === BoardTypes_1.BoardType.Empty) {
                continue;
            }
            if (a === b && b == c) {
                if (a === BoardTypes_1.BoardType.O) {
                    return BoardStatus_1.BoardStatus.O;
                }
                else {
                    return BoardStatus_1.BoardStatus.X;
                }
            }
        }
        // draw or game still going
        let count = 0;
        for (let i = 0; i < this.b.length; ++i) {
            if (this.b[i] !== BoardTypes_1.BoardType.Empty) {
                count += 1;
            }
        }
        if (count === this.b.length) {
            return BoardStatus_1.BoardStatus.Draw;
        }
        return BoardStatus_1.BoardStatus.None;
    }
    updateBoard(index) {
        if (this.b[index] === BoardTypes_1.BoardType.Empty) {
            this.b[index] = this.player;
            // switch player and success
            if (this.player == BoardTypes_1.BoardType.O) {
                this.player = BoardTypes_1.BoardType.X;
            }
            else {
                this.player = BoardTypes_1.BoardType.O;
            }
            return this.b[index];
        }
        return BoardTypes_1.BoardType.Empty;
    }
    /**
     * Convenient function for a random AI but I use it in the tree search one
     * even though it is a tad memory inefficient.
     * @returns all possible indexes that the AI can fill in
     */
    getMoves() {
        let choices = [];
        for (let i = 0; i < this.b.length; ++i) {
            if (this.b[i] === BoardTypes_1.BoardType.Empty) {
                choices.push(i);
            }
        }
        return choices;
    }
    /**
     * @returns [board status, index of move made, the board]
     */
    possibleBoardStates() {
        let boardStates = [];
        const moves = this.getMoves();
        for (let i = 0; i < moves.length; ++i) {
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
    getBoardScore() {
        // check if game is over and return result
        const status = this.boardStatus();
        if (status !== BoardStatus_1.BoardStatus.None) {
            return (0, BoardStatus_1.boardStatusToNumber)(status);
        }
        // Go through all possible board states and recursively evaluate them.
        let result = 0;
        let nodes = this.possibleBoardStates();
        for (let i = 0; i < nodes.length; ++i) {
            result += nodes[i][2].getBoardScore();
        }
        return result / nodes.length;
    }
    getNextMove() {
        const nodes = this.possibleBoardStates();
        const moves = [];
        for (let i = 0; i < nodes.length; ++i) {
            moves.push([nodes[i][1], nodes[i][2].getBoardScore()]);
            console.log(nodes[i][1] + ',' + moves[moves.length - 1][1]);
        }
        let result = moves[0];
        for (let i = 1; i < moves.length; ++i) {
            if (result[1] < moves[i][1]) {
                result = moves[i];
            }
        }
        return result[0];
    }
}
exports.Board = Board;


/***/ }),

/***/ "./src/BoardStatus.ts":
/*!****************************!*\
  !*** ./src/BoardStatus.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.boardStatusToNumber = exports.BoardStatus = void 0;
var BoardStatus;
(function (BoardStatus) {
    BoardStatus[BoardStatus["None"] = 0] = "None";
    BoardStatus[BoardStatus["X"] = 1] = "X";
    BoardStatus[BoardStatus["O"] = 2] = "O";
    BoardStatus[BoardStatus["Draw"] = 3] = "Draw";
})(BoardStatus = exports.BoardStatus || (exports.BoardStatus = {}));
;
function boardStatusToNumber(bs) {
    if (bs === BoardStatus.X) {
        return -1;
    }
    else if (bs === BoardStatus.O) {
        return 1;
    }
    else if (bs == BoardStatus.Draw) {
        return 0;
    }
    else {
        return 0;
    }
}
exports.boardStatusToNumber = boardStatusToNumber;


/***/ }),

/***/ "./src/BoardTypes.ts":
/*!***************************!*\
  !*** ./src/BoardTypes.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.boardTypeToStr = exports.BoardType = void 0;
var BoardType;
(function (BoardType) {
    BoardType[BoardType["Empty"] = 0] = "Empty";
    BoardType[BoardType["X"] = 1] = "X";
    BoardType[BoardType["O"] = 2] = "O";
})(BoardType = exports.BoardType || (exports.BoardType = {}));
;
function boardTypeToStr(t) {
    switch (t) {
        case BoardType.Empty: {
            return "";
        }
        case BoardType.X: {
            return "X";
        }
        case BoardType.O: {
            return "O";
        }
        default: {
            console.error(`Unhandled board type ${t}. Please contact the site's admin.`);
            return 'E';
        }
    }
}
exports.boardTypeToStr = boardTypeToStr;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const BoardTypes_1 = __webpack_require__(/*! ./BoardTypes */ "./src/BoardTypes.ts");
const Board_1 = __webpack_require__(/*! ./Board */ "./src/Board.ts");
const BoardStatus_1 = __webpack_require__(/*! ./BoardStatus */ "./src/BoardStatus.ts");
let board = new Board_1.Board(null);
const status = document.querySelector('.game--status');
let gameOver = false;
// @TODO: go back to returnning a boolean in case the play clicked on a cell that has already been selected.
function updateBoard(index, clickedCell) {
    console.log(index);
    const boardUpdatedBy = board.updateBoard(index);
    if (!gameOver && boardUpdatedBy !== BoardTypes_1.BoardType.Empty) {
        // handle player result
        let boardStatus = board.boardStatus();
        if (boardStatus === BoardStatus_1.BoardStatus.O) {
            status.innerHTML = 'Player 0 won!';
            gameOver = true;
        }
        else if (boardStatus === BoardStatus_1.BoardStatus.X) {
            status.innerHTML = 'Player X won!';
            gameOver = true;
        }
        else if (boardStatus === BoardStatus_1.BoardStatus.Draw) {
            status.innerHTML = 'Draw!';
            gameOver = true;
        }
        clickedCell.innerHTML = (0, BoardTypes_1.boardTypeToStr)(boardUpdatedBy);
        // return true; // board updated
    }
    // return false; // board not updated
}
function handleCellClick(clickedCellEvent) {
    // handle the player update
    const clickedCell = clickedCellEvent.target;
    if (clickedCell === null) {
        return;
    }
    let index = Number(clickedCell.getAttribute('index'));
    updateBoard(index, clickedCell);
    // if (!updateBoard(index, clickedCell)) {
    //     return;
    // }
    if (gameOver)
        return;
    // AI update
    index = board.getNextMove();
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; ++i) {
        let cellIndex = Number(cells[i].getAttribute('index'));
        if (index === cellIndex) {
            updateBoard(index, cells[i]);
            break;
        }
    }
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RpYy10YWMtdG9lLy4vc3JjL0JvYXJkLnRzIiwid2VicGFjazovL3RpYy10YWMtdG9lLy4vc3JjL0JvYXJkU3RhdHVzLnRzIiwid2VicGFjazovL3RpYy10YWMtdG9lLy4vc3JjL0JvYXJkVHlwZXMudHMiLCJ3ZWJwYWNrOi8vdGljLXRhYy10b2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJvYXJkID0gdm9pZCAwO1xuY29uc3QgQm9hcmRTdGF0dXNfMSA9IHJlcXVpcmUoXCIuL0JvYXJkU3RhdHVzXCIpO1xuY29uc3QgQm9hcmRUeXBlc18xID0gcmVxdWlyZShcIi4vQm9hcmRUeXBlc1wiKTtcbi8vIE1vZGlmaWVkIGZyb206XG4vLyBodHRwczovL2Rldi50by9ib3JuYXNlcGljL3B1cmUtYW5kLXNpbXBsZS10aWMtdGFjLXRvZS13aXRoLWphdmFzY3JpcHQtNHBnblxuY29uc3Qgd2lubmluZ0NvbmRpdGlvbnMgPSBbXG4gICAgWzAsIDEsIDJdLFxuICAgIFszLCA0LCA1XSxcbiAgICBbNiwgNywgOF0sXG4gICAgWzAsIDMsIDZdLFxuICAgIFsxLCA0LCA3XSxcbiAgICBbMiwgNSwgOF0sXG4gICAgWzAsIDQsIDhdLFxuICAgIFsyLCA0LCA2XVxuXTtcbmNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCkge1xuICAgICAgICB0aGlzLmIgPSBbXTtcbiAgICAgICAgaWYgKGJvYXJkID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuWDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iLnB1c2goQm9hcmRUeXBlc18xLkJvYXJkVHlwZS5FbXB0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IGJvYXJkLnBsYXllcjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iW2ldID0gYm9hcmQuYltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBib2FyZFN0YXR1cygpIHtcbiAgICAgICAgLy8gd2lubmVyIG9yIGdhbWUgaXMgc3RpbGwgZ29pbmdcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aW5uaW5nQ29uZGl0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgYSA9IHRoaXMuYlt3aW5uaW5nQ29uZGl0aW9uc1tpXVswXV07XG4gICAgICAgICAgICBjb25zdCBiID0gdGhpcy5iW3dpbm5pbmdDb25kaXRpb25zW2ldWzFdXTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLmJbd2lubmluZ0NvbmRpdGlvbnNbaV1bMl1dO1xuICAgICAgICAgICAgaWYgKGEgPT09IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuRW1wdHkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhID09PSBiICYmIGIgPT0gYykge1xuICAgICAgICAgICAgICAgIGlmIChhID09PSBCb2FyZFR5cGVzXzEuQm9hcmRUeXBlLk8pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEJvYXJkU3RhdHVzXzEuQm9hcmRTdGF0dXMuTztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBCb2FyZFN0YXR1c18xLkJvYXJkU3RhdHVzLlg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGRyYXcgb3IgZ2FtZSBzdGlsbCBnb2luZ1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYltpXSAhPT0gQm9hcmRUeXBlc18xLkJvYXJkVHlwZS5FbXB0eSkge1xuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ID09PSB0aGlzLmIubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gQm9hcmRTdGF0dXNfMS5Cb2FyZFN0YXR1cy5EcmF3O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCb2FyZFN0YXR1c18xLkJvYXJkU3RhdHVzLk5vbmU7XG4gICAgfVxuICAgIHVwZGF0ZUJvYXJkKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmJbaW5kZXhdID09PSBCb2FyZFR5cGVzXzEuQm9hcmRUeXBlLkVtcHR5KSB7XG4gICAgICAgICAgICB0aGlzLmJbaW5kZXhdID0gdGhpcy5wbGF5ZXI7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggcGxheWVyIGFuZCBzdWNjZXNzXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIgPT0gQm9hcmRUeXBlc18xLkJvYXJkVHlwZS5PKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBCb2FyZFR5cGVzXzEuQm9hcmRUeXBlLlg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllciA9IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuTztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCb2FyZFR5cGVzXzEuQm9hcmRUeXBlLkVtcHR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZW5pZW50IGZ1bmN0aW9uIGZvciBhIHJhbmRvbSBBSSBidXQgSSB1c2UgaXQgaW4gdGhlIHRyZWUgc2VhcmNoIG9uZVxuICAgICAqIGV2ZW4gdGhvdWdoIGl0IGlzIGEgdGFkIG1lbW9yeSBpbmVmZmljaWVudC5cbiAgICAgKiBAcmV0dXJucyBhbGwgcG9zc2libGUgaW5kZXhlcyB0aGF0IHRoZSBBSSBjYW4gZmlsbCBpblxuICAgICAqL1xuICAgIGdldE1vdmVzKCkge1xuICAgICAgICBsZXQgY2hvaWNlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYltpXSA9PT0gQm9hcmRUeXBlc18xLkJvYXJkVHlwZS5FbXB0eSkge1xuICAgICAgICAgICAgICAgIGNob2ljZXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hvaWNlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgW2JvYXJkIHN0YXR1cywgaW5kZXggb2YgbW92ZSBtYWRlLCB0aGUgYm9hcmRdXG4gICAgICovXG4gICAgcG9zc2libGVCb2FyZFN0YXRlcygpIHtcbiAgICAgICAgbGV0IGJvYXJkU3RhdGVzID0gW107XG4gICAgICAgIGNvbnN0IG1vdmVzID0gdGhpcy5nZXRNb3ZlcygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IG1vdmVzW2ldO1xuICAgICAgICAgICAgbGV0IG5ld0JvYXJkID0gbmV3IEJvYXJkKHRoaXMpO1xuICAgICAgICAgICAgbmV3Qm9hcmQudXBkYXRlQm9hcmQoaW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgYm9hcmRTdGF0ZSA9IG5ld0JvYXJkLmJvYXJkU3RhdHVzKCk7XG4gICAgICAgICAgICBib2FyZFN0YXRlcy5wdXNoKFtib2FyZFN0YXRlLCBpbmRleCwgbmV3Qm9hcmRdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm9hcmRTdGF0ZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFtzY29yZSwgaW5kZXhdXG4gICAgICovXG4gICAgZ2V0Qm9hcmRTY29yZSgpIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgZ2FtZSBpcyBvdmVyIGFuZCByZXR1cm4gcmVzdWx0XG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IHRoaXMuYm9hcmRTdGF0dXMoKTtcbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gQm9hcmRTdGF0dXNfMS5Cb2FyZFN0YXR1cy5Ob25lKSB7XG4gICAgICAgICAgICByZXR1cm4gKDAsIEJvYXJkU3RhdHVzXzEuYm9hcmRTdGF0dXNUb051bWJlcikoc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBHbyB0aHJvdWdoIGFsbCBwb3NzaWJsZSBib2FyZCBzdGF0ZXMgYW5kIHJlY3Vyc2l2ZWx5IGV2YWx1YXRlIHRoZW0uXG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xuICAgICAgICBsZXQgbm9kZXMgPSB0aGlzLnBvc3NpYmxlQm9hcmRTdGF0ZXMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IG5vZGVzW2ldWzJdLmdldEJvYXJkU2NvcmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0IC8gbm9kZXMubGVuZ3RoO1xuICAgIH1cbiAgICBnZXROZXh0TW92ZSgpIHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLnBvc3NpYmxlQm9hcmRTdGF0ZXMoKTtcbiAgICAgICAgY29uc3QgbW92ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbW92ZXMucHVzaChbbm9kZXNbaV1bMV0sIG5vZGVzW2ldWzJdLmdldEJvYXJkU2NvcmUoKV0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobm9kZXNbaV1bMV0gKyAnLCcgKyBtb3Zlc1ttb3Zlcy5sZW5ndGggLSAxXVsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdCA9IG1vdmVzWzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1vdmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdIDwgbW92ZXNbaV1bMV0pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBtb3Zlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0WzBdO1xuICAgIH1cbn1cbmV4cG9ydHMuQm9hcmQgPSBCb2FyZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ib2FyZFN0YXR1c1RvTnVtYmVyID0gZXhwb3J0cy5Cb2FyZFN0YXR1cyA9IHZvaWQgMDtcbnZhciBCb2FyZFN0YXR1cztcbihmdW5jdGlvbiAoQm9hcmRTdGF0dXMpIHtcbiAgICBCb2FyZFN0YXR1c1tCb2FyZFN0YXR1c1tcIk5vbmVcIl0gPSAwXSA9IFwiTm9uZVwiO1xuICAgIEJvYXJkU3RhdHVzW0JvYXJkU3RhdHVzW1wiWFwiXSA9IDFdID0gXCJYXCI7XG4gICAgQm9hcmRTdGF0dXNbQm9hcmRTdGF0dXNbXCJPXCJdID0gMl0gPSBcIk9cIjtcbiAgICBCb2FyZFN0YXR1c1tCb2FyZFN0YXR1c1tcIkRyYXdcIl0gPSAzXSA9IFwiRHJhd1wiO1xufSkoQm9hcmRTdGF0dXMgPSBleHBvcnRzLkJvYXJkU3RhdHVzIHx8IChleHBvcnRzLkJvYXJkU3RhdHVzID0ge30pKTtcbjtcbmZ1bmN0aW9uIGJvYXJkU3RhdHVzVG9OdW1iZXIoYnMpIHtcbiAgICBpZiAoYnMgPT09IEJvYXJkU3RhdHVzLlgpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChicyA9PT0gQm9hcmRTdGF0dXMuTykge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYnMgPT0gQm9hcmRTdGF0dXMuRHJhdykge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbn1cbmV4cG9ydHMuYm9hcmRTdGF0dXNUb051bWJlciA9IGJvYXJkU3RhdHVzVG9OdW1iZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYm9hcmRUeXBlVG9TdHIgPSBleHBvcnRzLkJvYXJkVHlwZSA9IHZvaWQgMDtcbnZhciBCb2FyZFR5cGU7XG4oZnVuY3Rpb24gKEJvYXJkVHlwZSkge1xuICAgIEJvYXJkVHlwZVtCb2FyZFR5cGVbXCJFbXB0eVwiXSA9IDBdID0gXCJFbXB0eVwiO1xuICAgIEJvYXJkVHlwZVtCb2FyZFR5cGVbXCJYXCJdID0gMV0gPSBcIlhcIjtcbiAgICBCb2FyZFR5cGVbQm9hcmRUeXBlW1wiT1wiXSA9IDJdID0gXCJPXCI7XG59KShCb2FyZFR5cGUgPSBleHBvcnRzLkJvYXJkVHlwZSB8fCAoZXhwb3J0cy5Cb2FyZFR5cGUgPSB7fSkpO1xuO1xuZnVuY3Rpb24gYm9hcmRUeXBlVG9TdHIodCkge1xuICAgIHN3aXRjaCAodCkge1xuICAgICAgICBjYXNlIEJvYXJkVHlwZS5FbXB0eToge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBCb2FyZFR5cGUuWDoge1xuICAgICAgICAgICAgcmV0dXJuIFwiWFwiO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQm9hcmRUeXBlLk86IHtcbiAgICAgICAgICAgIHJldHVybiBcIk9cIjtcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBVbmhhbmRsZWQgYm9hcmQgdHlwZSAke3R9LiBQbGVhc2UgY29udGFjdCB0aGUgc2l0ZSdzIGFkbWluLmApO1xuICAgICAgICAgICAgcmV0dXJuICdFJztcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuYm9hcmRUeXBlVG9TdHIgPSBib2FyZFR5cGVUb1N0cjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEJvYXJkVHlwZXNfMSA9IHJlcXVpcmUoXCIuL0JvYXJkVHlwZXNcIik7XG5jb25zdCBCb2FyZF8xID0gcmVxdWlyZShcIi4vQm9hcmRcIik7XG5jb25zdCBCb2FyZFN0YXR1c18xID0gcmVxdWlyZShcIi4vQm9hcmRTdGF0dXNcIik7XG5sZXQgYm9hcmQgPSBuZXcgQm9hcmRfMS5Cb2FyZChudWxsKTtcbmNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLS1zdGF0dXMnKTtcbmxldCBnYW1lT3ZlciA9IGZhbHNlO1xuLy8gQFRPRE86IGdvIGJhY2sgdG8gcmV0dXJubmluZyBhIGJvb2xlYW4gaW4gY2FzZSB0aGUgcGxheSBjbGlja2VkIG9uIGEgY2VsbCB0aGF0IGhhcyBhbHJlYWR5IGJlZW4gc2VsZWN0ZWQuXG5mdW5jdGlvbiB1cGRhdGVCb2FyZChpbmRleCwgY2xpY2tlZENlbGwpIHtcbiAgICBjb25zb2xlLmxvZyhpbmRleCk7XG4gICAgY29uc3QgYm9hcmRVcGRhdGVkQnkgPSBib2FyZC51cGRhdGVCb2FyZChpbmRleCk7XG4gICAgaWYgKCFnYW1lT3ZlciAmJiBib2FyZFVwZGF0ZWRCeSAhPT0gQm9hcmRUeXBlc18xLkJvYXJkVHlwZS5FbXB0eSkge1xuICAgICAgICAvLyBoYW5kbGUgcGxheWVyIHJlc3VsdFxuICAgICAgICBsZXQgYm9hcmRTdGF0dXMgPSBib2FyZC5ib2FyZFN0YXR1cygpO1xuICAgICAgICBpZiAoYm9hcmRTdGF0dXMgPT09IEJvYXJkU3RhdHVzXzEuQm9hcmRTdGF0dXMuTykge1xuICAgICAgICAgICAgc3RhdHVzLmlubmVySFRNTCA9ICdQbGF5ZXIgMCB3b24hJztcbiAgICAgICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChib2FyZFN0YXR1cyA9PT0gQm9hcmRTdGF0dXNfMS5Cb2FyZFN0YXR1cy5YKSB7XG4gICAgICAgICAgICBzdGF0dXMuaW5uZXJIVE1MID0gJ1BsYXllciBYIHdvbiEnO1xuICAgICAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGJvYXJkU3RhdHVzID09PSBCb2FyZFN0YXR1c18xLkJvYXJkU3RhdHVzLkRyYXcpIHtcbiAgICAgICAgICAgIHN0YXR1cy5pbm5lckhUTUwgPSAnRHJhdyEnO1xuICAgICAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNsaWNrZWRDZWxsLmlubmVySFRNTCA9ICgwLCBCb2FyZFR5cGVzXzEuYm9hcmRUeXBlVG9TdHIpKGJvYXJkVXBkYXRlZEJ5KTtcbiAgICAgICAgLy8gcmV0dXJuIHRydWU7IC8vIGJvYXJkIHVwZGF0ZWRcbiAgICB9XG4gICAgLy8gcmV0dXJuIGZhbHNlOyAvLyBib2FyZCBub3QgdXBkYXRlZFxufVxuZnVuY3Rpb24gaGFuZGxlQ2VsbENsaWNrKGNsaWNrZWRDZWxsRXZlbnQpIHtcbiAgICAvLyBoYW5kbGUgdGhlIHBsYXllciB1cGRhdGVcbiAgICBjb25zdCBjbGlja2VkQ2VsbCA9IGNsaWNrZWRDZWxsRXZlbnQudGFyZ2V0O1xuICAgIGlmIChjbGlja2VkQ2VsbCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBpbmRleCA9IE51bWJlcihjbGlja2VkQ2VsbC5nZXRBdHRyaWJ1dGUoJ2luZGV4JykpO1xuICAgIHVwZGF0ZUJvYXJkKGluZGV4LCBjbGlja2VkQ2VsbCk7XG4gICAgLy8gaWYgKCF1cGRhdGVCb2FyZChpbmRleCwgY2xpY2tlZENlbGwpKSB7XG4gICAgLy8gICAgIHJldHVybjtcbiAgICAvLyB9XG4gICAgaWYgKGdhbWVPdmVyKVxuICAgICAgICByZXR1cm47XG4gICAgLy8gQUkgdXBkYXRlXG4gICAgaW5kZXggPSBib2FyZC5nZXROZXh0TW92ZSgpO1xuICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNlbGxzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxldCBjZWxsSW5kZXggPSBOdW1iZXIoY2VsbHNbaV0uZ2V0QXR0cmlidXRlKCdpbmRleCcpKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSBjZWxsSW5kZXgpIHtcbiAgICAgICAgICAgIHVwZGF0ZUJvYXJkKGluZGV4LCBjZWxsc1tpXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jZWxsJykuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDZWxsQ2xpY2spKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==