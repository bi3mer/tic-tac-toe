export enum BoardStatus {
    None=0,
    X,
    O,
    Draw
};

export function boardStatusToNumber(bs : BoardStatus) : number {
    if(bs === BoardStatus.X) {
        return 0;
    } else if (bs === BoardStatus.O) {
        return 1;
    } else if (bs == BoardStatus.Draw) {
        return 0.5;
    } else {
        return 0;
    }
}