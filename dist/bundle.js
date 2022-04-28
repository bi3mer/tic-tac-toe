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
        if (this.player === BoardTypes_1.BoardType.O) {
            for (let i = 0; i < nodes.length; ++i) {
                result = Math.max(result, nodes[i][2].getBoardScore());
            }
        }
        else {
            result = 10;
            for (let i = 0; i < nodes.length; ++i) {
                result = Math.min(result, nodes[i][2].getBoardScore());
            }
        }
        return result;
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
        return 0.1;
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
        return true; // board updated
    }
    return false; // board not updated
}
function handleCellClick(clickedCellEvent) {
    if (gameOver)
        return;
    const clickedCell = clickedCellEvent.target;
    if (clickedCell === null) {
        return;
    }
    let index = Number(clickedCell.getAttribute('index'));
    if (!updateBoard(index, clickedCell)) {
        return;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvQm9hcmQudHMiLCJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvQm9hcmRTdGF0dXMudHMiLCJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvQm9hcmRUeXBlcy50cyIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQm9hcmQgPSB2b2lkIDA7XG5jb25zdCBCb2FyZFN0YXR1c18xID0gcmVxdWlyZShcIi4vQm9hcmRTdGF0dXNcIik7XG5jb25zdCBCb2FyZFR5cGVzXzEgPSByZXF1aXJlKFwiLi9Cb2FyZFR5cGVzXCIpO1xuLy8gTW9kaWZpZWQgZnJvbTpcbi8vIGh0dHBzOi8vZGV2LnRvL2Jvcm5hc2VwaWMvcHVyZS1hbmQtc2ltcGxlLXRpYy10YWMtdG9lLXdpdGgtamF2YXNjcmlwdC00cGduXG5jb25zdCB3aW5uaW5nQ29uZGl0aW9ucyA9IFtcbiAgICBbMCwgMSwgMl0sXG4gICAgWzMsIDQsIDVdLFxuICAgIFs2LCA3LCA4XSxcbiAgICBbMCwgMywgNl0sXG4gICAgWzEsIDQsIDddLFxuICAgIFsyLCA1LCA4XSxcbiAgICBbMCwgNCwgOF0sXG4gICAgWzIsIDQsIDZdXG5dO1xuY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKGJvYXJkKSB7XG4gICAgICAgIHRoaXMuYiA9IFtdO1xuICAgICAgICBpZiAoYm9hcmQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gQm9hcmRUeXBlc18xLkJvYXJkVHlwZS5YO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmIucHVzaChCb2FyZFR5cGVzXzEuQm9hcmRUeXBlLkVtcHR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gYm9hcmQucGxheWVyO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJbaV0gPSBib2FyZC5iW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGJvYXJkU3RhdHVzKCkge1xuICAgICAgICAvLyB3aW5uZXIgb3IgZ2FtZSBpcyBzdGlsbCBnb2luZ1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbm5pbmdDb25kaXRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBhID0gdGhpcy5iW3dpbm5pbmdDb25kaXRpb25zW2ldWzBdXTtcbiAgICAgICAgICAgIGNvbnN0IGIgPSB0aGlzLmJbd2lubmluZ0NvbmRpdGlvbnNbaV1bMV1dO1xuICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuYlt3aW5uaW5nQ29uZGl0aW9uc1tpXVsyXV07XG4gICAgICAgICAgICBpZiAoYSA9PT0gQm9hcmRUeXBlc18xLkJvYXJkVHlwZS5FbXB0eSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGEgPT09IGIgJiYgYiA9PSBjKSB7XG4gICAgICAgICAgICAgICAgaWYgKGEgPT09IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuTykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQm9hcmRTdGF0dXNfMS5Cb2FyZFN0YXR1cy5PO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEJvYXJkU3RhdHVzXzEuQm9hcmRTdGF0dXMuWDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZHJhdyBvciBnYW1lIHN0aWxsIGdvaW5nXG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5iLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5iW2ldICE9PSBCb2FyZFR5cGVzXzEuQm9hcmRUeXBlLkVtcHR5KSB7XG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQgPT09IHRoaXMuYi5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBCb2FyZFN0YXR1c18xLkJvYXJkU3RhdHVzLkRyYXc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJvYXJkU3RhdHVzXzEuQm9hcmRTdGF0dXMuTm9uZTtcbiAgICB9XG4gICAgdXBkYXRlQm9hcmQoaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuYltpbmRleF0gPT09IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuRW1wdHkpIHtcbiAgICAgICAgICAgIHRoaXMuYltpbmRleF0gPSB0aGlzLnBsYXllcjtcbiAgICAgICAgICAgIC8vIHN3aXRjaCBwbGF5ZXIgYW5kIHN1Y2Nlc3NcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllciA9PSBCb2FyZFR5cGVzXzEuQm9hcmRUeXBlLk8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllciA9IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyID0gQm9hcmRUeXBlc18xLkJvYXJkVHlwZS5PO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYltpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuRW1wdHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbnZlbmllbnQgZnVuY3Rpb24gZm9yIGEgcmFuZG9tIEFJIGJ1dCBJIHVzZSBpdCBpbiB0aGUgdHJlZSBzZWFyY2ggb25lXG4gICAgICogZXZlbiB0aG91Z2ggaXQgaXMgYSB0YWQgbWVtb3J5IGluZWZmaWNpZW50LlxuICAgICAqIEByZXR1cm5zIGFsbCBwb3NzaWJsZSBpbmRleGVzIHRoYXQgdGhlIEFJIGNhbiBmaWxsIGluXG4gICAgICovXG4gICAgZ2V0TW92ZXMoKSB7XG4gICAgICAgIGxldCBjaG9pY2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5iLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5iW2ldID09PSBCb2FyZFR5cGVzXzEuQm9hcmRUeXBlLkVtcHR5KSB7XG4gICAgICAgICAgICAgICAgY2hvaWNlcy5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaG9pY2VzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBbYm9hcmQgc3RhdHVzLCBpbmRleCBvZiBtb3ZlIG1hZGUsIHRoZSBib2FyZF1cbiAgICAgKi9cbiAgICBwb3NzaWJsZUJvYXJkU3RhdGVzKCkge1xuICAgICAgICBsZXQgYm9hcmRTdGF0ZXMgPSBbXTtcbiAgICAgICAgY29uc3QgbW92ZXMgPSB0aGlzLmdldE1vdmVzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW92ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gbW92ZXNbaV07XG4gICAgICAgICAgICBsZXQgbmV3Qm9hcmQgPSBuZXcgQm9hcmQodGhpcyk7XG4gICAgICAgICAgICBuZXdCb2FyZC51cGRhdGVCb2FyZChpbmRleCk7XG4gICAgICAgICAgICBjb25zdCBib2FyZFN0YXRlID0gbmV3Qm9hcmQuYm9hcmRTdGF0dXMoKTtcbiAgICAgICAgICAgIGJvYXJkU3RhdGVzLnB1c2goW2JvYXJkU3RhdGUsIGluZGV4LCBuZXdCb2FyZF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2FyZFN0YXRlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgW3Njb3JlLCBpbmRleF1cbiAgICAgKi9cbiAgICBnZXRCb2FyZFNjb3JlKCkge1xuICAgICAgICAvLyBjaGVjayBpZiBnYW1lIGlzIG92ZXIgYW5kIHJldHVybiByZXN1bHRcbiAgICAgICAgY29uc3Qgc3RhdHVzID0gdGhpcy5ib2FyZFN0YXR1cygpO1xuICAgICAgICBpZiAoc3RhdHVzICE9PSBCb2FyZFN0YXR1c18xLkJvYXJkU3RhdHVzLk5vbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAoMCwgQm9hcmRTdGF0dXNfMS5ib2FyZFN0YXR1c1RvTnVtYmVyKShzdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdvIHRocm91Z2ggYWxsIHBvc3NpYmxlIGJvYXJkIHN0YXRlcyBhbmQgcmVjdXJzaXZlbHkgZXZhbHVhdGUgdGhlbS5cbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGxldCBub2RlcyA9IHRoaXMucG9zc2libGVCb2FyZFN0YXRlcygpO1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIgPT09IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuTykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE1hdGgubWF4KHJlc3VsdCwgbm9kZXNbaV1bMl0uZ2V0Qm9hcmRTY29yZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDEwO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IE1hdGgubWluKHJlc3VsdCwgbm9kZXNbaV1bMl0uZ2V0Qm9hcmRTY29yZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBnZXROZXh0TW92ZSgpIHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSB0aGlzLnBvc3NpYmxlQm9hcmRTdGF0ZXMoKTtcbiAgICAgICAgY29uc3QgbW92ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbW92ZXMucHVzaChbbm9kZXNbaV1bMV0sIG5vZGVzW2ldWzJdLmdldEJvYXJkU2NvcmUoKV0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobm9kZXNbaV1bMV0gKyAnLCcgKyBtb3Zlc1ttb3Zlcy5sZW5ndGggLSAxXVsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdCA9IG1vdmVzWzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IG1vdmVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAocmVzdWx0WzFdIDwgbW92ZXNbaV1bMV0pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBtb3Zlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0WzBdO1xuICAgIH1cbn1cbmV4cG9ydHMuQm9hcmQgPSBCb2FyZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ib2FyZFN0YXR1c1RvTnVtYmVyID0gZXhwb3J0cy5Cb2FyZFN0YXR1cyA9IHZvaWQgMDtcbnZhciBCb2FyZFN0YXR1cztcbihmdW5jdGlvbiAoQm9hcmRTdGF0dXMpIHtcbiAgICBCb2FyZFN0YXR1c1tCb2FyZFN0YXR1c1tcIk5vbmVcIl0gPSAwXSA9IFwiTm9uZVwiO1xuICAgIEJvYXJkU3RhdHVzW0JvYXJkU3RhdHVzW1wiWFwiXSA9IDFdID0gXCJYXCI7XG4gICAgQm9hcmRTdGF0dXNbQm9hcmRTdGF0dXNbXCJPXCJdID0gMl0gPSBcIk9cIjtcbiAgICBCb2FyZFN0YXR1c1tCb2FyZFN0YXR1c1tcIkRyYXdcIl0gPSAzXSA9IFwiRHJhd1wiO1xufSkoQm9hcmRTdGF0dXMgPSBleHBvcnRzLkJvYXJkU3RhdHVzIHx8IChleHBvcnRzLkJvYXJkU3RhdHVzID0ge30pKTtcbjtcbmZ1bmN0aW9uIGJvYXJkU3RhdHVzVG9OdW1iZXIoYnMpIHtcbiAgICBpZiAoYnMgPT09IEJvYXJkU3RhdHVzLlgpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBlbHNlIGlmIChicyA9PT0gQm9hcmRTdGF0dXMuTykge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYnMgPT0gQm9hcmRTdGF0dXMuRHJhdykge1xuICAgICAgICByZXR1cm4gMC4xO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxufVxuZXhwb3J0cy5ib2FyZFN0YXR1c1RvTnVtYmVyID0gYm9hcmRTdGF0dXNUb051bWJlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5ib2FyZFR5cGVUb1N0ciA9IGV4cG9ydHMuQm9hcmRUeXBlID0gdm9pZCAwO1xudmFyIEJvYXJkVHlwZTtcbihmdW5jdGlvbiAoQm9hcmRUeXBlKSB7XG4gICAgQm9hcmRUeXBlW0JvYXJkVHlwZVtcIkVtcHR5XCJdID0gMF0gPSBcIkVtcHR5XCI7XG4gICAgQm9hcmRUeXBlW0JvYXJkVHlwZVtcIlhcIl0gPSAxXSA9IFwiWFwiO1xuICAgIEJvYXJkVHlwZVtCb2FyZFR5cGVbXCJPXCJdID0gMl0gPSBcIk9cIjtcbn0pKEJvYXJkVHlwZSA9IGV4cG9ydHMuQm9hcmRUeXBlIHx8IChleHBvcnRzLkJvYXJkVHlwZSA9IHt9KSk7XG47XG5mdW5jdGlvbiBib2FyZFR5cGVUb1N0cih0KSB7XG4gICAgc3dpdGNoICh0KSB7XG4gICAgICAgIGNhc2UgQm9hcmRUeXBlLkVtcHR5OiB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEJvYXJkVHlwZS5YOiB7XG4gICAgICAgICAgICByZXR1cm4gXCJYXCI7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBCb2FyZFR5cGUuTzoge1xuICAgICAgICAgICAgcmV0dXJuIFwiT1wiO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFVuaGFuZGxlZCBib2FyZCB0eXBlICR7dH0uIFBsZWFzZSBjb250YWN0IHRoZSBzaXRlJ3MgYWRtaW4uYCk7XG4gICAgICAgICAgICByZXR1cm4gJ0UnO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5ib2FyZFR5cGVUb1N0ciA9IGJvYXJkVHlwZVRvU3RyO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgQm9hcmRUeXBlc18xID0gcmVxdWlyZShcIi4vQm9hcmRUeXBlc1wiKTtcbmNvbnN0IEJvYXJkXzEgPSByZXF1aXJlKFwiLi9Cb2FyZFwiKTtcbmNvbnN0IEJvYXJkU3RhdHVzXzEgPSByZXF1aXJlKFwiLi9Cb2FyZFN0YXR1c1wiKTtcbmxldCBib2FyZCA9IG5ldyBCb2FyZF8xLkJvYXJkKG51bGwpO1xuY29uc3Qgc3RhdHVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtLXN0YXR1cycpO1xubGV0IGdhbWVPdmVyID0gZmFsc2U7XG4vLyBAVE9ETzogZ28gYmFjayB0byByZXR1cm5uaW5nIGEgYm9vbGVhbiBpbiBjYXNlIHRoZSBwbGF5IGNsaWNrZWQgb24gYSBjZWxsIHRoYXQgaGFzIGFscmVhZHkgYmVlbiBzZWxlY3RlZC5cbmZ1bmN0aW9uIHVwZGF0ZUJvYXJkKGluZGV4LCBjbGlja2VkQ2VsbCkge1xuICAgIGNvbnN0IGJvYXJkVXBkYXRlZEJ5ID0gYm9hcmQudXBkYXRlQm9hcmQoaW5kZXgpO1xuICAgIGlmICghZ2FtZU92ZXIgJiYgYm9hcmRVcGRhdGVkQnkgIT09IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuRW1wdHkpIHtcbiAgICAgICAgLy8gaGFuZGxlIHBsYXllciByZXN1bHRcbiAgICAgICAgbGV0IGJvYXJkU3RhdHVzID0gYm9hcmQuYm9hcmRTdGF0dXMoKTtcbiAgICAgICAgaWYgKGJvYXJkU3RhdHVzID09PSBCb2FyZFN0YXR1c18xLkJvYXJkU3RhdHVzLk8pIHtcbiAgICAgICAgICAgIHN0YXR1cy5pbm5lckhUTUwgPSAnUGxheWVyIDAgd29uISc7XG4gICAgICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYm9hcmRTdGF0dXMgPT09IEJvYXJkU3RhdHVzXzEuQm9hcmRTdGF0dXMuWCkge1xuICAgICAgICAgICAgc3RhdHVzLmlubmVySFRNTCA9ICdQbGF5ZXIgWCB3b24hJztcbiAgICAgICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChib2FyZFN0YXR1cyA9PT0gQm9hcmRTdGF0dXNfMS5Cb2FyZFN0YXR1cy5EcmF3KSB7XG4gICAgICAgICAgICBzdGF0dXMuaW5uZXJIVE1MID0gJ0RyYXchJztcbiAgICAgICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjbGlja2VkQ2VsbC5pbm5lckhUTUwgPSAoMCwgQm9hcmRUeXBlc18xLmJvYXJkVHlwZVRvU3RyKShib2FyZFVwZGF0ZWRCeSk7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBib2FyZCB1cGRhdGVkXG4gICAgfVxuICAgIHJldHVybiBmYWxzZTsgLy8gYm9hcmQgbm90IHVwZGF0ZWRcbn1cbmZ1bmN0aW9uIGhhbmRsZUNlbGxDbGljayhjbGlja2VkQ2VsbEV2ZW50KSB7XG4gICAgaWYgKGdhbWVPdmVyKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgY2xpY2tlZENlbGwgPSBjbGlja2VkQ2VsbEV2ZW50LnRhcmdldDtcbiAgICBpZiAoY2xpY2tlZENlbGwgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgaW5kZXggPSBOdW1iZXIoY2xpY2tlZENlbGwuZ2V0QXR0cmlidXRlKCdpbmRleCcpKTtcbiAgICBpZiAoIXVwZGF0ZUJvYXJkKGluZGV4LCBjbGlja2VkQ2VsbCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZ2FtZU92ZXIpXG4gICAgICAgIHJldHVybjtcbiAgICAvLyBBSSB1cGRhdGVcbiAgICBpbmRleCA9IGJvYXJkLmdldE5leHRNb3ZlKCk7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGV0IGNlbGxJbmRleCA9IE51bWJlcihjZWxsc1tpXS5nZXRBdHRyaWJ1dGUoJ2luZGV4JykpO1xuICAgICAgICBpZiAoaW5kZXggPT09IGNlbGxJbmRleCkge1xuICAgICAgICAgICAgdXBkYXRlQm9hcmQoaW5kZXgsIGNlbGxzW2ldKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNlbGwnKS5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNlbGxDbGljaykpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9