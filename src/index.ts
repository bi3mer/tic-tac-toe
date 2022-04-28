import { boardTypeToStr, BoardType } from "./BoardTypes"
import { Board } from "./Board";
import { BoardStatus } from "./BoardStatus";


let board = new Board(null);
let currentPlayer = BoardType.X;
const status = document.querySelector('.game--status');

function handleCellClick(clickedCellEvent: Event) {
    const clickedCell = clickedCellEvent.target as HTMLInputElement;
    if (clickedCell === null) {
        return;
    }

    const index : number = Number(clickedCell.getAttribute('index'));

    if (board.updateBoard(index, currentPlayer)) {
        let boardStatus = board.boardStatus();

        if (boardStatus === BoardStatus.O) {
            status!.innerHTML = 'Player 0 won!';
        } else if (boardStatus === BoardStatus.X) {
            status!.innerHTML = 'Player X won!';
        } else if (boardStatus === BoardStatus.Draw) {
            status!.innerHTML = 'Draw!'
        }
        
        clickedCell.innerHTML = boardTypeToStr(currentPlayer);
        if (currentPlayer === BoardType.X) {
            currentPlayer = BoardType.O;
        } else {
            currentPlayer = BoardType.X;
        }
    }
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));