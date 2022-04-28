export enum BoardType {
    Empty=0,
    X,
    O
}

export function boardTypeToStr(t : BoardType) {
    switch(t) { 
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