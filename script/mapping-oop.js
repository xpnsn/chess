const board=[];

class box {
    color;
    isHighlighted;
    availableMoves;
    hasPiece;
    coordinate;
}

let x=0;

for(let i=8; i>0; i--) {
    const rankRow=[];
    
    for(let j=97; j<105; j++) {
        const id=String.fromCharCode(j)+i;
        const square = new box();
        if(x%2 == 0) {
            square.color='#99cced'
        } else {
            square.color='#7e38b7'
        }
        x++;
        square.coordinate = id;
        rankRow.push(square);
    }
    x++;
    board.push(rankRow);
}
console.log(board);