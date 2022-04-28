import { boardTypeToStr, BoardType } from "./BoardTypes"
import { Board } from "./Board";
import { BoardStatus } from "./BoardStatus";


let board = new Board(null);
const status = document.querySelector('.game--status');
let gameOver = false;

function updateBoard(index : number, clickedCell: Element) {
    const boardUpdatedBy = board.updateBoard(index);

    console.log()
    if (!gameOver && boardUpdatedBy !== BoardType.Empty) {
        // handle player result
        let boardStatus = board.boardStatus();

        if (boardStatus === BoardStatus.O) {
            status!.innerHTML = 'Player 0 won!';
            gameOver = true;
        } else if (boardStatus === BoardStatus.X) {
            status!.innerHTML = 'Player X won!';
            gameOver = true;
        } else if (boardStatus === BoardStatus.Draw) {
            status!.innerHTML = 'Draw!'
            gameOver = true;
        }
        
        clickedCell.innerHTML = boardTypeToStr(boardUpdatedBy);
    }
}

function handleCellClick(clickedCellEvent: Event) {
    // handle the player update
    const clickedCell = clickedCellEvent.target as Element;
    if (clickedCell === null) {
        return;
    }

    let index : number = Number(clickedCell.getAttribute('index'));
    updateBoard(index, clickedCell);

    if(gameOver) return;

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