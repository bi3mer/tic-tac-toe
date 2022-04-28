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
            for (let i = 0; i < 9; ++i) {
                this.b.push(BoardTypes_1.BoardType.Empty);
            }
        }
        else {
            for (let i = 0; i < 9; ++i) {
                this.b[i] = board.b[i];
            }
        }
    }
    boardStatus() {
        // draw
        let count = 0;
        for (let i = 0; i < this.b.length; ++i) {
            if (this.b[i] !== BoardTypes_1.BoardType.Empty) {
                count += 1;
            }
        }
        if (count === this.b.length) {
            return BoardStatus_1.BoardStatus.Draw;
        }
        // winner or game is still going
        let winner = BoardStatus_1.BoardStatus.None;
        for (let i = 0; i < winningConditions.length; ++i) {
            const a = this.b[winningConditions[i][0]];
            const b = this.b[winningConditions[i][1]];
            const c = this.b[winningConditions[i][2]];
            if (a === BoardTypes_1.BoardType.Empty) {
                continue;
            }
            if (a === b && b == c) {
                if (a === BoardTypes_1.BoardType.O) {
                    winner = BoardStatus_1.BoardStatus.O;
                }
                else {
                    winner = BoardStatus_1.BoardStatus.X;
                }
                break;
            }
        }
        return winner;
    }
    updateBoard(index, player) {
        if (this.b[index] === BoardTypes_1.BoardType.Empty) {
            this.b[index] = player;
            return true;
        }
        return false;
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
exports.BoardStatus = void 0;
var BoardStatus;
(function (BoardStatus) {
    BoardStatus[BoardStatus["None"] = 0] = "None";
    BoardStatus[BoardStatus["X"] = 1] = "X";
    BoardStatus[BoardStatus["O"] = 2] = "O";
    BoardStatus[BoardStatus["Draw"] = 3] = "Draw";
})(BoardStatus = exports.BoardStatus || (exports.BoardStatus = {}));


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
let currentPlayer = BoardTypes_1.BoardType.X;
const status = document.querySelector('.game--status');
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    if (clickedCell === null) {
        return;
    }
    const index = Number(clickedCell.getAttribute('index'));
    if (board.updateBoard(index, currentPlayer)) {
        let boardStatus = board.boardStatus();
        if (boardStatus === BoardStatus_1.BoardStatus.O) {
            status.innerHTML = 'Player 0 won!';
        }
        else if (boardStatus === BoardStatus_1.BoardStatus.X) {
            status.innerHTML = 'Player X won!';
        }
        else if (boardStatus === BoardStatus_1.BoardStatus.Draw) {
            status.innerHTML = 'Draw!';
        }
        clickedCell.innerHTML = (0, BoardTypes_1.boardTypeToStr)(currentPlayer);
        if (currentPlayer === BoardTypes_1.BoardType.X) {
            currentPlayer = BoardTypes_1.BoardType.O;
        }
        else {
            currentPlayer = BoardTypes_1.BoardType.X;
        }
    }
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhO0FBQ2Isc0JBQXNCLG1CQUFPLENBQUMsMkNBQWU7QUFDN0MscUJBQXFCLG1CQUFPLENBQUMseUNBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsT0FBTztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixPQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsOEJBQThCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOzs7Ozs7Ozs7OztBQ3ZFQTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx3Q0FBd0MsbUJBQW1CLEtBQUs7Ozs7Ozs7Ozs7O0FDVHBEO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHNCQUFzQixHQUFHLGlCQUFpQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0MsaUJBQWlCLEtBQUs7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELEVBQUU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7Ozs7Ozs7VUMxQnRCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCLG1CQUFPLENBQUMseUNBQWM7QUFDM0MsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakMsc0JBQXNCLG1CQUFPLENBQUMsMkNBQWU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvQm9hcmQudHMiLCJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvQm9hcmRTdGF0dXMudHMiLCJ3ZWJwYWNrOi8vdGljLXRhYy10b2UvLi9zcmMvQm9hcmRUeXBlcy50cyIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90aWMtdGFjLXRvZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQm9hcmQgPSB2b2lkIDA7XG5jb25zdCBCb2FyZFN0YXR1c18xID0gcmVxdWlyZShcIi4vQm9hcmRTdGF0dXNcIik7XG5jb25zdCBCb2FyZFR5cGVzXzEgPSByZXF1aXJlKFwiLi9Cb2FyZFR5cGVzXCIpO1xuLy8gTW9kaWZpZWQgZnJvbTpcbi8vIGh0dHBzOi8vZGV2LnRvL2Jvcm5hc2VwaWMvcHVyZS1hbmQtc2ltcGxlLXRpYy10YWMtdG9lLXdpdGgtamF2YXNjcmlwdC00cGduXG5jb25zdCB3aW5uaW5nQ29uZGl0aW9ucyA9IFtcbiAgICBbMCwgMSwgMl0sXG4gICAgWzMsIDQsIDVdLFxuICAgIFs2LCA3LCA4XSxcbiAgICBbMCwgMywgNl0sXG4gICAgWzEsIDQsIDddLFxuICAgIFsyLCA1LCA4XSxcbiAgICBbMCwgNCwgOF0sXG4gICAgWzIsIDQsIDZdXG5dO1xuY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKGJvYXJkKSB7XG4gICAgICAgIHRoaXMuYiA9IFtdO1xuICAgICAgICBpZiAoYm9hcmQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5iLnB1c2goQm9hcmRUeXBlc18xLkJvYXJkVHlwZS5FbXB0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYltpXSA9IGJvYXJkLmJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgYm9hcmRTdGF0dXMoKSB7XG4gICAgICAgIC8vIGRyYXdcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmIubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJbaV0gIT09IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuRW1wdHkpIHtcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCA9PT0gdGhpcy5iLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIEJvYXJkU3RhdHVzXzEuQm9hcmRTdGF0dXMuRHJhdztcbiAgICAgICAgfVxuICAgICAgICAvLyB3aW5uZXIgb3IgZ2FtZSBpcyBzdGlsbCBnb2luZ1xuICAgICAgICBsZXQgd2lubmVyID0gQm9hcmRTdGF0dXNfMS5Cb2FyZFN0YXR1cy5Ob25lO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbm5pbmdDb25kaXRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBhID0gdGhpcy5iW3dpbm5pbmdDb25kaXRpb25zW2ldWzBdXTtcbiAgICAgICAgICAgIGNvbnN0IGIgPSB0aGlzLmJbd2lubmluZ0NvbmRpdGlvbnNbaV1bMV1dO1xuICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuYlt3aW5uaW5nQ29uZGl0aW9uc1tpXVsyXV07XG4gICAgICAgICAgICBpZiAoYSA9PT0gQm9hcmRUeXBlc18xLkJvYXJkVHlwZS5FbXB0eSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGEgPT09IGIgJiYgYiA9PSBjKSB7XG4gICAgICAgICAgICAgICAgaWYgKGEgPT09IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuTykge1xuICAgICAgICAgICAgICAgICAgICB3aW5uZXIgPSBCb2FyZFN0YXR1c18xLkJvYXJkU3RhdHVzLk87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5uZXIgPSBCb2FyZFN0YXR1c18xLkJvYXJkU3RhdHVzLlg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3aW5uZXI7XG4gICAgfVxuICAgIHVwZGF0ZUJvYXJkKGluZGV4LCBwbGF5ZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuYltpbmRleF0gPT09IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuRW1wdHkpIHtcbiAgICAgICAgICAgIHRoaXMuYltpbmRleF0gPSBwbGF5ZXI7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0cy5Cb2FyZCA9IEJvYXJkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJvYXJkU3RhdHVzID0gdm9pZCAwO1xudmFyIEJvYXJkU3RhdHVzO1xuKGZ1bmN0aW9uIChCb2FyZFN0YXR1cykge1xuICAgIEJvYXJkU3RhdHVzW0JvYXJkU3RhdHVzW1wiTm9uZVwiXSA9IDBdID0gXCJOb25lXCI7XG4gICAgQm9hcmRTdGF0dXNbQm9hcmRTdGF0dXNbXCJYXCJdID0gMV0gPSBcIlhcIjtcbiAgICBCb2FyZFN0YXR1c1tCb2FyZFN0YXR1c1tcIk9cIl0gPSAyXSA9IFwiT1wiO1xuICAgIEJvYXJkU3RhdHVzW0JvYXJkU3RhdHVzW1wiRHJhd1wiXSA9IDNdID0gXCJEcmF3XCI7XG59KShCb2FyZFN0YXR1cyA9IGV4cG9ydHMuQm9hcmRTdGF0dXMgfHwgKGV4cG9ydHMuQm9hcmRTdGF0dXMgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmJvYXJkVHlwZVRvU3RyID0gZXhwb3J0cy5Cb2FyZFR5cGUgPSB2b2lkIDA7XG52YXIgQm9hcmRUeXBlO1xuKGZ1bmN0aW9uIChCb2FyZFR5cGUpIHtcbiAgICBCb2FyZFR5cGVbQm9hcmRUeXBlW1wiRW1wdHlcIl0gPSAwXSA9IFwiRW1wdHlcIjtcbiAgICBCb2FyZFR5cGVbQm9hcmRUeXBlW1wiWFwiXSA9IDFdID0gXCJYXCI7XG4gICAgQm9hcmRUeXBlW0JvYXJkVHlwZVtcIk9cIl0gPSAyXSA9IFwiT1wiO1xufSkoQm9hcmRUeXBlID0gZXhwb3J0cy5Cb2FyZFR5cGUgfHwgKGV4cG9ydHMuQm9hcmRUeXBlID0ge30pKTtcbmZ1bmN0aW9uIGJvYXJkVHlwZVRvU3RyKHQpIHtcbiAgICBzd2l0Y2ggKHQpIHtcbiAgICAgICAgY2FzZSBCb2FyZFR5cGUuRW1wdHk6IHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQm9hcmRUeXBlLlg6IHtcbiAgICAgICAgICAgIHJldHVybiBcIlhcIjtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIEJvYXJkVHlwZS5POiB7XG4gICAgICAgICAgICByZXR1cm4gXCJPXCI7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVW5oYW5kbGVkIGJvYXJkIHR5cGUgJHt0fS4gUGxlYXNlIGNvbnRhY3QgdGhlIHNpdGUncyBhZG1pbi5gKTtcbiAgICAgICAgICAgIHJldHVybiAnRSc7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmJvYXJkVHlwZVRvU3RyID0gYm9hcmRUeXBlVG9TdHI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBCb2FyZFR5cGVzXzEgPSByZXF1aXJlKFwiLi9Cb2FyZFR5cGVzXCIpO1xuY29uc3QgQm9hcmRfMSA9IHJlcXVpcmUoXCIuL0JvYXJkXCIpO1xuY29uc3QgQm9hcmRTdGF0dXNfMSA9IHJlcXVpcmUoXCIuL0JvYXJkU3RhdHVzXCIpO1xubGV0IGJvYXJkID0gbmV3IEJvYXJkXzEuQm9hcmQobnVsbCk7XG5sZXQgY3VycmVudFBsYXllciA9IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuWDtcbmNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLS1zdGF0dXMnKTtcbmZ1bmN0aW9uIGhhbmRsZUNlbGxDbGljayhjbGlja2VkQ2VsbEV2ZW50KSB7XG4gICAgY29uc3QgY2xpY2tlZENlbGwgPSBjbGlja2VkQ2VsbEV2ZW50LnRhcmdldDtcbiAgICBpZiAoY2xpY2tlZENlbGwgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IE51bWJlcihjbGlja2VkQ2VsbC5nZXRBdHRyaWJ1dGUoJ2luZGV4JykpO1xuICAgIGlmIChib2FyZC51cGRhdGVCb2FyZChpbmRleCwgY3VycmVudFBsYXllcikpIHtcbiAgICAgICAgbGV0IGJvYXJkU3RhdHVzID0gYm9hcmQuYm9hcmRTdGF0dXMoKTtcbiAgICAgICAgaWYgKGJvYXJkU3RhdHVzID09PSBCb2FyZFN0YXR1c18xLkJvYXJkU3RhdHVzLk8pIHtcbiAgICAgICAgICAgIHN0YXR1cy5pbm5lckhUTUwgPSAnUGxheWVyIDAgd29uISc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYm9hcmRTdGF0dXMgPT09IEJvYXJkU3RhdHVzXzEuQm9hcmRTdGF0dXMuWCkge1xuICAgICAgICAgICAgc3RhdHVzLmlubmVySFRNTCA9ICdQbGF5ZXIgWCB3b24hJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChib2FyZFN0YXR1cyA9PT0gQm9hcmRTdGF0dXNfMS5Cb2FyZFN0YXR1cy5EcmF3KSB7XG4gICAgICAgICAgICBzdGF0dXMuaW5uZXJIVE1MID0gJ0RyYXchJztcbiAgICAgICAgfVxuICAgICAgICBjbGlja2VkQ2VsbC5pbm5lckhUTUwgPSAoMCwgQm9hcmRUeXBlc18xLmJvYXJkVHlwZVRvU3RyKShjdXJyZW50UGxheWVyKTtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuWCkge1xuICAgICAgICAgICAgY3VycmVudFBsYXllciA9IEJvYXJkVHlwZXNfMS5Cb2FyZFR5cGUuTztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBCb2FyZFR5cGVzXzEuQm9hcmRUeXBlLlg7XG4gICAgICAgIH1cbiAgICB9XG59XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2VsbCcpLmZvckVhY2goY2VsbCA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2VsbENsaWNrKSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=